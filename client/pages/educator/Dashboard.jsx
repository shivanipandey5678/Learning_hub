import React, { useContext, useEffect, useState } from 'react'

import { assets, dummyDashboardData } from '../../src/assets/assets'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading';

const Dashboard = () => {

  const { currency } = useContext(AppContext);
  const [dashboardData, setDashBoardData] = useState(null);

  const fetchDahboardData = async () => {
    setDashBoardData(dummyDashboardData)
  }

  useEffect(() => {
    fetchDahboardData()
  }, [])


  return dashboardData ? (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pb-0 pt-8'>
      <div className='space-y-5'>
        <div className='flex flex-wrap gap-5 items-center '>
            <div className='flex gap-2 border-2 border-blue-300 rounded px-6 py-4 max-sm:w-[230px]'>
               <img src={assets.patients_icon} alt="patients_icon" />
               <div>
                  <p className='text-gray-600 font-semibold text-xl'>{dashboardData.enrolledStudentsData.length}</p>
                  <p className='text-gray-500 font-semibold'>Total Enrollments</p>
               </div>
            </div>

            <div className='flex gap-2 border-2 border-blue-300 rounded px-6 py-4 max-sm:w-[230px]'>
               <img src={assets.appointments_icon} alt="appointments_icon" />
               <div>
                  <p className='text-gray-600 font-semibold text-xl'>{dashboardData.totalCourses}</p>
                  <p className='text-gray-500 font-semibold'>Total Courses</p>
               </div>
            </div>

            <div className='flex gap-2 border-2 border-blue-300 rounded px-6 py-4 max-sm:w-[230px]'>
               <img src={assets.earning_icon} alt="earning_icon" />
               <div>
                  <p className='text-gray-600 font-semibold text-xl'>{dashboardData.totalEarnings}</p>
                  <p className='text-gray-500 font-semibold'>Total Earnings</p>
               </div>
            </div>
        </div> 
      
      <p className='text-gray-600 font-medium text-xl md:text-2xl'>Latest Enrollments</p>
      <table className='table-fixed md:table-auto-full overflow-hidden'>
        <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
          <tr>
            <th className='px-4 py-3 font-semibold text-center sm:table-cell hidden' >#</th>
            <th className='px-4 py-3 font-semibold'>Student name</th>
            <th className='px-4 py-3 font-semibold'>Course Title</th>
            
          </tr>
        </thead>
        <tbody className='text-sm text-gray-500'>
            {
              dashboardData.enrolledStudentsData.map((item,i)=>(
                <tr key={i} className='border-b border-gray-500/20'>
                  <td className='px-4 py-3 text-center hidden sm:table-cell'>{i+1}</td>
                   <td className='md:px-4 px-2 py-3 flex items-center space-x-3 '>
                      <img src={item.student.imageUrl} alt="profile" className='w-9 h-9 rounded-full'/>
                      <span className='truncate'>{item.student.name}</span>
                   </td>
                   <td className='md:px-4 px-2 py-3 truncate'>
                    {item.courseTitle}
                   </td>
                  
                </tr>

              ))
            }
        </tbody>
      </table>

          
 
     

      </div>
    </div>
  ) : <Loading />
}

export default Dashboard
