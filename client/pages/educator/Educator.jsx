import React from 'react';
import { Outlet } from 'react-router-dom';
import EduNavbar from '../../components/educator/EduNavbar';
import Sidebar from '../../components/educator/Sidebar.jsx';


const Educator = () => {
  return (
    <div className='text-default min-h-screen bg-white'>


    
       <div className='flex '>

          <Sidebar/>
          <div className='flex-1 '>
          {  <Outlet />}
          </div>
       </div>

    </div>
  )
}

export default Educator
