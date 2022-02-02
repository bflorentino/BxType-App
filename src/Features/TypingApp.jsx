import React, { useReducer, useState, useEffect, useRef } from 'react';
import { useCounter } from '../Hooks/useCounter';
import { countersContext, typingContext } from '../Typing/TypingContext';
import { wordsReducer } from '../Typing/TypingReducer';
import BeginForm from './Start/BeginForm';
import Header from './Header/Header';
import TypeTest from './TypingTest/TypeTest';
import TestResults from './TestResults/TestResults';
import Footer from './Footer/Footer';

const TypingApp = () => {

  const [ currentMode, setCurrentMode ] = useState("start")
  const [ testSettings, setTestSettings ] = useState({})
  const [ currentWord, setCurrentWord ] = useState("");
  const [ words ,dispatch ] = useReducer( wordsReducer, []);
  const [ theme, setTheme ] = useState("");
  const lastTheme = useRef("");

  useEffect(() => {
    if(window.localStorage.theme === 'dark'){
        document.getElementById("root").classList.add("dark-root")  
        document.documentElement.classList.add('dark')
        setTheme('dark')
    }else{
      setTheme('ligth')
    }
}, [])

  return(
    <>  
      {/*Context provider. Context data will be shared between components. This includes the choosen language, testType and the generated words */}
      <typingContext.Provider
        value={ 
          {
            words,
            dispatch,
            testSettings,
            setTestSettings,
            setCurrentMode,
            setTheme,
            theme,
            lastTheme
          }
        }>
          <Header />

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