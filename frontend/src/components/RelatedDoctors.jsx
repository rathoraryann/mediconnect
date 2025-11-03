import React, { useEffect, useState } from 'react'
import {useSelector} from  'react-redux'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({docId, speciality}) => {
  
  const doctors = useSelector((state)=>state.doctors.doctors)
  const navigate = useNavigate();
  const [relatedDoctors, setRelatedDoctors] = useState([])

  useEffect(()=>{
    if (doctors.length>0 && speciality) {
      const doctorsData = doctors.filter((item)=>item.speciality == speciality && item._id != docId)
      setRelatedDoctors(doctorsData)
    }
  }, [docId, speciality, doctors])

  return (
      <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relatedDoctors.slice(0, 5).map((item, index) => {
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0,0);
              }}
            >
              <img src={item.image} alt="" className="bg-gray-900" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center">
                  <p className={`w-2 h-2 rounded-full ${item.available? ' bg-green-500' : 'bg-red-700'}`}></p>
                  <p className={` ${item.available? ' text-green-500' : 'text-red-700'}`}>{item.available? 'Available' : 'Unavailable'}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className="bg-black text-white px-12 py-3 rounded-full mt-10">
        more
      </button>
    </div>
  )
}

export default RelatedDoctors
