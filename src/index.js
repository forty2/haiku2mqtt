#!/usr/bin/env node

import 'any-observable/register/rxjs-all';

import log from 'yalm';
import MQTT from 'mqtt';

import { SenseME } from 'haiku-senseme';
import { Observable, Subject } from 'rxjs';

import config from './config.js';

log.setLevel(config.verbosity);

SenseME
    .on('founddevice', setupNewDevice)
    .on('lostdevice',  forgetDevice)
    .discover();

let clients = { };
let subjects = { };

const STATUS_OPTS = { qos: 2, retain: true };

function getTopic(dev, suffix) {
    return `${config.name}:${dev.id}/${suffix}`;
}

function setupNewDevice(device) {
    log.debug(`Creating client for ${device.name}`);
    let client;
    if (!clients[device.id]) {
        clients[device.id] = client = MQTT.connect(config.broker, {
            will: {
                topic:   getTopic(device, 'connected'),
                payload: '0',
                ...STATUS_OPTS
            }
        });
    }

    client.publish(getTopic(device, 'connected'), '2', STATUS_OPTS);

    // observe all property changes for this device until it disappears.
    subjects[device.id] = new Subject();

    device.observeAll()
        .takeUntil(subjects[device.id])
        .map(({ path, value }) => ({
            topic: getTopic(device, ['status'].concat(path).join('/')),
            message: value,
            client,
            retain: true
        }))
        ::publishMessages();

    // force a refresh in case we didn't subscribe early enough to get the
    // automatic one.
    device.refreshAll();

    getMessages(client, getTopic(device, 'set/#'), getTopic(device, 'get/#'))
        .catch((_, caught) => caught)
        .subscribe(({ topic, message }) => {
            let match = topic.match(/([sg]et)\/(.*)$/);
            if (match) {
                let path = match[2].split('/'), command = match[1];
                let obj =
                    path.reduce(
                        (acc, x) => x in acc ? acc[x] : undefined
                    , device);

                if (typeof obj !== 'undefined') {
                    // if a value can't be set, don't bother trying.
                    // Likewise, there's no sense refreshing a value that
                    // can't change.
                    let desc = Object.getOwnPropertyDescriptor(obj, 'value');
                    if (desc.set) {
                        if (command === 'set') {
                                log.debug(`Setting ${device.name},${path} from ${obj.value} to ${message}`);
                                obj.value = message;
                        }
                        else if (command === 'get') {
                            // request an update.  The new value will eventually
                            // be published on the status channel.
                            obj.refresh();
                        }
                    }
                }
            }
        })
}

function forgetDevice(device) {
    clients[device.id].publish(getTopic(device, 'connected'), '1', STATUS_OPTS);

    subjects[device.id].next();
    subjects[device.id] = undefined;
}

function publishMessage({ topic, message, client, retain }) {
    client.publish(topic, message !== null ? message.toString() : null, { qos: 2, retain });
}

function NOOP() { }
function publishMessages(onError = NOOP, onComplete = NOOP) {
    return this.subscribe(
        publishMessage,
        onError,
        onComplete
    );
}

function getMessages(client, ...topics) {
    return new Observable(
        subscriber => {
            client.subscribe(topics);
            client.on('message', (m_topic, msg) => {
                subscriber.next({
                    topic: m_topic,
                    message: msg.toString()
                })
            });

            return () => {
                client.unsubscribe(topics);
            }
        }
    );
}
