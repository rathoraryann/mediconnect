import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setToken} from '../store/slices/adminSlice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { setDoctorToken } from '../store/slices/valueSlice'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const [state, setState] = useState('Admin')
  const [value, setValue] = useState({
    email: "",
    password: ""
  })
  const token = useSelector(state=>state.admin.token)
  const dToken = useSelector(state=>state.value.dToken)
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state == 'Admin') {
        const {data} = await axios.post(backendUrl+'/api/admin/login', {email: value.email,password: value.password})
        if (data.success) {
          localStorage.setItem('token', data.token)
          dispatch(setToken({data: data.token}))
          navigate('/admin-dashboard')
        }else{
          toast.error(`${data.message}`)
        }
      }else{
        const {data} = await axios.post(backendUrl+'/api/doctor/login', {email: value.email, password: value.password})
        if (data.success) {
          localStorage.setItem('dToken', data.token)
          dispatch(setDoctorToken({data: data.token}))
          navigate('/doctor-dashboard')
        }else{
          toast.error(`${error.message}`)
        }
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  }
  
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-500 text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full'>
          <p className='m-1'>Email</p>
          <input value={value.email} onChange={(e)=>setValue({...value, email: e.target.value})} type="email" required className='border border-[#DADADA] rounded w-full p-2 m-1'/>
        </div>
        <div className='w-full'>
          <p className='m-1'>Password</p>
          <input value={value.password} onChange={(e)=>{setValue({...value, password: e.target.value})}} type="password" required className='border border-[#DADADA] rounded w-full p-2 m-1'/>
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base' >Login</button>
        {
          state == 'Admin' ?
          <p>Doctor Login?<span onClick={()=>setState('Doctor')} className='text-primary underline cursor-pointer'> Click here</span></p>
          : <p>Admin Login?<span onClick={()=>setState('Admin')} className='text-primary underline cursor-pointer'> Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
