import React from 'react';

const Word = ( { wordObj } ) => {
  
  const { id, word} = wordObj

  return(
    <div id={id} className='text-4xl font-lato rounded px-2 leading-normal ml-4 dark:text-white mt-2 mb-4'>
      {word}
    </div>
    );
};

export default Word;