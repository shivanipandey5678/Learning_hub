import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/student/SearchBar'
import { dummyCourses } from '../../src/assets/assets'
import CourseCard from '../../components/student/CourseCard'
import { assets } from "../../src/assets/assets";
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import Footer from '../../components/student/Footer';

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const [input, setInput] = useState('');
  const { typedata } = useParams();
  const [filterCourse, setFilterCourse] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState('');

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();
      searchedTerm ? setFilterCourse(tempCourses.filter(item => item.courseTitle.toLowerCase().includes(input)))
        : setFilterCourse(tempCourses)
    }
    console.log({ input })
  }, [allCourses, searchedTerm])
  const onSearchHandler = (e) => {
    e.preventDefault();
    setSearchedTerm(input);
    navigate("/course-list/" + input)
  }
  return (
    <>
    
  
    <div className='md:px-7 sm:px-7 xs:px-3 px-1 my-8'>
      <div className='flex md:justify-between items-center md:w-[80%] mx-auto flex-wrap gap-2 justify-center'>

        {/* CoursesList header left section */}
        <div>
          <p className='ms:text-2xl font-bold text-3xl'>Course List</p>
          <p className='md:block hidden cursor-pointer' onClick={() => navigate("/")}><span className='text-blue-400 font-bold' >Home</span> / Course List</p>
        </div>
        {/* CoursesList header right section */}
        <div className='flex items-center  border border-gray-400 lg:w-1/3 md:w-1/2 w-full my-10 p-2 gap-2'>
          <div className='flex items-center gap-2 flex-grow'>
            <img src={assets.search_icon} alt="search_icon" className='sm:block hidden' />
            <input
              onChange={e => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder='Search for courses'
              className='border-none outline-none pl-1 flex-grow min-w-0'
            />
          </div>

          <button className='text-white bg-blue-600 px-6 py-2 cursor-pointer rounded text-sm sm:text-base whitespace-nowrap' onClick={onSearchHandler}>
            Search
          </button>
        </div>
      </div>

      {searchedTerm && <div className='inline-flex items-center gap-4 px-4 py-2 border -mb-6 text-gray-600 rounded-full ml-15'>
        <p>{searchedTerm}</p>
        <img src={assets.cross_icon} alt="cross_icon" className='cursor-pointer' onClick={() => {
          navigate('/course-list');
          setSearchedTerm('');
          setInput('');
        }} />
      </div>
      }

      {/* courses card grid */}

      <div className="w-[90%] mx-auto grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] mb-10 mt-20 ">
        {filterCourse.map((item, i) => (
          <CourseCard key={i} {...item} />
        ))}

      </div>
      <button className='block px-6 py-3 text-sm text-gray-400 border-2 border-gray-300 mx-auto rounded mb-10' onClick={() => navigate('/course-list')} >Load More</button>

    </div>
      <Footer/>
      </>
  )
}

export default CoursesList
