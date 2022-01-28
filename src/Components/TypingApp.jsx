import React, { useReducer, useState } from 'react';
import { useCounter } from '../Hooks/useCounter';
import { countersContext, typingContext } from '../Typing/TypingContext';
import { wordsReducer } from '../Typing/TypingReducer';
import BeginForm from './BeginForm';
import Footer from './Footer';
import Header from './Header';
import TestResults from './TestResults';
import TypeTest from './TypeTest';

const TypingApp = () => {

  const [ currentMode, setCurrentMode ] = useState("start")
  const [ testSettings, setTestSettings ] = useState({})
  const [ currentWord, setCurrentWord ] = useState("");
  const [ words ,dispatch ] = useReducer( wordsReducer, []);

  return(
    <>
      <Header />
      
      {/*Context provider. Context data will be shared between components. This includes the choosen language, testType and the generated words */}
      <typingContext.Provider
        value={ 
          {
            words,
            dispatch,
            testSettings,
            setTestSettings,
            setCurrentMode
          }
        }>

        {(currentMode === 'start') && <BeginForm setCurrentMode = { setCurrentMode } />}
        
        <countersContext.Provider 
          value={
            {
              counterCorrect       : useCounter(0),
              counterIncorrect     : useCounter(0),
              counterCorrectChars  : useCounter(0),
              counterIncorrectChars: useCounter(0),
              counterRowWords      : useCounter(0),
              currentWord,
              setCurrentWord,
            }
        }>
          
          {(currentMode === 'inProcess') && <TypeTest setCurrentMode = { setCurrentMode } />}
          {(currentMode === 'finished') && <TestResults setCurrentMode = { setCurrentMode } />}

        </countersContext.Provider>
      
      </typingContext.Provider>

      <Footer />
    </>
  )
};

export default TypingApp;