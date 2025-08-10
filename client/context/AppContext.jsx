import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCourses } from "../src/assets/assets";
import humanizeDuration from 'humanize-duration';
export const AppContext=createContext();
const currency='$';



const AppContextProvider = ({children})=> {
   const navigate=useNavigate();
   const [allCourses,setAllCourses] =useState([]);
   const [isEducator,setIsEducator]=useState(true)
   const [enrolledCourses,setEnrolledCourses]=useState([]);

   //fetch all courses
   const fetchAllCourses = async ()=> {
      setAllCourses(dummyCourses)
   };

   // function to calculate avg rating of course
   const calculateRating=({courseRatings=[]}) => {
      if(!Array.isArray(courseRatings) || courseRatings.length==0){
         return 0
      }
      let totalRating=0
      courseRatings.forEach(rating => {
         totalRating+=rating.rating
      })
      return totalRating/courseRatings.length
   }

   //calculate course chapter time
   const calculateChapterTime = (chapter) => {
      let time=0;
      chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration)
      return humanizeDuration(time * 60 * 1000,{units:['h','m']})
   }

   //function to calculate course duration
   const calculateCourseDuration =(course)=>{
     let time=0;
     course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration))
     return humanizeDuration(time * 60 * 1000,{units:['h','m']})
   }

   //function calculate no of lectures in the course
   const calculateNumberOfLectureInCourse=(course)=>{
      let numberOfLecture=0;
      course.courseContent.forEach(chapter => {
         if(Array.isArray(chapter.chapterContent)){
            numberOfLecture+=chapter.chapterContent.length;
         }
      })
      return numberOfLecture
   }

   //fetch user enrolled courses
   const fetchUserEnrolledCourses = () => {
      setEnrolledCourses(dummyCourses)
   }
   useEffect(()=>{
      fetchAllCourses()
      fetchUserEnrolledCourses()
   },[])
   const value={
      currency,navigate,allCourses,calculateRating,isEducator,setIsEducator,calculateNumberOfLectureInCourse,
      calculateChapterTime,calculateCourseDuration,fetchUserEnrolledCourses,enrolledCourses,setEnrolledCourses
   };
   return <AppContext.Provider value={value}>
    {children}
   </AppContext.Provider>
}
export default AppContextProvider;