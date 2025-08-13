import React from 'react'
import { assets } from '../../src/assets/assets'

const Footer = () => {
  return (
    <div className='flex md:justify-between md:p-10 md:flex-row flex-col-reverse items-center p-3'>
      <div className='flex items-center gap-4 '>
        <img src={assets.learning_hub_logo} alt="learning_hub_logo" className='md:w-15 w-10' />
        <div className='w-px bg-gray-600 h-6'>  </div>
        <p className='md:text-sm text-gray-600 text-xs'>All right reserved. Copyright @Edemy</p>
      </div>
      <div className='flex gap-2'>
        <img src={assets.facebook_icon} alt="facebook_icon" className='w-10' />
        <img src={assets.twitter_icon} alt="twitter_icon" className='w-10' />
        <img src={assets.instagram_icon} alt="instagram_icon" className='w-10' />
      </div>
    </div>
  )
}

export default Footer
