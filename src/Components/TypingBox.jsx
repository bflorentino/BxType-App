import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from '../Hooks/useForm';
import { countersContext, typingContext } from '../Typing/TypingContext';
import HomeButton from './HomeButton';
import Timer from './Timer';

const TypingBox = ( ) => {

  const { formValues, handleInputChanges, reset } = useForm({
    typedWord : ""
  }) 
  const countingPressed = useRef(0) // Reference to counting the pressed chars by every word typed
  const  lastPressedKeyCode = useRef(null) // Reference to last pressed key.
  const [ started, setStarted ] = useState(false);
  const { words, theme } = useContext(typingContext)
  const [ keyCode, setKeyCode ] = useState(0);

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
          document.getElementById(words[counterRowWords.counter].id).classList.remove("dark:text-white")
          document.getElementById(words[counterRowWords.counter].id).classList.add("correct")
          
        }
        else{
          // Case the last typed word wasn't typed correctly
          counterIncorrect.increment()
          document.getElementById(words[counterRowWords.counter].id).classList.remove("dark:text-white")
          document.getElementById(words[counterRowWords.counter].id).classList.add("incorrect")
        }
        
        counterRowWords.increment()
        reset() // Reset form input value every time a word is typed
        setCurrentWord(words[counterRowWords.counter + 1].word) // Set Next word in textBox
        countingPressed.current = -1;
      }
      else{ // Case it was pressed any key different to space bar. It means a word is being typed
        
        // Check if key pressed was Backspace. In case true, It will increase current string chars count, in opposite case it will decrease.
        ( keyCode === 8 && countingPressed.current > -1 )
          ?countingPressed.current--
          :countingPressed.current++
        
        // Comparing string typed with a substring from 0 to the couting of Pressed Keys in current word. If it's different it means word is incorrectly typed
        if(formValues.typedWord.trim() !== currentWord.substring(0,countingPressed.current)){
          document.getElementById(words[counterRowWords.counter].id).classList.remove("dark:text-white")
          document.getElementById(words[counterRowWords.counter].id).classList.add("incorrect")
          counterIncorrectChars.increment();
        }
        else{     
          document.getElementById(words[counterRowWords.counter].id).classList.remove("incorrect")
          if(theme === 'dark'){
            document.getElementById(words[counterRowWords.counter].id).classList.add("dark:text-white")
          }
          !(keyCode === 8 && lastPressedKeyCode.current !== 8) && counterCorrectChars.increment();          
        }
      }
    }
    // eslint-disable-next-line
  }, [formValues.typedWord])

  const handleKeyPressed = ( e ) => {
    !started && setStarted(true)
    lastPressedKeyCode.current = keyCode;
    setKeyCode(e.keyCode)
  }
 
  return (
    <div className='flex flex-row items-center w-full mt-4 bg-trasnp dark:bg-black-box h-16 rouded'>
      <input 
        type="text"
        name='typedWord'
        placeholder='Start Typing'
        autoComplete='off'
        value={ formValues.typedWord }
        onChange={ handleInputChanges }
        onKeyDown = { handleKeyPressed }
        className='w-3/4 h-3/4 py-2 outline-none text-2xl font-lato ml-4 px-2 rounded'
      />
      <Timer started={started}/>
     <HomeButton />
    </div>
  ) 
};

export default TypingBox; 