import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from '../Hooks/useForm';
import { countersContext, typingContext } from '../Typing/TypingContext';
import Timer from './Timer';

const TypingBox = ( ) => {

  const { formValues, handleInputChanges, reset } = useForm({
    typedWord : ""
  }) 

  const countingPressed = useRef(0) // Reference to counting the pressed chars by every word typed
  const currentStringTyped = useRef("");
  const [ started, setStarted ] = useState(false);
  const { words, setCurrentMode } = useContext(typingContext)

  // Necessary counters for typing test 
  const { 
          counterCorrect, 
          counterIncorrect, 
          currentWord, 
          setCurrentWord,
          counterCorrectChars,
          counterIncorrectChars,
          counterRowWords } = useContext(countersContext)


  useEffect(() =>{
      // Typing logic every time the form input value changes
    if(started){

      const charPressed = formValues.typedWord[formValues.typedWord.length - 1]
      
      // Check last pressed key is space. If true it means that a word was typed
      if (charPressed === " "){
  
        if(formValues.typedWord.trim() === currentWord){
          // Case the last typed word was typed correctly
          counterCorrect.increment()
          document.getElementById(words[counterRowWords.counter].id).classList.add("correct")
        }
        else{
          // Case the last typed word wasn't typed correctly
          counterIncorrect.increment()
          document.getElementById(words[counterRowWords.counter].id).classList.add("incorrect")
        }

        counterRowWords.increment()
        reset() // Reset form input value every time a word is typed
        setCurrentWord(words[counterRowWords.counter + 1].word)
        countingPressed.current = -1;
      }
      else{ // Case it was pressed any key different to space bar. It means a word is being typed
        
        // Check if the string in the input is the same as the last string. If it's equal it means the backspace key was pressed
        // In this case, the chars count of the current typed string will decrease, in opposite case it means it was pressed any 
        //other key different to backspace, so the chars count of current typed string will increase.
        (formValues.typedWord.trim().length < currentStringTyped.current && countingPressed.current > -1)
        ?countingPressed.current--
        :countingPressed.current++
        
        currentStringTyped.current = formValues.typedWord.trim().length; //This set the current input value as the current string typed

        if(formValues.typedWord.trim() !== currentWord.substring(0,countingPressed.current)){
          // In case the current string typed doesn't match with the current word to type it means the word is being typed incorrectly
          document.getElementById(words[counterRowWords.counter].id).classList.add("incorrect")
          counterIncorrectChars.increment();
        }
        else{
          document.getElementById(words[counterRowWords.counter].id).classList.remove("incorrect")
          counterCorrectChars.increment();
        }
      }
    }
    // eslint-disable-next-line
  }, [formValues.typedWord])

  const handleKeyPressed = ( e ) => {
    !started && setStarted(true)
  }

  const handleEnd = ( e ) => {

    counterCorrect.reset(0)
    counterIncorrect.reset(0) 
    counterCorrectChars.reset(0)
    counterIncorrectChars.reset(0)
    counterRowWords.reset(0)
    setCurrentMode("start");
  }
  
  return (
    <div className='flex flex-row items-center w-full mt-4 bg-trasnp h-16 rouded'>
      <input 
        type="text"
        name='typedWord'
        placeholder='Start Typing'
        value={ formValues.typedWord }
        onChange={ handleInputChanges }
        onKeyPress={ handleKeyPressed }
        className='w-3/4 h-3/4 py-2 outline-none text-2xl font-lato ml-4 px-2 dark:text-white rounded'
      />
      <Timer started={started}/>
      <button 
          className='bg-btnColor h-3/4 px-3 text-white font-lato text-lg ml-4 rounded'
          onClick={ handleEnd }>
        Home
      </button>
    </div>
  ) 
};

export default TypingBox; 