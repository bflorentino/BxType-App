import React, { useContext, useEffect } from 'react';
import { countersContext, typingContext } from '../Typing/TypingContext';
import Word from './Word';

const TextBox = ( ) => {

    const { words } = useContext(typingContext)
    const { counterWords, setCurrentWord } = useContext(countersContext)
  
    useEffect(()=>{
        if(counterWords.counter > 0){
            document.getElementById(words[counterWords.counter - 1].id).classList.remove("current")
        }else{
            setCurrentWord(words[counterWords.counter].word)
        }
        document.getElementById(words[counterWords.counter].id).classList.add("current")
    }, [counterWords.counter, words, setCurrentWord])

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