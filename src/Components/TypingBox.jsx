import React, { useContext, useEffect, useRef } from 'react';
import { useForm } from '../Hooks/useForm';
import { countersContext, typingContext } from '../Typing/TypingContext';

const TypingBox = () => {

  const { formValues, handleInputChanges, reset } = useForm({
    typedWord : ""
  }) 

  const countingPressed = useRef(-1) // Reference to counting the pressed chars by every word typed
  const currentStringTyped = useRef("");
  const { words } = useContext(typingContext)

  // Necessary counters for typing test 
  const { counterWords,
          counterCorrect, 
          counterIncorrect, 
          counterKeyPress,
          currentWord, 
          setCurrentWord} = useContext(countersContext)

  useEffect(() =>{
      // Typing logic every time the form input value changes

    const charPressed = formValues.typedWord[formValues.typedWord.length - 1]
    
    // Check last pressed key is space. If true it means that a word was typed
    if (charPressed === " "){

      if(formValues.typedWord.trim() === currentWord){
        // Case the last typed word was typed correctly
        counterCorrect.increment()
        document.getElementById(words[counterWords.counter].id).classList.add("correct")
      }
      else{
        // Case the last typed word wasn't typed correctly
        counterIncorrect.increment()
        document.getElementById(words[counterWords.counter].id).classList.add("incorrect")
      }

      counterWords.increment()
      reset() // Reset form input value every time a word is typed
      setCurrentWord(words[counterWords.counter + 1].word)
      countingPressed.current = -1;
    }
    else{ // Case it was pressed any key different to space bar. It means a word is being typed

          (formValues.typedWord.trim().length < currentStringTyped.current && countingPressed.current > -1)
          ?countingPressed.current--
          :countingPressed.current++
          // Check if the string in the input is the same as the last string. If it's equal it means the backspace key was pressed
          // In this case, the chars count of the current typed string will decrease, in opposite case it means it was pressed any 
          //other key different to backspace, so the chars count of current typed string will increase.

      currentStringTyped.current = formValues.typedWord.trim().length; // This set the current input value as the current string typed
    }

    if(formValues.typedWord.trim() !== currentWord.substring(0,countingPressed.current) && charPressed !== " "){
      // In case the current string typed doesn't match with the current word to type it means the word is being typed incorrectly
      document.getElementById(words[counterWords.counter].id).classList.add("incorrect")
    }else{
      document.getElementById(words[counterWords.counter].id).classList.remove("incorrect")
    }
  
    counterKeyPress.increment() // Counting all pressed chars

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues.typedWord])

  return (
    <div className='flex flex-row items-center w-full mt-4 bg-trasnp h-20 rouded'>
      <input 
        type="text"
        name='typedWord'
        value={ formValues.typedWord }
        onChange={ handleInputChanges }
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