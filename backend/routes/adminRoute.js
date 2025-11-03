import express from 'express'
import {addDoctor, adminDashboard, allDoctors, appointmentCancel, appointmentsAdmin, loginAdmin} from '../controller/adminController.js'
import upload from '../middllewares/multer.js'
import authAdmin from '../middllewares/authAdmin.js'
import { changeDoctorAvailability } from '../controller/docterController.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.get('/all-doctors', authAdmin, allDoctors)
adminRouter.post('/change-availability', authAdmin, changeDoctorAvailability)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)


export default adminRouter