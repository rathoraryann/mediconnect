import doctorModel from '../models/doctorModel.js'
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'

const changeDoctorAvailability = async (req, res) => {
    try {     
        const {docId}  = req.body;
        const doctor = await doctorModel.findById({_id: docId})
        await doctorModel.findByIdAndUpdate(docId, {available : !doctor.available})
        res.json({success: true, message: "Availability changed"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }

}

const loginDoctor = async(req, res) =>{
    try {
        const {email, password} = req.body;
        const doctor = await doctorModel.findOne({email})
        if (!doctor) {
            return res.json({success: false, message: 'Invalid Credentials'})
        }
        const isMatch = await bycrypt.compare(password, doctor.password)
        if (isMatch) {
            const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET)
            res.json({success: true, token})
        }else{
            res.json({success: false, message: "Invalid Credentials"})
        }
    } catch (error) {
        res.json({success: false, message: error.message})        
    }
}

const appoinmentsDoctor = async(req, res)=>{
    try {
        const {docId}  = req;
        const appointments = await appointmentModel.find({docId})
        res.json({success: true, appointments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const appointmentComplete = async(req, res)=>{
    try {
        const {docId} = req;
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId == docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
            return res.json({success: true, message: "Appointment Completed"})
        }else{
            res.json({success: false, message: 'Mark failed'})
        }
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const appointmentCancel = async(req, res)=>{
    try {
        const {docId} = req;
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId == docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
            return res.json({success: true, message: "Appointment Cancelled"})
        }else{
            res.json({success: false, message: 'Cancellation failed'})
        }
        const appointments = await appointmentModel.findById(appointmentId);
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const doctorDashboard = async(req, res) =>{
    try {
        const {docId} = req;
        const appointments = await appointmentModel.find({docId})
        let earnings = 0;
        appointments.map((item)=>{
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })
        let patients = []
        
        appointments.map((item)=>{
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({success: true, dashData})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const doctorProfile = async(req, res) =>{
    try {
        const {docId} = req;
        const doctorData = await doctorModel.findById(docId).select('-password')
        res.json({success: true, doctorData})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


const editDoctorProfile = async(req, res) =>{
    try {
        const {docId} = req;
        const {fees, address, available} = req.body;
        await doctorModel.findOneAndUpdate({_id: docId}, {fees, address, available})
        res.json({success: true, message: "Profile Updated"})
    } catch (error) {
        res.json({success: false, message: error.message})        
    }
}

export {changeDoctorAvailability, loginDoctor, appoinmentsDoctor, appointmentCancel, appointmentComplete, doctorDashboard, doctorProfile, editDoctorProfile}