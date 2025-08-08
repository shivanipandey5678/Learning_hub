import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { assets } from '../../src/assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
const Navbar = () => {

  const location = useLocation();
  const isCourseListPage = location.pathname.includes('/course-list');
  const { openSignIn } = useClerk();
  const { user } = useUser();
  return (
    <div className={`flex items-center justify-between  px-4 sm:px-10 md:px-14 py-1 border-b border-gray-500 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <img src={assets.learning_hub_logo} alt="logo" className='w-15 lg:w-20 cursor-pointer' />
      {/* bigger screen */}
      <div className='hidden md:flex  gap-5 items-center  text-gray-500'>
        {user && (
          <div className="flex items-center gap-3 text-gray-700">
            <button className="hover:underline">Become Educator</button>
            <span>|</span>
            <Link to="/my-enrollments" className="hover:underline">My Enrollments</Link>
          </div>
        )}


        {user ? <UserButton /> : <button className='bg-blue-600 px-5 py-2  text-white rounded-full cursor-pointer' onClick={() => openSignIn()}>Create Account</button>}

      </div>

      {/* phone screen */}
      <div className='md:hidden flex items-center gap-1 sm:gap-5 text-gray-500'>

        {user && (
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <button className="hover:underline">Become Educator</button>
            <span>|</span>
            <Link to="/my-enrollments" className="hover:underline">My Enrollments</Link>
          </div>
        )}
        {user ? <UserButton /> : <img src={assets.user_icon} onClick={() => openSignIn()}/>}

      </div>
    </div>
  )
}

export default Navbar
