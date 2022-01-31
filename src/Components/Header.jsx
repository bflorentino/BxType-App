import React, { useContext } from 'react';
import { typingContext } from '../Typing/TypingContext';

const Header = () => {

     const { theme, setTheme, lastTheme } = useContext(typingContext);

     const setAppTheme = (e) =>{

          lastTheme.current = theme;

          if(window.localStorage.theme === "dark"){
               setTheme("ligth")
               localStorage.removeItem("theme")
          }else{     
               setTheme("dark")
               localStorage.theme = "dark"
          }
  
          document.getElementById("root").classList.toggle("dark-root")  
          document.documentElement.classList.toggle('dark')
      } 

  return(
       <div className='w-full flex border-b border-borderColor'>
           <div className='mt-5 mb-5 flex ml-36'>
            <img src="../assets/Images/appicon.png" alt="Icon" />
            <h1 className='font-lato text-4xl text-brown ml-4 dark:text-white'>BxType</h1>
           </div>
           <div 
               className='mt-5 mb-5 ml-auto mr-36 cursor-pointer'
               onClick={ setAppTheme }>
               <img 
                    src= {`${theme === 'ligth' ? '../assets/Images/dark-mode.png' : '../assets/Images/ligth-mode.png'} `}
                    alt=""
                    className='w-8' 
                />
           </div>
      </div>);
};

export default Header;
