import React, { useContext } from 'react';
import { countersContext, typingContext } from '../Typing/TypingContext';

const TestResults = (  ) => {

  const { testSettings } = useContext(typingContext);
  const { testType } = testSettings;

  const { 
    counterCorrect, 
    counterIncorrect, 
    counterCorrectChars,
    counterIncorrectChars } = useContext(countersContext)

  return(

    <div className='w-2/3 mt-28 font-lato'>

         <div className='border-4 border-borderColor h-40 overflow-hidden flex flex-col'>

           <div className='text-center text-3xl mt-4'> 
              <p>{ `${Math.ceil(counterCorrectChars.counter / (testType * 5)) } WPM` }</p> 
              <p className='text-sm'> (Words Per Minute)</p>
              </div>
           
           <div className='flex text-lg mt-4 justify-center'>
             
             <span className='flex'> 
               <p className='correct'>{counterCorrectChars.counter}</p> 
               <pre> | </pre>
               <p className='incorrect'>{counterIncorrectChars.counter}</p>
               <pre> KeyStrokes </pre> 
             </span>
             
             <span className='ml-8'> 
          { // Accuracy percentage
          `${
              Math.ceil(counterCorrectChars.counter / (counterCorrectChars.counter + counterIncorrectChars.counter )* 100) || 0
            } %Accuracy`
          } 
              </span>
             
             <span className='flex ml-8'>          
               <p className='correct'>{counterCorrect.counter}</p> 
               <pre> | </pre>
               <p className='incorrect'>{counterIncorrect.counter}</p>
               <pre> Words </pre> 
             </span>

           </div>
        </div>
    </div>
  ) 
};

export default TestResults;