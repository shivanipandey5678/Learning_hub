import React from 'react'
import { assets } from '../../src/assets/assets'

const Companies = () => {
  return (
    <div className='flex flex-col gap-5 text-center mx-auto w-2/3 my-20'>
      <p className='text-gray-500 font-semibold'>Trusted by learners from</p>
      <div className='flex w-full justify-center my-3 flex-wrap gap-x-8 gap-y-5'>
        <img src={assets.microsoft_logo} alt="microsoft_logo"  className='w-24'/>
        <img src={assets.walmart_logo} alt="walmart_logo" className='w-24'/>
        <img src={assets.accenture_logo} alt="accenture_logo" className='w-24'/>
        <img src={assets.adobe_logo} alt="adobe_logo"className='w-24' />
        <img src={assets.paypal_logo} alt="paypal_logo" className='w-24'/>
      </div>
    </div>
  )
}

export default Companies
