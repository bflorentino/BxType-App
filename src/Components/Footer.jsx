import React from 'react';

const Footer = () => {
    return (
      <div className='dark:text-white font-lato absolute bottom-0 mb-4'>
        <a href="https://github.com/bflorentino/BxType-App.git" target='blank' className='flex justify-center'>
          <img 
            src='../assets/Images/ghicon.png'
            className='h-10 w-10' 
            alt="github repository" 
          />
        </a>
        Developed by Bryan Florentino
      </div>);
};

export default Footer;