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

      describe('pause function', () => {
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

      describe('resume()', () => {
       
        test('should not resume the timer if it has already finished', () => {
          const duration = 5000;
    
          jest.useFakeTimers();
    
          timer.start(duration);
    
          jest.runAllTimers();
    
          const remainingTime = timer.getRemainingTime();
    
          timer.resume();
    
          expect(timer.isPaused()).toBeFalsy();
          expect(timer.isRunning()).toBeFalsy();
          expect(timer.getRemainingTime()).toBeNull();
        });

      });
    
      

      

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

      // Restart Function Test Cases

      describe('restart function', () => {
        test('should emit restart event with the correct duration', (done) => {
          const duration1 = 500;
          const duration2 = 1000;
          let count = 0;
          timer.on('restart', (d) => {
            if (count === 0) {
              expect(d).toBe(duration2);
              timer.stop();
              done();
            } else {
              expect(d).toBe(duration1);
            }
            count++;
          });
          timer.start(duration1);
          timer.restart(duration2);
        });
      
        test('should reset duration to the new value', () => {
          const duration1 = 500;
          const duration2 = 1000;
          timer.start(duration1);
          timer.restart(duration2);
          expect(timer.getDuration()).toBe(duration2);
        });
      
        test('should reset remaining time to the new duration when not paused', () => {
          const duration1 = 500;
          const duration2 = 1000;
          jest.useFakeTimers();
          timer.start(duration1);
          jest.advanceTimersByTime(200);
          timer.restart(duration2);
          expect(timer.getRemainingTime()).toBeCloseTo(duration2, -1);
          jest.useRealTimers();
        });
      
        test('should resume the timer with the new duration when paused', () => {
          const duration1 = 500;
          const duration2 = 1000;
          jest.useFakeTimers();
          timer.start(duration1);
          jest.advanceTimersByTime(200);
          timer.pause();
          jest.advanceTimersByTime(1000);
          timer.restart(duration2);
          expect(timer.isPaused()).toBeFalsy();
          expect(timer.getDuration()).toBe(duration2);
          expect(timer.getRemainingTime()).toBeCloseTo(duration2, -1);
          jest.useRealTimers();
        });
      
       
      })

      describe('shorten function', () => {
       
        test('should not shorten the timer if it has already been paused', () => {
          const duration = 5000;
          const shortenTime = 2000;
      
          jest.useFakeTimers();
      
          timer.start(duration);
      
          jest.advanceTimersByTime(1000);
      
          timer.pause();
      
          const newDuration = timer.getDuration();
      
          timer.shorten(shortenTime);
      
          expect(timer.getDuration()).toBe(newDuration);
      
          jest.useRealTimers();
        });
      
        test('should not shorten the timer if it has already finished', () => {
          const duration = 5000;
          const shortenTime = 2000;
      
          jest.useFakeTimers();
      
          timer.start(duration);
      
          jest.runAllTimers();
      
          const newDuration = timer.getDuration();
      
          timer.shorten(shortenTime);
      
          expect(timer.getDuration()).toBe(newDuration);
      
          jest.useRealTimers();
        });
      });
      
      describe('getRemainingTime', () => {

        test('should return null if the timer has not been started', () => {
          expect(timer.getRemainingTime()).toBeNull()
        })

      })

      describe('getDuration', () => {

        test('should return null if the timer has not been started', () => {
          expect(timer.getDuration()).toBeNull()
        })

        test('should return the duration of the timer', () => {
          timer.start(5000)
          expect(timer.getDuration()).toBeCloseTo(5000, -1)
        })

      })

      describe('isPaused', () => {

        test('should return false if the timer has not been started', () => {
          expect(timer.isPaused()).toBeFalsy()
        })

        test('should return true if the timer has been paused', () => {

          timer.start(5000)
          timer.pause()
          expect(timer.isPaused()).toBeTruthy()

        })

      })
      
      describe('isRunning', () => {

        test('should return false if the timer has not been started', () => {
          expect(timer.isRunning()).toBeFalsy()
        })

        test('should return true if the timer is running', () => {
          timer.start(5000)
          expect(timer.isRunning()).toBeTruthy()
        })

        test('should return false if the timer has stopped', () => {
          timer.start(5000)
          timer.stop()
          expect(timer.isRunning()).toBeFalsy()
        })
      })



    })  