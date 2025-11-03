import React from 'react'
import {assets} from '../assets/assets'
const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT US</p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>Dwarka, New Delhi</p>
          <p className='text-gray-500'>8810253423</p>
          <p className='font-semibold text-lg text-gray-600'>Careers at Mediconnect</p>
          <p className='text-gray-500'>learn more about our teams and job openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:text-white hover:bg-primary transition-all duration-500 '>Explore jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
