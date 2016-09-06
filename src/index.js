import 'any-observable/register/rxjs-all';

import Logger from 'js-logger';
import MQTT from 'mqtt';

import { SenseME } from 'haiku-senseme';
import { Observable, Subject } from 'rxjs';

import config from './config.js';

Logger.useDefaults({
    defaultLevel: Logger.ERROR,
    formatter: function (messages, context) {
        const date   = new Date(),
              year   = date.getFullYear(),
              month  = ("0"+(date.getMonth() + 1)).substr(-2),
              day    = ("0"+date.getDate()).substr(-2),
              hour   = ("0"+date.getHours()).substr(-2),
              minute = ("0"+date.getMinutes()).substr(-2),
              second = ("0"+date.getSeconds()).substr(-2),
              millis = ("000"+date.getMilliseconds()).substr(-3),
              level  = ("     "+context.level.name).substr(-5);

        messages.unshift(
            `[${year}/${month}/${day}]` +
            `[${hour}:${minute}:${second}.${millis}]` +
            `[${context.name || '(base)'}]` +
            `[${level}]`
        )
    }
})

const Log = Logger.get('haiku2mqtt');
Log.setLevel(Logger.DEBUG);

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
    Log.debug(`Creating client for ${device.name}`);
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

    getMessages(client, getTopic(device, 'set/#'), getTopic(device, 'get/#'))
        .map(({ topic, message }) => {
            let match = topic.match(/([sg]et)\/(.*)$/);
            if (match) {
                let path = match[2].split('/'), command = match[1];
                let obj =
                    path.reduce(
                        (acc, x) => x in acc ? acc[x] : undefined
                    , device);

                if (typeof obj !== 'undefined') {
                    if (command === 'set') {
                        Log.debug(`Setting ${device.name},${path} from ${obj.value} to ${message}`);
                        obj.value = message;
                    }
                    else if (command === 'get') {
                        // request an update.  The new value will eventually
                        // be published on the status channel.
                        obj.refresh();
                    }
                }
            }
        })
        .onErrorResumeNext()
        .subscribe();
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
