import React, { useContext } from 'react'
import { assets } from '../../src/assets/assets'
import { AppContext } from '../../context/AppContext'

const CourseCard = ({courseThumbnail,courseTitle,coursePrice,educator}) => {
  const {currency}=useContext(AppContext)
  return (
    <div className='w-[260px] border-1 border-gray-300 rounded-md flex flex-col '>
       <img src={courseThumbnail} alt="Thumbnail" className='w-[100%] h-[60%] rounded-t-md' />
       <div className='flex gap-2 flex-col p-3'>
       <p className='font-bold text-2xl'>{courseTitle}</p>
       <p className='text-gray-600'>Richard James</p>
       <div className='flex gap-2'>
          <p className='font-semibold'>4.5</p>
          <div className='flex '>

          <img src={assets.star} alt="star"  className='w-4'/>
          <img src={assets.star} alt="star" className='w-4'/>
          <img src={assets.star} alt="star" className='w-4'/>
          <img src={assets.star} alt="star" className='w-4'/>
          <img src={assets.star_blank} alt="star_blank" className='w-4'/>
          </div>
          <p>(122)</p>
       </div>
       <p>{currency}{coursePrice}</p>
       </div>
     

    </div>
  )
}

export default CourseCard
