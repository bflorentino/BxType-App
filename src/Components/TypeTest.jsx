import React from 'react';
import TextBox from "./TextBox";
import TypingBox from './TypingBox';

const TypeTest = ( { setCurrentMode}) => {

    return(
        <div className='w-2/3 mt-28'>
            <TextBox  />
            <TypingBox setCurrentMode={  setCurrentMode } />
        </div>
    ) 
}

export default TypeTest;