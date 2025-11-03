import { createSlice } from "@reduxjs/toolkit";


const doctorSlice = createSlice({
  name: "doctorSlice",
  initialState: {
    doctors: []
  },
  reducers: {
    setDoctors : (state, action) =>{
      state.doctors = action.payload.data
    },
    setDoctorAvailability: (state, action) =>{
      const docId = action.payload.docId
      const doctor = state.doctors.find(doctor => doctor._id == docId)
      if (doctor) doctor.available = !doctor.available
    }
  }
});

export default doctorSlice.reducer;

export const {setDoctors, setDoctorAvailability} = doctorSlice.actions
