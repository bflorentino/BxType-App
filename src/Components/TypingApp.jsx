import React, { useReducer, useState } from 'react';
import { useCounter } from '../Hooks/useCounter';
import { countersContext, typingContext } from '../Typing/TypingContext';
import { countersReducer, wordsReducer } from '../Typing/TypingReducer';
import BeginForm from './BeginForm';
import Footer from './Footer';
import Header from './Header';
import TestResults from './TestResults';
import TypeTest from './TypeTest';

const init = () => []

const TypingApp = () => {

  const [ currentMode, setCurrentMode ] = useState("start")
  const [ testSettings, setTestSettings ] = useState({})
  const [ currentWord, setCurrentWord ] = useState("");
  const [ words ,dispatch ] = useReducer( wordsReducer, [], init );
  // const [counters, countersDispatch]  = useReducer(countersReducer, {}, init )

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
            // counters,
            // countersDispatch
          }
        }>

        {(currentMode === 'start') && <BeginForm setCurrentMode = { setCurrentMode } />}
        
        <countersContext.Provider 
          value={
            {
              counterWords : useCounter(0),
              counterCorrect : useCounter(0),
              counterIncorrect : useCounter(0),
              counterKeyPress : useCounter(0),
              currentWord,
              setCurrentWord,
              counterCurrentWordIndex : useCounter(0)
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