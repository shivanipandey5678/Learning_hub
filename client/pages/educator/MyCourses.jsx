import React, { useContext, useEffect, useState } from 'react'

import { assets, dummyDashboardData } from '../../src/assets/assets'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading';


const MyCourses = () => {

  const { currency ,allCourses} = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchAllCouses = async () => {
    setCourses(allCourses)
  }

  useEffect(() => {
    fetchAllCouses()
  }, [])


  return courses ? (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pb-0 pt-8'>
    
       <div className='spacing-y-5'>

    

      
      <p className='text-gray-600 font-medium text-xl md:text-2xl'>My Courses </p>
      <table className='table-fixed md:table-auto-full overflow-hidden'>
        <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
          <tr >
            <th className='px-4 py-3 font-semibold  truncate' >All Courses</th>
            <th className='px-4 py-3 font-semibold truncate text-left'>Earnings</th>
            <th className='px-4 py-3 font-semibold truncate '>Students</th>
            <th className='px-4 py-3 font-semibold truncate '>Course Status</th>
          </tr>
        </thead>
        <tbody className='text-sm text-gray-500'>
            {
              courses.map((course,i)=>(
                <tr key={i} className='border-b border-gray-500/20'>

                   <td className='md:px-4 px-2 py-3 flex items-center space-x-3 '>
                      <img src={course.courseThumbnail} alt="courseThumbnail" className='w-16'/>
                      <span className='truncate hiddem md:block'>{course.courseTitle}</span>
                   </td>
                   <td>

                   {currency}{Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}
                   </td>

                   <td className='px-4 py-3'>{course.enrolledStudents.length}</td>
                   <td className='px-4 py-3'>{new Date(course.createdAt).toLocaleDateString()}</td>
                </tr>

              ))
            }
        </tbody>
      </table>

          
 
     

      </div>
      </div>
  ) : <Loading />
}

export default MyCourses
