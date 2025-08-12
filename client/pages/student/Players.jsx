import React, {  useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom';
import { assets } from '../../src/assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/student/Footer.jsx';

import Loading from '../../components/student/Loading.jsx';
import YouTube from 'react-youtube';
import Rating from '../../components/student/Rating.jsx';

const Players = () => {

  const {calculateChapterTime,calculateCourseDuration,calculateNumberOfLectureInCourse,enrolledCourses} =useContext(AppContext);
  const {courseId}=useParams();
  const [courseData,setCourseData]=useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playerData,setPlayerData]= useState(null);
  const getcourseData =() => {
    const searchedCourse=enrolledCourses.find((course)=>course._id===courseId);
    setCourseData(searchedCourse)
  }

  const toggleSection = (i) => {
    setOpenSection((prev)=>(
      {...prev,
        [i]: !prev[i]
      }
    ))
  }

  useEffect(()=> {
    getcourseData()
  console.log({enrolledCourses})
  },[])


  return  (
    <>
    <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36 mb-[12vh]'>
      {/* left column */}
        <div className='pt-8 text-gray-800'>
                  <h2 className='text-xl font-semibold'>Course Structure</h2>
                  <div className='p-2'>
                    {courseData && courseData.courseContent.map((chapter, index) => (
                      <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                        <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(index)}>
                          <div className='flex gap-2'>
                            <img src={assets.down_arrow_icon} alt="down_arrow_icon" className={`transform transition-transform duration-500  ${openSection[index] ? 'rotate-180' : ''}`} />
                            <p>{chapter.chapterTitle}</p>
                          </div>
                          <p>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)} </p>
                        </div>
      
                        <div
                          className={`overflow-hidden transition-all duration-300 p-2 ${openSection[index] ? 'max-h-96' : 'max-h-0'
                            }`}
                        >
      
                          <ul>
                            {chapter.chapterContent.map((lecture, i) => (
                              <li key={i} className='flex items-center gap-2 py-1'>
                                <img src={false?assets.blue_tick_icon:assets.play_icon} alt="play_icon" className='h-3 mt-1' />
                                <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                                  <p className=''>{lecture.lectureTitle}</p>
                                  <div>
                                    {lecture.lectureUrl && <p className='text-blue-500 cursor-pointer ' onClick={()=>setPlayerData({...lecture,chapter:index+1 ,lecture:i+1})}>Watch</p>}
                                    <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
      
                      </div>
      
                    ))}
                  </div>

                  <div className='flex items-center gap-2 py-3 mt-10'>
                    <h1 className='text-xl font-bold'>Rate this Couse:</h1>
                    <Rating initialRating={0}/>
                  </div>
                </div>
      
       {/* right column */}
       <div className='md:mt-10'>
        {
          playerData?(<div className='w-[100%]'>
            <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName='w-full aspect-video'/>
            <div className='flex justify-between items-center mt-1'>
              <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
              <button className='text-blue-600'>{false? 'Colpleted':'Mark Complete'}</button>
            </div>
          </div>): <img src={courseData?  courseData.courseThumbnail:''} alt="" />
        }
            
       </div>
    
    </div>
       <Footer/>
    </>
  )
}

export default Players
