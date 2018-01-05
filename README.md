# haiku2mqtt
> A bridge between Haiku smart fans and MQTT.

[![mqtt-smarthome](https://img.shields.io/badge/mqtt-smarthome-blue.svg)](https://github.com/mqtt-smarthome/mqtt-smarthome)
[![NPM Version][npm-image]][npm-url]
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

haiku2mqtt is a Node.js application that links SenseME-enabled devices by [Haiku](http://www.haikuhome.com/) to an MQTT broker. It is designed to be used to integrate these devices into a home automation system.

## Getting Started

haiku2mqtt is distributed through NPM:

```sh
npm install -g haiku2mqtt
```

Running it is likewise easy:

```sh
haiku2mqtt                      # if your MQTT broker is running on the same system
haiku2mqtt -b mqtt://<hostname> # if your broker is running elsewhere
haiku2mqtt --help               # to see the full usage documentation
```

## Topics and Payloads

This app is intended to conform to the [mqtt-smarthome](http://www.github.com/mqtt-smarthome/mqtt-smarthome/) architecture.  The topics used by the app are generally of the form:

| Topic Template                   | Purpose                                                                          |
|----------------------------------|----------------------------------------------------------------------------------|
| `haiku:<id>/status/path/to/prop` | New values will be published here as the device reports them                     |
| `haiku:<id>/set/path/to/prop`    | New values published to these topics will be propagated to the device.           |
| `haiku:<id>/get/path/to/prop`    | Publishing anything to these topics will request updated values from the device. |

To see a complete list, including sample values, see [TOPICS](TOPICS.md)

## Contributing

Contributions are of course always welcome.  If you find problems, please report them in the [Issue Tracker](http://www.github.com/forty2/haiku2mqtt/issues/).  If you've made an improvement, open a [pull request](http://www.github.com/forty2/haiku2mqtt/pulls).

Getting set up for development is very easy:
```sh
git clone <your fork>
cd haiku2mqtt
npm install -g babel-cli # if you don't already have it
npm install
```

And the development workflow is likewise straightforward:
```sh
# make a change to the src/ file, then...
npm run build
node dist/index.js

# or if you want to clean up all the leftover build products:
npm run clean
```

## Release History
* 1.1.0
    * Small bugfix for error handling
    * Update `haiku-senseme`
    * Switch to `yalm` for logging

* 1.0.0
    * The first release.

## Meta

Zach Bean – zb@forty2.com

Distributed under the MIT license. See [LICENSE](LICENSE.md) for more detail.

[npm-image]: https://img.shields.io/npm/v/haiku2mqtt.svg?style=flat
[npm-url]: https://npmjs.org/package/haiku2mqtt
