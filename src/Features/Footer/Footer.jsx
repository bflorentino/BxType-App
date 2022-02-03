import React from 'react';

const Footer = () => {
    return (
      <div className='dark:text-white font-lato absolute bottom-0 mb-2 text-sm'>
        <a href="https://github.com/bflorentino/BxType-App.git" target='blank' className='flex justify-center'>
          <img 
            src='../assets/Images/ghicon.png'
            className='h-6 w-6' 
            alt="github repository" 
          />
        </a>
          Github Repository
      </div>);
};

export default Footer;