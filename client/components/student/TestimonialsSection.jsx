import React from 'react'
import { assets, dummyTestimonial } from '../../src/assets/assets'
import TestimonialsCard from './TestimonialsCard'

const TestimonialsSection = () => {
  return (
    <div className='my-20 flex flex-col items-center gap-4'>
       <p className=' font-semibold text-2xl'>Testimonials</p>
       <p className='text-[#565656] text-sm sm:w-1/2 text-center w-[80%]'>Hear from our learners as they share their journeys of transformation, success, and how our platform has made a difference in their lives.</p>
       <div className='flex flex-wrap gap-4 w-[80%] mx-auto mb-26 mt-5 md:justify-start justify-center'>

          {dummyTestimonial.slice(0,3).map((item,i)=>(
            <TestimonialsCard {...item} key={i}/>
          ))}
       </div>
       <p className=' font-bold sm:text-3xl text-xl text-center'>Learn anything, anytime, anywhere</p>
       <p className='text-[#1F2937E5] text-sm sm:w-1/2 text-center w-[80%]'>Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.</p>
       <div className='flex gap-4 my-2'>
        <button className='text-white bg-blue-600 px-6 py-2 cursor-pointer rounded text-sm sm:text-base whitespace-nowrap ' >Get started </button>
        <button className='flex gap-2 text-[#1F2937] items-center '>Learn more <img src={assets.arrow_icon} alt="arrow_icon" className='w-4'/></button>
       </div>
    </div>
  )
}

export default TestimonialsSection
