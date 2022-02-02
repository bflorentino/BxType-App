import React, { useContext } from 'react';
import { countersContext, typingContext } from '../../Typing/TypingContext';
import HomeButton from '../Buttons/HomeButton';

const TestResults = (  ) => {

  const { testSettings } = useContext(typingContext);
  const { testType } = testSettings;

  const { 
    counterCorrect, 
    counterIncorrect, 
    counterCorrectChars,
    counterIncorrectChars } = useContext(countersContext)

  return(
    <>
      <h1 className='text-center mt-24 font-lato text-4xl dark:text-white'>Test Results: </h1>
      <div className='w-1/2 mt-8 font-lato'>
          <div className=' flex flex-col  border-4 border-borderColor'>

            <div className='flex flex-ro0 justify-center  text-2xl mt-4 mb-2 dark:text-white '>
              <div>
                  <div className='rounded-full border-4 border-btnColor w-20 text-center'>
                    <p className='px-2 pt-2'> {`${Math.ceil(counterCorrectChars.counter / (testType * 5)) }` }</p> 
                    <p className='text-sm pb-2'> WPM </p>
                  </div>
                    {<p className='text-sm mt-2'> Typing Speed</p> }
              </div>
              <div className='ml-12'>
                  <div className='rounded-full border-4 border-btnColor w-20 text-center '>
                    <p className='pt-4 pb-5'>
                    { // Accuracy percentage
                      `${
                          Math.ceil(counterCorrectChars.counter / (counterCorrectChars.counter + counterIncorrectChars.counter )* 100) || 0
                        }`
                    }
                    <small className='text-base'>%</small>
                    </p>
                  </div>
                    {<p className='text-sm mt-2 text-center'> Accuracy </p> }
              </div>
            </div>
            
            <div className='flex text-lg mt-4 justify-center'>
              
              <span className='flex'> 
                <p className='correct'>{counterCorrectChars.counter}</p> 
                <pre className='dark:text-white'> | </pre>
                <p className='incorrect'>{counterIncorrectChars.counter}</p>
                <pre className='dark:text-white'> KeyStrokes </pre> 
              </span>
                 
              <span className='flex ml-8'>          
                <p className='correct'>{counterCorrect.counter}</p> 
                <pre className='dark:text-white'> | </pre>
                <p className='incorrect'>{counterIncorrect.counter}</p>
                <pre className='dark:text-white'> Words </pre> 
              </span>

            </div>
            <div className='h-14 flex justify-end mr-4 mt-4'>
              <HomeButton />
            </div>
          </div>

      </div>
    </>
  ) 
};

export default TestResults;