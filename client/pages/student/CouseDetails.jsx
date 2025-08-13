import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../src/assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/student/Footer';
import Youtube from 'react-youtube'

const CouseDetails = () => {

  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [isAlreadyEnrolled,setIsAlreadyEnrolled]= useState(true);
  const [playerData,setPlayerData]= useState(null);
  const { allCourses, calculateRating, calculateNumberOfLectureInCourse,
    calculateChapterTime, calculateCourseDuration, currency } = useContext(AppContext);


  const fetchCouseData = async () => {
    const findCourse = allCourses.find(course => course._id === id);
    setCourseData(findCourse);
  }

  useEffect(() => {
    fetchCouseData()
  }, [allCourses])

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-26 px-8 md:pt-30 pt-20 text-left'>
        <div className='absolute top-0 left-0 w-full h-[100%] -z-1 bg-gradient-to-b from-cyan-100/70 to-white'></div>
        {/* left column */}
        <div className='max-w-xl text-gray-500 z-10'>
          <h1 className='md:text-3xl text-2xl font-semibold text-gray-800'>{courseData.courseTitle}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200)
            }}
            className='pt-4 md:text-base text-sm' />

          {/* review and rating */}
          <div className='flex gap-2'>
            <p className='font-semibold'>{calculateRating({ ...courseData })}</p>

            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} className='w-4' />
              ))}
            </div>
            <p className='text-gray-500'>{courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'}</p>

            <p>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}</p>
          </div>

          <p className='text-sm'>Course by <span className='text-blue-600 underline'>GreatStack</span></p>

          <div className='pt-8 text-gray-800'>
            <h2 className='text-xl font-semibold'>Course Structure</h2>
            <div className='p-2'>
              {courseData.courseContent.map((chapter, index) => (
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
                          <img src={assets.play_icon} alt="play_icon" className='h-3 mt-1' />
                          <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                            <p className=''>{lecture.lectureTitle}</p>
                            <div className='flex gap-2'>
                              {lecture.isPreviewFree && <p className='text-blue-500 cursor-pointer ' onClick={()=>setPlayerData({videoId:lecture.lectureUrl.split('/').pop()})}>Preview</p>}
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
          </div>

          <div className='py-20 text-sm md:text-default'>
            <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription
              }}
              className='pt-3 rich-text' />
          </div>
        </div>

        {/* right column */}
        <div className='z-10 min-w-[300px] sm:min-w-[420px] bg-white overflow-hidden md:rounded-none rounded-t shadow-md max-w-[424px]'>

             {
                playerData? 
                 <Youtube videoId={playerData.videoId} opts={{playerVars:{autoplay:1}}} iframeClassName='w-full aspect-video'/>
              : <img src={courseData.courseThumbnail} alt="courseThumbnail" />
              }
         
          <div className='p-5'>
            <div className='flex items-center gap-2'>

             <img src={assets.time_left_clock_icon} alt="time_left_clock_icon" />
          
              <p className='text-red-500'><span className='font-medium'>5 days </span>left at this price!</p>
            </div>
            <div className='flex gap-3 items-center pt-2'>
              <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>{currency} {(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}</p>
              <p className='md:text-lg text-gray-500 line-through'>{currency}{courseData.coursePrice}</p>
              <p className='md:text-lg text-gray-500'>{courseData.discount} % off</p>
            </div>

            <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500'>
              <div className='flex gap-1'>
                <img src={assets.star} alt="star icon" />
                <p>{calculateRating(courseData)}</p>
              </div>
              <div className='h-4 w-px bg-gray-500/40'>   </div>
              <div className='flex items-center gap-2'>

                <img src={assets.time_clock_icon} alt="time_clock_icon" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

              <div className='h-4 w-px bg-gray-500/40'>   </div>
              <div className='flex items-center gap-2'>

                <img src={assets.lesson_icon} alt="lesson_icon" />
                <p>{calculateNumberOfLectureInCourse(courseData)} lessons</p>
              </div>

            </div>
            <button className='md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium'>{isAlreadyEnrolled? 'Already Enrolled' : 'Enroll Now'}</button>
            <div className='rich-text my-4'>
              <p className='md:text-xl font-semibold text-gray-700 text-lg'>What’s in the course?</p>
              <ul>
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance</li>
                <li>Downloadable resources and source co</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
                <li>Quizzes to test your knowledge.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </>
  ) : <Loading />
}

export default CouseDetails
