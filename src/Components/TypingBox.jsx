import React, { useContext, useEffect, useState } from 'react';
import { useForm } from '../Hooks/useForm';
import { countersContext, typingContext } from '../Typing/TypingContext';

const TypingBox = () => {

  const { formValues, handleInputChanges, reset } = useForm({
    typedWord : ""
  }) 

  const [wordCompleted, setWordCompleted ] = useState(false);

  const { words } = useContext(typingContext)

  const { counterWords,
          counterCorrect, 
          counterIncorrect, 
          counterKeyPress,
          currentWord, 
          setCurrentWord,
          counterCurrentWordIndex } = useContext(countersContext)

  useEffect(() => {
    counterCurrentWordIndex.reset(0);
    setWordCompleted(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordCompleted])

  const handleKeyPress = (e) => {
    
    const code = e.which || e.keyCode
    if (code === 32){
      if(formValues.typedWord.trim() === currentWord){
        counterCorrect.increment()
        document.getElementById(words[counterWords.counter].id).classList.add("correct")
      }else{
        counterIncorrect.increment()
        document.getElementById(words[counterWords.counter].id).classList.add("incorrect")
      }
      counterWords.increment()
      reset()
      setCurrentWord(words[counterWords.counter + 1].word)
      setWordCompleted(true)
    }
    
    if( String.fromCharCode(code) !== currentWord[counterCurrentWordIndex.counter] && code !== 32){
      console.log(counterCurrentWordIndex.counter)
      document.getElementById(words[counterWords.counter].id).classList.add("incorrect")
    }
  
    counterCurrentWordIndex.increment();
    counterKeyPress.increment()
  }

  return (
    <div className='flex flex-row items-center w-full mt-4 bg-trasnp h-20 rouded'>
      <input 
        type="text"
        name='typedWord'
        value={ formValues.typedWord }
        onChange={ handleInputChanges }
        onKeyPress={ handleKeyPress }
        className='w-4/5 h-3/4 py-2 outline-none text-2xl font-lato ml-8 px-2 dark:text-white rounded'
      />
      <div className='bg-time h-3/4 ml-3 rounded'>
        <p className='text-white font-lato text-lg py-4 px-6'>1:00</p>
      </div>
      <button className='bg-btnColor h-3/4 px-3 text-white font-lato text-lg ml-3 rounded'>
        Restart
      </button>
    </div>
  ) 
};

export default TypingBox;