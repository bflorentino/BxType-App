import React, { useContext, useEffect } from 'react';
import { types } from '../Typing/Types';
import { typingContext } from '../Typing/TypingContext';
import TextBox from "./TextBox";
import TypingBox from './TypingBox';

const TypeTest = () => {

    // const { dispatch, testSettings } = useContext(typingContext);

    // const { counters, countersDispatch } = useContext(typingContext)

    // useEffect(()=> {
    //     console.log(countersD)
    //     countersDispatch({
    //         type: types.Reset
    //     })
    //     console.log(counters)
    // })

    // useEffect(()=> {
    //     dispatch({
    //         type: types.GenerateWords,
    //         payload:  testSettings.language
    //     })
    // }, [dispatch, testSettings])

    return(
        <div className='w-2/3 mt-36'>
            <TextBox />
            <TypingBox />
        </div>
    ) 
}

export default TypeTest;