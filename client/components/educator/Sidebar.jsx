import React ,{useContext} from 'react'
import { assets } from '../../src/assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import {NavLink} from 'react-router-dom';

const Sidebar = () => {
  const {isEducator} =useContext(AppContext);
  const navigate=useNavigate();

  const menuItems = [
    {
      icon: assets.home_icon,
      label: 'Dashboard',
      path: '/educator/educator'
    },
    {
      icon: assets.add_icon,
      label: 'Add Course',
      path: '/educator/add-course'
    },
    {
      icon: assets.my_course_icon,
      label: 'My Courses',
      path: '/educator/my-courses'
    },
    {
      icon: assets.person_tick_icon,
      label: 'Student Enrolled',
      path: '/educator/student-enrolled'
    }
  ];
  return isEducator && (
    <div className='flex flex-col md:w-64 w-16 border-r border-gray-500 min-h-screen text-base '>
      {menuItems.map((item,i)=>(
        <NavLink to={item.path} key={i} className={({isActive})=>`flex items-center md:flex-row  flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${isActive ? 'bg-blue-50  border-r-[6px]  border-blue-400 ' :'  '}`} end={item.path==='/educator'}>
          <img src={item.icon} alt="" className='w-8 h-8'/>
          <p className='md:block hidden text-gray-500 items-center'>{item.label}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar
