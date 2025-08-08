import React from 'react'
import { assets } from '../../src/assets/assets'
import SearchBar from './SearchBar'

const Footer = () => {
  return (
    // main footer box
    <div className='bg-[#111820] flex flex-col text-gray-400 text-sm py-4 px-7 '>
      <div className='flex justify-evenly md:flex-row flex-col gap-4'>

       <div className='md:w-[30%] '>
        {/* first div */}
        <div className='flex gap-1 items-center mb-1'>
           <img src={assets.learning_hub_logo} alt="" className='w-14 mb-1'/>
           <p className='text-white text-xl'>Learning Hub</p>
        </div>
        <p className='text-xs leading-loose'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</p>
       </div>
       {/* second block */}
       <div className='flex flex-col gap-4 items-start list-none md:w-[20%]'>
           <p className='mb-1 text-semibold text-white'>Company</p>
           <li >Home</li>
           <li>About us</li>
           <li>Contact us</li>
           <li>Privacy policy</li>
       </div>

       {/* third block */}
       <div  className='flex flex-col gap-4 items-start list-none md:w-[30%]'>
       <p className='mb-1 text-semibold text-white'>Subscribe to our newsletter</p>
       <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
       <div className='md:flex gap-2 my-2 md-block hidden flex-wrap'>
        <input type="text"  placeholder='Enter your email' className='bg-gray-500 px-3 py-1 placeholder-gray-200 rounded-md'/>
        <button className='text-white bg-blue-600 px-6 py-2 cursor-pointer rounded-md'>Susbcribe</button>
       </div>
       </div>
      </div>
      <hr className='bg-gray-300 my-6'/>
      <p className='text-center text-gray-400 py-7'>Copyright 2024 © Learning Hub. All Right Reserved.</p>
        
    </div>
  )
}

export default Footer
