import React from 'react'
import { assets, dummyCourses, dummyEducatorData } from '../../src/assets/assets';
import {UserButton,useUser} from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom';

const EduNavbar = () => {
  const educatorData = dummyEducatorData;
  const {user} = useUser();
  const navigate =useNavigate();

  return (
    <div className='flex justify-between md:px-14 p-4 md:py-2 border-b-1 border-gray-500 py-1  '>
       <img src={assets.learning_hub_logo} alt="learning_hub_logo" className='md:w-16 w-12' onClick={()=>navigate('/')} />
       <div className='flex gap-3 items-center relative group '>
        <p className='font-semibold text-gray-500'>
           Hi {user ? user.fullName : 'Developers'}
        </p>
        {user? <UserButton/> : <img src={assets.user_icon} alt="user_icon"  className='w-8 cursor-pointer'/>}
       
        <div className='group-hover:block hidden top-full right-0 absolute  bg-white shadow-md rounded '>
          <ul className='p-3 flex flex-col gap-2'>
            <li className='cursor-pointer hover:underline'>My Profile</li>
            <li className='cursor-pointer hover:underline'>Logout</li>
          </ul>
           
        </div>
       </div>
    </div>
  )
}

export default EduNavbar
