import React from 'react'
import { assets } from '../../src/assets/assets'

const TestimonialsCard = ({name,role,image,feedback,rating}) => {
    rating=Math.ceil(rating)
  return (
    <div className=' flex flex-col gap-3 border-2 border-gray-200 rounded-md w-full sm:w-[300px] md:w-[320px]'>
       <div className='flex gap-5 bg-gray-100  p-3'> 
            <img src={image} alt="" className='w-12 h-12 rounded-full '/>
            <div className='flex flex-col gap-1'>
                <p className='font-medium'>{name}</p>
                <p className='text-xs font-medium'>{role}</p>
            </div>
        </div>
        <div className='p-3 flex flex-col gap-2'>

        <div className='flex gap-1'>
               {[...Array(rating)].map((_,i)=>(
                <img src={assets.star} alt="star" />
               ))}
              
        </div>
        <p className='text-sm text-gray-600'>{feedback}</p>
        <p className='text-[#1C70FF] underline mt-4 cursor-pointer'>Read more</p>
       
        </div>
    </div>
  )
}

export default TestimonialsCard
