# Topics and Payloads

## Published Topics

| Topic                                               | Sample Value    |
|-----------------------------------------------------|-----------------|
| haiku:&lt;id&gt;/connected                          | 0               |
| haiku:&lt;id&gt;/status/device/beeperStatus         | on              |
| haiku:&lt;id&gt;/status/device/indicatorsStatus     | on              |
| haiku:&lt;id&gt;/status/device/hasLight             | true            |
| haiku:&lt;id&gt;/status/device/heightInMeters       | 2.13            |
| haiku:&lt;id&gt;/status/device/heightInFeet         | 6.99            |
| haiku:&lt;id&gt;/status/device/winterMode           | off             |
| haiku:&lt;id&gt;/status/device/name                 | Living Room Fan |
| haiku:&lt;id&gt;/status/sensor/isRoomOccupied       | true            |
| haiku:&lt;id&gt;/status/sensor/timeout              | 600000          |
| haiku:&lt;id&gt;/status/sensor/timeout/maximum      | 86400000        |
| haiku:&lt;id&gt;/status/sensor/timeout/minimum      | 60000           |
| haiku:&lt;id&gt;/status/fan/automaticOn             | on              |
| haiku:&lt;id&gt;/status/fan/direction               | forward         |
| haiku:&lt;id&gt;/status/fan/power                   | on              |
| haiku:&lt;id&gt;/status/fan/speed                   | 3               |
| haiku:&lt;id&gt;/status/fan/speed/maximum           | 7               |
| haiku:&lt;id&gt;/status/fan/speed/minimum           | 1               |
| haiku:&lt;id&gt;/status/fan/whooshMode              | off             |
| haiku:&lt;id&gt;/status/smartMode/maximumSpeed      | 5               |
| haiku:&lt;id&gt;/status/smartMode/minimumSpeed      | 0               |
| haiku:&lt;id&gt;/status/smartMode/idealTemperatureC | 23.33           |
| haiku:&lt;id&gt;/status/smartMode/idealTemperatureF | 73.99           |
| haiku:&lt;id&gt;/status/smartMode/actual            | cooling         |
| haiku:&lt;id&gt;/status/smartMode/state             | cooling         |
| haiku:&lt;id&gt;/status/light/automaticOn           | on              |
| haiku:&lt;id&gt;/status/light/brightness            | 0               |
| haiku:&lt;id&gt;/status/light/brightness/maximum    | 16              |
| haiku:&lt;id&gt;/status/light/brightness/minimum    | 1               |
| haiku:&lt;id&gt;/status/light/power                 | off             |
| haiku:&lt;id&gt;/status/network/accessPointStatus   | off             |
| haiku:&lt;id&gt;/status/network/dhcpStatus          | off             |
| haiku:&lt;id&gt;/status/network/ssid                | &lt;SSID&gt;    |
| haiku:&lt;id&gt;/status/network/token               | &lt;GUID&gt;    |
| haiku:&lt;id&gt;/status/sleepMode/status            | off             |
| haiku:&lt;id&gt;/status/sleepMode/idealTemperatureC | 21.11           |
| haiku:&lt;id&gt;/status/sleepMode/idealTemperatureF | 70              |
| haiku:&lt;id&gt;/status/sleepMode/maximumFanSpeed   | 7               |
| haiku:&lt;id&gt;/status/sleepMode/minimumFanSpeed   | 0               |

## Subscribed Topics

### Setters

| Topic                                            | Sample Value    |
|--------------------------------------------------|-----------------|
| haiku:&lt;id&gt;/set/device/beeperStatus         | on              |
| haiku:&lt;id&gt;/set/device/indicatorsStatus     | on              |
| haiku:&lt;id&gt;/set/device/heightInMeters       | 2.13            |
| haiku:&lt;id&gt;/set/device/heightInFeet         | 6.99            |
| haiku:&lt;id&gt;/set/device/winterMode           | off             |
| haiku:&lt;id&gt;/set/device/name                 | Living Room Fan |
| haiku:&lt;id&gt;/set/sensor/isRoomOccupied       | true            |
| haiku:&lt;id&gt;/set/sensor/timeout              | 600000          |
| haiku:&lt;id&gt;/set/fan/automaticOn             | on              |
| haiku:&lt;id&gt;/set/fan/direction               | forward         |
| haiku:&lt;id&gt;/set/fan/power                   | on              |
| haiku:&lt;id&gt;/set/fan/speed                   | 3               |
| haiku:&lt;id&gt;/set/fan/whooshMode              | off             |
| haiku:&lt;id&gt;/set/smartMode/maximumSpeed      | 5               |
| haiku:&lt;id&gt;/set/smartMode/minimumSpeed      | 0               |
| haiku:&lt;id&gt;/set/smartMode/idealTemperatureC | 23.33           |
| haiku:&lt;id&gt;/set/smartMode/idealTemperatureF | 73.99           |
| haiku:&lt;id&gt;/set/smartMode/state             | cooling         |
| haiku:&lt;id&gt;/set/light/automaticOn           | on              |
| haiku:&lt;id&gt;/set/light/brightness            | 0               |
| haiku:&lt;id&gt;/set/light/power                 | off             |
| haiku:&lt;id&gt;/set/sleepMode/status            | off             |
| haiku:&lt;id&gt;/set/sleepMode/idealTemperatureC | 21.11           |
| haiku:&lt;id&gt;/set/sleepMode/idealTemperatureF | 70              |
| haiku:&lt;id&gt;/set/sleepMode/maximumFanSpeed   | 7               |
| haiku:&lt;id&gt;/set/sleepMode/minimumFanSpeed   | 0               |

### Active Get

| Topic                                            |
|--------------------------------------------------|
| haiku:&lt;id&gt;/get/device/beeperStatus         |
| haiku:&lt;id&gt;/get/device/indicatorsStatus     |
| haiku:&lt;id&gt;/get/device/heightInMeters       |
| haiku:&lt;id&gt;/get/device/heightInFeet         |
| haiku:&lt;id&gt;/get/device/winterMode           |
| haiku:&lt;id&gt;/get/device/name                 |
| haiku:&lt;id&gt;/get/sensor/isRoomOccupied       |
| haiku:&lt;id&gt;/get/sensor/timeout              |
| haiku:&lt;id&gt;/get/fan/automaticOn             |
| haiku:&lt;id&gt;/get/fan/direction               |
| haiku:&lt;id&gt;/get/fan/power                   |
| haiku:&lt;id&gt;/get/fan/speed                   |
| haiku:&lt;id&gt;/get/fan/whooshMode              |
| haiku:&lt;id&gt;/get/smartMode/maximumSpeed      |
| haiku:&lt;id&gt;/get/smartMode/minimumSpeed      |
| haiku:&lt;id&gt;/get/smartMode/idealTemperatureC |
| haiku:&lt;id&gt;/get/smartMode/idealTemperatureF |
| haiku:&lt;id&gt;/get/smartMode/state             |
| haiku:&lt;id&gt;/get/light/automaticOn           |
| haiku:&lt;id&gt;/get/light/brightness            |
| haiku:&lt;id&gt;/get/light/power                 |
| haiku:&lt;id&gt;/get/sleepMode/status            |
| haiku:&lt;id&gt;/get/sleepMode/idealTemperatureC |
| haiku:&lt;id&gt;/get/sleepMode/idealTemperatureF |
| haiku:&lt;id&gt;/get/sleepMode/maximumFanSpeed   |
| haiku:&lt;id&gt;/get/sleepMode/minimumFanSpeed   |
