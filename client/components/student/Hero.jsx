import React, { useContext } from 'react'
import { assets } from '../../src/assets/assets'
import SearchBar from './SearchBar'
import { AppContext } from '../../context/AppContext';

const Hero = () => {
   const {allCourses}  = useContext(AppContext);
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20  bg-gradient-to-b from-cyan-100/70 to-white text-center md:px-0 px-7 space-y-6'>
      <h1 className='relative font-bold text-gray-800  mx-auto md:text-4xl md:w-1/2 text-3xl w-full'>Empower your future with the 
      courses designed to <span className='text-blue-600'>fit your choice.</span><img src={assets.sketch} alt="sketch" className='md:block hidden absolute right-0 -bottom-7' /></h1>

      <p className='md:block  text-gray-500 md:w-1/2 w-full'>We bring together world-class instructors, interactive content, and a supportive
      community to help you achieve your personal and professional goals.</p>
      <SearchBar/>
    </div>
  )
}

export default Hero
