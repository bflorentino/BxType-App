import React, { useContext, useEffect, useRef, useCallback } from 'react';
import { useCounter } from '../../Hooks/useCounter';
import { typingContext } from '../../Typing/TypingContext';

const Timer = ( { started } ) => {
  
    const { testSettings, setCurrentMode } = useContext(typingContext);
    const { testType } = testSettings;
    const seconds = useCounter(0);
    const  minutes  = useCounter(testType);
    const  isTimerRunning = useRef(false);    
    const timerId = useRef();
    
    const handleTimer = useCallback(() => {
        
        if(isTimerRunning.current){
            clearInterval(timerId.current)
        }
        
        timerId.current = setInterval(()=> {
            if(seconds.counter > 0){
                seconds.decrement();
            }
            else{
                seconds.reset(59)
                minutes.decrement()
            }
        }, 1000)
        isTimerRunning.current = true;

    // eslint-disable-next-line
    }, [seconds.counter, minutes.counter])
    
    
    useEffect(() => {
        
        // Seconds counting in Tests
        started && handleTimer();
        
        if(seconds.counter === 0 && minutes.counter === 0){
            setCurrentMode("finished")
        }
        
    }, [ started, seconds.counter, minutes.counter, handleTimer, setCurrentMode ])
    

    useEffect(() => {
        return () => clearInterval(timerId.current);
    }, [])
    

    return( 
        <span className='bg-time h-3/4 ml-3 rounded'>
            <p className='text-white font-lato text-lg py-2 px-6'>
                {`${minutes.counter}:${seconds.counter >= 10 ? seconds.counter : `0${seconds.counter}`}` }
            </p>
        </span>);
};

export default Timer;