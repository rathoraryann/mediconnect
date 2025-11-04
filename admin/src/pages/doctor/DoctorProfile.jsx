import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDoctorProfileData } from '../../store/slices/valueSlice'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const currency = '₹'
  const dispatch = useDispatch()
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const dToken = useSelector(state => state.value.dToken)
  const profileData = useSelector(state => state.value.doctorProfileData)
  const [isEdit, setIsEdit] = useState(false)
  const [ProfileState, setProfileState] = useState(profileData)

  const getDoctorProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + 'api/doctor/profile', { headers: { token: dToken } })
      if (data.success) {
        setProfileState(data.doctorData)
        dispatch(setDoctorProfileData({ data: data.doctorData }))
      }
    } catch (error) {
      toast.error(`${error.message}`)
    }
  }

  const updateDoctorProfile = async () => {
    try {
      const {data} = await axios.post(backendUrl+'api/doctor/update-profile',  {fees: ProfileState.fees, available: ProfileState.available, address: ProfileState.address }, {headers: {token: dToken}})
      if (data.success) {
        toast.success(`${data.message}`)
        getDoctorProfile()
      }else{
        toast.success(`${data.message}`)
      }
    } catch (error) {
      toast.error(`${error.message}`)
    }finally{
      setIsEdit(false) 
    }
  }

  useEffect(() => {
    if (dToken) {
      getDoctorProfile();
    }
  }, [dToken])

  return ProfileState && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div> 
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={ProfileState.image} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{ProfileState.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{ProfileState.degree} - {ProfileState.speciality}</p> 
            <button className='py-0.5 px-2 border text-xs rounded-full'>{ProfileState.experience} years</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-5'>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
              {ProfileState.about}
            </p>
          </div>
          <p className='text-gray-600 font-medium mt-4'>Appointment Fee: <span className='text-gray-800'>{currency} {isEdit? <input className='border bg-gray-200 rounded-md px-1'  type="number" onChange={(e)=>setProfileState(prev=> ({...prev, fees: e.target.value}))}  value={ProfileState.fees}/> :ProfileState.fees}</span></p>
          <div>
            <p className='flex gap-2 pt-2'>
              Address: 
            </p>
            <p className='text-sm'>{isEdit ? <input className='border bg-gray-200 rounded-md px-1'  type="text" onChange={(e)=>setProfileState(prev => ({...prev, address: e.target.value}))} value={ProfileState.address}/> : ProfileState.address}</p>
          </div>
          <div className='flex gap-1 pt-2'>
            <input type="checkbox" name="" id="" onChange={()=>isEdit && setProfileState(prev => ({...prev, available : !prev.available}))} checked={ProfileState.available}/>
            <label htmlFor="">Available</label>
          </div>
          {!isEdit? <button onClick={()=>setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:text-white hover:bg-primary transition-all'>Edit</button>: <button onClick={()=>updateDoctorProfile()} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:text-white hover:bg-primary transition-all'>save</button>}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
