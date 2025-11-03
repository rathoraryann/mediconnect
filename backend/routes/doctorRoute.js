import express from 'express'
import {allDoctors} from '../controller/adminController.js'
import { appoinmentsDoctor, appointmentCancel, appointmentComplete, doctorDashboard, doctorProfile, editDoctorProfile, loginDoctor } from '../controller/docterController.js'
import { authDoctor } from '../middllewares/authDoctor.js'

const adminRouter = express.Router()

adminRouter.get('/list',  allDoctors)
adminRouter.post('/login',  loginDoctor)
adminRouter.get('/appointments',  authDoctor, appoinmentsDoctor)
adminRouter.post('/cancel-appointment',  authDoctor, appointmentCancel)
adminRouter.post('/complete-appointment',  authDoctor, appointmentComplete)
adminRouter.get('/dashboard',  authDoctor, doctorDashboard)
adminRouter.get('/profile',  authDoctor, doctorProfile)
adminRouter.post('/update-profile',  authDoctor, editDoctorProfile)


export default adminRouter