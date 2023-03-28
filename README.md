# package-timer

The packageTimer is a simple Node.js module that can be used to track the duration of a certain event or task. It allows you to start, pause, resume, stop, restart, extend, and shorten a timer. It also provides methods to get the remaining time and duration of the timer, as well as to check whether the timer is paused ot running.


## Installation

You can install packageTimer via:

```javascript

npm install package-timer

```


## Usage 

You can use packageTimer by requiring it in your Node.js 
application:

```javascript

const packageTimer = require('package-timer')

```
Then, you create a new timer by calling the packageTimer function:

```javascript

const timer = packageTimer()

```

## Starting the Timer

You can start the timer by calling the `start` method and passing in the duration of the timer in milliseconds:

```javascript

timer.start(5000)

```
This will start timer for 5 seconds (5000 milliseconds) and emit a start event with the durution of the timer as an argument.


## Pause the Timer

To pause the timer, call the `pause()` method:

```javascript

timer.pause()

```

This will pause the timer and return the remaining time in milliseconds.


## Resume the Timer

To resume the timer agter pausing it , call the `resume()` method:

```javascript

timer.resume()

```
This will resume the timer and return the remaining time in milliseconds.

## Stop the Timer

To stop the timer, call the `stop()` method:

```javascript

timer.stop()

```
This will stop timer and reset all its properties.


## Restart the Timer

To restart the timer, call the `restart()` method and pass in the duration of the timer in milliseconds:

```javascript

timer.restart(10000)

```

This will stop the current timer (if running), reset its properties, and start a new timer for 10 seconds (10000 milliseconds).


## Extend the Timer

To extend the timer, call the `extend(time)` method and pass in the duration you want to add to the remaining time in milliseconds:

```javascript

timer.extend(5000)

```
This will add 5 seconds to the remaining time of the timer.

## Shorten the Timer 

To shorten the timer, call the `shorten(time)` method and pass in the duration you want to subtract from the remaining time in milliseconds:

```javascript

timer.shorten(2000)

```
This will subtract 2 seconds (2000 milliseconds) from the remaining time of the timer.


## Get the Remaining Time

To get the remaining time of the timer, call the getRemainingTime() method:

```javascript

const remainingTime = timer.getRemainingTime()

```
This will return the remaining time of the timer in milliseconds.


## Get the Duration
To get the duration of the timer, call the `getDuration()` method:

```javascript

const duration = timer.getDuration()

```
This will return the duration of the timer in milliseconds.


## Check if the Timer is Paused

To check if the timer is paused, call the `isPaused()` method:

```javascript

const paused = timer.isPaused()

```
This will return true if the timer is paused, and false otherwise.


## Check if the Timer is Running

To check if the timer is running, call the isRunning() method:

```javascript

const running = timer.isRunning()

```
This will return `true` if the timer is running, and `false` otherwise. 


## Events

The `packageTimer` object is an instance of Node.js's built-in `EventEmitter` class and emits the following events:

..* `start(duration: number) `- Emits when the timer is started. The duration parameter is the total time (in milliseconds) that the timer will run.
..* `timeout` - Emits when the timer has timed out.
..* `pause(remainingTime: number)` - Emits when the timer is paused. The remainingTime parameter is the remaining time (in milliseconds) on the timer when it was paused.
..* `resume(remainingTime: number)` - Emits when the timer is resumed. The remainingTime parameter is the remaining time (in milliseconds) on the timer when it was resumed.
..* `stop` - Emits when the timer is stopped.
..* `restart(duration: number)` - Emits when the timer is restarted. The duration parameter is the new total time (in milliseconds) that the timer will run.
..* `extend(duration: number)` - Emits when the timer is extended. The duration parameter is the new total time (in milliseconds) that the timer will run.
..* `shorten(duration: number)` - Emits when the timer is shortened. The duration parameter is the new total time (in milliseconds) that the timer will run.

You can listen to these events using the `on`, `once`, and `off` methods inherited from `EventEmitter`.

```javascript

const packageTimer = require('package-timer')

const timer = packageTimer()

timer.on('start', (duration) => {
  console.log(`Timer started for ${duration}ms`)
})

timer.once('timeout', () => {
  console.log('Time\'s up!')
})

timer.on('pause', (remainingTime) => {
  console.log(`Timer paused with ${remainingTime}ms remaining`)
})

timer.on('resume', (remainingTime) => {
  console.log(`Timer resumed with ${remainingTime}ms remaining`)
})

timer.on('stop', () => {
  console.log('Timer stopped')
})

timer.on('restart', (duration) => {
  console.log(`Timer restarted for ${duration}ms`)
})

timer.on('extend', (duration) => {
  console.log(`Timer extended for ${duration}ms`)
})

timer.on('shorten', (duration) => {
  console.log(`Timer shortened for ${duration}ms`)
})

```

## Examples

Here are some examples of how to use `packageTimer`:

```javascript

const packageTimer = require('package-timer')

// Create a new timer with a duration of 5 seconds
const timer = packageTimer()

// Start the timer
timer.start(5000)

// Pause the timer after 3 seconds
setTimeout(() => {
  timer.pause()
}, 3000)

// Resume the timer after 2 seconds
setTimeout(() => {
  timer.resume()
}, 5000)

// Stop the timer after 8 seconds
setTimeout(() => {
  timer.stop()
}, 8000)

```


## License

This package is licensed under the [MIT License](https://.github.com/adesholly/package-timer/blob/main/LICENSE)



## Contributing 

contributions are welcome! if you find a bug want to add a feature, please [Open an issue](https://github.com/adesholly/package-timer/issues)



## Contact

If you have any questions or comments about this package, please feel free to contract the author via email at [adesholly11@gmail.com](mailto:adesholly11@gmail.com)