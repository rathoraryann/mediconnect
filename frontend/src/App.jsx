import React, { useEffect } from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from "./pages/Login"
import Contact from "./pages/Contact"
import About from "./pages/About"
import MyProfile from "./pages/MyProfile"
import MyAppointments from "./pages/MyAppointments"
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {toast, ToastContainer} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setDoctors } from './store/slices/doctorSlice'
import { setUser } from './store/slices/userSlice'

const App = () => {
  const dispatch = useDispatch();
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const doctors = useSelector(state=>state.doctors.doctors)
  const token = useSelector(state => state.user.token)
  
  const getDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      dispatch(setDoctors({ data: data.doctors }));
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  const getUserData = async () =>{
    try {
      const {data} = await axios.get(`${backendUrl}/api/user/get-profile`, {headers: {token}})
      dispatch(setUser({data: data.userData}))
    } catch (error) {
      toast.error(`${error.message}`)
    }
  }

  useEffect(()=>{
      getDoctors();
    }, [])

  useEffect(()=>{
      if (token) {
        getUserData()
      }else{
        dispatch(setUser({data: {}}))
      }
    }, [token])

  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment getDoctors={getDoctors}/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
