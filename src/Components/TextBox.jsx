import React, { useContext, useEffect, useRef } from 'react';
import { types } from '../Typing/Types';
import { countersContext, typingContext } from '../Typing/TypingContext';
import Word from './Word';

const TextBox = () => {

    const { words, dispatch, theme, lastTheme } = useContext(typingContext)
    const { counterRowWords, setCurrentWord } = useContext(countersContext)
    const currentYPosition = useRef(213);
  
    useEffect(()=>{
        if(counterRowWords.counter > 0){
            document.getElementById(words[counterRowWords.counter - 1].id).classList.remove(`current-${theme}`)
        }else{
            setCurrentWord(words[counterRowWords.counter].word)
        }

        document.getElementById(words[counterRowWords.counter].id).classList.add(`current-${theme}`)
        document.getElementById(words[counterRowWords.counter].id).classList.replace(`current-${lastTheme.current}`,`current-${theme}`)

        if(document.getElementById(words[counterRowWords.counter].id).offsetTop > currentYPosition.current){
            counterRowWords.reset(0);
            dispatch({
                type: types.RemoveWords,
                payload:counterRowWords.counter
            })
        } 
        // eslint-disable-next-line
    }, [counterRowWords.counter, theme])

  return(
       <div className='border-4 border-borderColor h-40 overflow-hidden flex flex-wrap'>
           {
               words.map( word => ( 
                   <Word 
                        key = {word.id}   
                        wordObj = {word}
                    /> 
            ))
           }
       </div>
    );
};

export default TextBox;