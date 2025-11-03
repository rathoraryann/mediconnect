import React from 'react'
import {assets} from '../assets/assets'

const About = () => {
  return (
    <div >
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>About <span>US</span></p>
      </div>
      <div className='flex flex-col md:flex-row gap-12 my-10'>
        <img src={assets.about_image} alt="" className='w-full md:max-w-[360px]'/>
        <div className='flex flex-col justify-center text-gray-600 gap-6 text-sm md:w-2/4'>
          <p>MediConnect is a comprehensive digital platform designed to bridge the gap between patients and healthcare providers.It offers seamless appointment booking, real-time doctor availability, and online consultations.</p>
          <p>With features like electronic health records, reminders, and medicine tracking, MediConnect empowers users to manage their health with ease. The platform aims to simplify healthcare access, especially for remote and underserved communities. MediConnect ensures secure, efficient, and personalized healthcare experiences through technology.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>To revolutionize healthcare accessibility by creating a seamless digital bridge between patients and medical professionals—ensuring timely, transparent, and personalized care for everyone, everywhere.</p>
        </div>
      </div>
    </div>
  )
}

export default About