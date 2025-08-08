import React from 'react'
import {Routes,Route, useMatch} from 'react-router-dom';
import Home from '../pages/student/Home';
import CoursesList from '../pages/student/CoursesList';
import CouseDetails from '../pages/student/CouseDetails';
import MyEnrollments from '../pages/student/MyEnrollments';
import Players from '../pages/student/Players';
import Loading from '../components/student/Loading';
import Educator from '../pages/educator/Educator';
import Dashboard from '../pages/educator/Dashboard';
import AddCourse from '../pages/educator/AddCourse';
import MyCourses from '../pages/educator/MyCourses';
import StudentsEnrolled from '../pages/educator/StudentsEnrolled';
import Navbar from '../components/student/Navbar';
import EduNavbar from '../components/educator/EduNavbar';
import Hero from '../components/student/Hero';
import SearchBar from '../components/student/SearchBar';

const App = () => {

  // const isEducator= location.pathname.includes("/educator");
  const isEducatorRoute = useMatch('/educator/*')

  return (
    <div>
      {!isEducatorRoute?( <Navbar/>):(<EduNavbar/>)}
 
    
     
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/course-list' element={<CoursesList/>}/>
        <Route path='/course-list/:input' element={<CoursesList/>}/>
        <Route path='/course/:id' element={<CouseDetails/>}/>
        <Route path='/my-enrollments' element={<MyEnrollments/>}/>
        <Route path='/player/:courseId' element={<Players/>}/>
        <Route path='/loading/:path' element={<Loading/>}/>
        <Route path='/educator' element={<Educator/>}>
             <Route path='educator' element={<Dashboard/>}/>
             <Route path='add-course' element={<AddCourse/>}/>
             <Route path='my-courses' element={<MyCourses/>}/>
             <Route path='student-enrolled' element={<StudentsEnrolled/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
