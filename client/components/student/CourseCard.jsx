import React, { useContext } from 'react'
import { assets } from '../../src/assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({courseThumbnail,courseTitle,coursePrice,educator,discount,_id,courseRatings}) => {
  const {currency,calculateRating}=useContext(AppContext)
  return (
    <Link to={'/course/'+ _id} onClick={()=>scrollTo(0,0)}>
    <div className='w-[260px] border-1 border-gray-300 rounded-md flex flex-col min-h-[340px] '>
       <img src={courseThumbnail} alt="Thumbnail" className='w-[100%] h-[60%] rounded-t-md' />
       <div className='flex gap-2 flex-col p-3'>
       <p className='font-bold text-2xl'>{courseTitle}</p>
       <p className='text-gray-600'>Richard James</p>
       <div className='flex gap-2'>
          <p className='font-semibold'>{calculateRating({courseRatings})}</p>
        
          <div className='flex'>
             {[...Array(5)].map((_,i)=>(
              <img key={i} src={i<Math.floor(calculateRating({courseRatings})) ? assets.star :assets.star_blank} className='w-4'/>
             ))}
          </div>
          <p>{courseRatings.length}</p>
       </div>
       <p>{currency}{(coursePrice-discount*coursePrice/100).toFixed(2)}</p>
       </div>
     

    </div>
    </Link>
  )
}

export default CourseCard
