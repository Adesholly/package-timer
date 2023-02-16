const EventEmitter = require('events')

function packageTimer() {

    let timeoutId = null
    let endTime = null
    const emitter =  new EventEmitter()


    function start(duration) {

        endTime = Date.now() + duration
        timeoutId = setTimeout(() => {
            emitter.emit('timeout')
            timeoutId = null

        }, duration)

    }


    function pause() {

        if (timeoutId) {

            clearTimeout(timeoutId)

            const remainingTime = endTime - Date.now()
            emitter.emit(pause, remainingTime)

        }
    }

    function resume() {

        if (timeoutId && endTime) {
            const remainingTime = endTime - Date.now()

            start(remainingTime)

            emitter.emit('resume', remainingTime)
        }
    }

    function stop() {

        if (timeoutId) {
            clearTimeout(timeoutId)

            emitter.emit('stop')
            timeoutId = null
            endTime = null
        }
    }

    function restart(duration) {

        stop()
        start(duration)

        emitter.emit('restart', duration)
    }

    function extend(duration) {
        
        if (timeoutId) {
            clearTimeout(timeoutId)

            const remainingTime = endTime - Date.now()

            start(remainingTime + duration)

            emitter.emit('extend', remainingTime + duration)

        }
    }

    function shorten(duration) {

        if (timeoutId) {
            clearTimeout(timeoutId)

            const remainingTime = endTime - Date.now()
            const newDuration = Math.max(0, remainingTime - duration)

            
        }
    }

    function getRemainingTime() {
        
        if (timeoutId) {
            return endTime - Date.now()

        } else {
            return null
        }
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
        on: emitter.on.bind(emitter),
        once: emitter.once.bind(emitter),
        off: emitter.off ? emitter.off.bind(emitter): undefined
    }

} 


module.exports = packageTimer