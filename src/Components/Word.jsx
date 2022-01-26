import React from 'react';

const Word = ( { wordObj } ) => {
  
  const { id, word} = wordObj

  return(
    <span id={id} className='text-3xl font-lato rounded px-2 leading-normal ml-4 dark:text-white mt-2 mb-4'>
      {word}
    </span>
    );
};

export default Word;