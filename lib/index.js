const EventEmitter = require('events')

function packageTimer() {

    let timeoutId = null

    let endTime = null
       
    let duration = null

    let paused = false
     
    const emitter =  new EventEmitter()


    function start(time) {

        duration = time

        endTime = Date.now() + duration
        timeoutId = setTimeout(() => {
            emitter.emit('timeout')
            timeoutId = null

        }, duration)

        emitter.emit('start', duration)

    }


    function pause() {


        if (timeoutId && !paused)  {

            clearTimeout(timeoutId)


            const remainingTime = endTime - Date.now()

            paused = true


            emitter.emit("pause", remainingTime)

            return remainingTime

        }
        return null
    }

    function resume() {

        if (!timeoutId && paused && endTime) {

            const remainingTime = endTime - Date.now()

            start(remainingTime)

            paused = false

            emitter.emit('resume', remainingTime)
        }
    }

    function stop() {

        if (timeoutId) {
            clearTimeout(timeoutId)

            emitter.emit('stop')
            timeoutId = null
            endTime = null
            duration = null
            paused = false
        }
    }

    function restart(time) {

        stop()
        start(time)

        emitter.emit('restart', time)
    }

    function extend(time) {
        
        if (timeoutId && !paused) {
            clearTimeout(timeoutId)

            const remainingTime = endTime - Date.now()

            duration = remainingTime + time

            start(duration)

            emitter.emit('extend', duration)

        }
    }

    function shorten(time) {

        if (timeoutId && !paused) {
            clearTimeout(timeoutId)

            const remainingTime = endTime - Date.now()
            const newDuration = Math.max(0, remainingTime - time)

            duration = newDuration

            start(newDuration)

            emitter.emit('shorten', newDuration)
            
        }
    }

    function getRemainingTime() {
        
        if (timeoutId) {
            return endTime - Date.now()

        } else {
            return null
        }
    }

    function getDuration() {

        return duration
    }

    function isPaused() {

        return paused
    }

    function isRunning() {
        return timeoutId !== null
    }

    return {
        start,
        pause,
        resume,
        stop,
        restart,
        extend,
        shorten,
        getRemainingTime,
        getDuration,
        isPaused,
        isRunning,
        on: emitter.on.bind(emitter),
        once: emitter.once.bind(emitter),
        off: emitter.off ? emitter.off.bind(emitter): undefined
    }

} 


module.exports = packageTimer