import React from 'react';

const Header = () => {

  return(
       <div className='w-full flex border-b border-borderColor'>
           <div className='mt-5 mb-5 flex ml-36'>
            <img src="../assets/Images/appicon.png" alt="Icon" />
            <h1 className='font-lato text-5xl text-brown ml-4'>BxType</h1>
           </div>
           <div className='mt-5 mb-5 ml-auto mr-36'>
               <img src="../assets/Images/dark-mode.png" 
                    alt=""
                    className='w-10' 
                />
           </div>
      </div>);
};

export default Header;
