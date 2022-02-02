import React from 'react';

const Word = ( { wordObj } ) => {
  
  const { id, word} = wordObj

  return(
    <span id={id} className='text-[27px] font-lato rounded px-2 leading-normal ml-2 dark:text-white mt-2 mb-2'>
      {word}
    </span>
    );
};

export default Word;