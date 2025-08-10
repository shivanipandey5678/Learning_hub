import React, { useContext } from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CourseCard from '../../components/student/CourseCard'
import { dummyCourses } from '../../src/assets/assets'
import TestimonialsSection from '../../components/student/TestimonialsSection'
import Footer from '../../components/student/Footer'
import { AppContext } from '../../context/AppContext'

const Home = () => {
  const {navigate}=useContext(AppContext);
  const {allCourses}  = useContext(AppContext);
  return (
    <div>
      <Hero />
      <Companies />
      <div className='flex flex-wrap gap-6 w-[90%] mx-auto justify-center pb-10 pt-10'>

        {allCourses.slice(0, 4).map((item, i) => {
          return <CourseCard {...item} key={i} />
        })}  
        

      </div>
      <button className='block px-6 py-3 text-sm text-gray-400 border-2 border-gray-300 mx-auto rounded mb-10' onClick={()=>navigate('/course-list')} >Show all courses</button>
      <TestimonialsSection/>
      <Footer/>
    </div>
  )
}

export default Home
