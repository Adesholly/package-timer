const { afterEach } = require('node:test')
const packageTimer = require('../lib/index')



describe('packageTime', () => {

    let timer
    

    beforeEach(() => {
        timer = packageTimer()
    })


    afterEach(() => {
        jest.clearAllTimers()
        jest.restoreAllMocks()
    })



    // Start Function Test Use Cases

    describe('start function', () => {
        

        test('should emit start event with the correct duration', (done) => {
          const duration = 500
          timer.on('start', (d) => {
            expect(d).toBe(duration)
            done()
          })
          timer.start(duration)
        })
      
        test('should emit timeout event after the correct duration', (done) => {
          const duration = 500
          timer.on('timeout', () => {
            done()
          })
          timer.start(duration)
        })
      
        test('should set isRunning to true', () => {
          const duration = 500
          timer.start(duration)
          expect(timer.isRunning()).toBe(true)
        })
      
        test('should return the correct remaining time when getRemainingTime is called', () => {
          const duration = 500
          timer.start(duration)
          expect(timer.getRemainingTime()).toBeCloseTo(duration, -1)
        })
      })

      
      // Pause Function Test Use Cases

      describe('pause()', () => {
        test('should pause the timer and return the remaining time', () => {
          const duration = 5000;
      
          jest.useFakeTimers();
      
          timer.start(duration);
      
          jest.advanceTimersByTime(2000);
      
          const remainingTime = timer.pause();
      
          expect(timer.isPaused()).toBeTruthy();
          expect(remainingTime).toBe(duration - 2000);
      
          jest.useRealTimers();
        });
      
        test('should not pause the timer if it has already been paused', () => {
          const duration = 5000;
      
          jest.useFakeTimers();
      
          timer.start(duration);
      
          jest.advanceTimersByTime(2000);
      
          timer.pause();
      
          jest.advanceTimersByTime(1000);
      
          const remainingTime = timer.pause();
      
          expect(timer.isPaused()).toBeTruthy();
          expect(remainingTime).toBeNull();
      
          jest.useRealTimers();
        });
      
        test('should not pause the timer if it has already finished', () => {
          const duration = 5000;
      
          jest.useFakeTimers();
      
          timer.start(duration);
      
          jest.runAllTimers();
      
          const remainingTime = timer.pause();
      
          expect(timer.isPaused()).toBeFalsy();
          expect(remainingTime).toBeNull();
      
          jest.useRealTimers();
        });
      });


      // Resume Function Test Use Cases



      

      // Stop Function Test Use Cases
    
      describe('stop', () => {
       
      
        test('should stop timer if it is running', () => {
          const duration = 5000
      
          timer.start(duration)
      
          expect(timer.isRunning()).toBe(true)
      
          timer.stop()
      
          expect(timer.isRunning()).toBe(false)
          expect(timer.getRemainingTime()).toBe(null)
        })
      
        test('should do nothing if timer is not running', () => {
          expect(timer.isRunning()).toBe(false)
      
          timer.stop()
      
          expect(timer.isRunning()).toBe(false)
          expect(timer.getRemainingTime()).toBe(null)
        })
      
        test('should emit "stop" event when timer is stopped', () => {
          const duration = 5000
          const mockStopListener = jest.fn()
      
          timer.on('stop', mockStopListener)
      
          timer.start(duration)
      
          expect(mockStopListener).not.toHaveBeenCalled()
      
          timer.stop()
      
          expect(mockStopListener).toHaveBeenCalled()
        })
      })

      // Extend Function Test Use Cases

      describe('extend function', () => {    

          test('should not extend timer if it is paused', () => {
            const duration = 5000
            timer.start(duration)
        
            jest.advanceTimersByTime(1000)
        
            timer.pause()
        
            const originalRemainingTime = timer.getRemainingTime()
        
            timer.extend(3000)
        
            const newDuration = timer.getDuration()
            const newRemainingTime = timer.getRemainingTime()
        
            expect(newDuration).toBe(duration)
            expect(newRemainingTime).toBe(originalRemainingTime)
          })


          
      })

})



  