import { createSlice } from "@reduxjs/toolkit";

const valueSlice = createSlice({
    name: "valueSlice",
    initialState: {
        backendUrl : import.meta.env.VITE_BACKEND_URL,
        dToken: localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '',
        appointmentsForDoctor: [],
        doctorDashboard: false,
        doctorProfileData: null
    },
    reducers:{
        setDoctorToken : (state, action)=>{
            state.dToken = action.payload.data
        },
        setAppointmentsForDoctor: (state, action)=>{
            state.appointmentsForDoctor = action.payload.data
        },
        setDoctorDashboard : (state, action) =>{
            state.doctorDashboard = action.payload.data;
        },
        setDoctorProfileData : (state, action)=>{
            state.doctorProfileData = action.payload.data
        }
    }
})

export const{setDoctorToken, setAppointmentsForDoctor, setDoctorDashboard, setDoctorProfileData} = valueSlice.actions

export default valueSlice.reducer;
















// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk for canceling an appointment
// export const cancelAppointment = createAsyncThunk(
//   "doctor/cancelAppointment",
//   async (appointmentId, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`/api/appointments/${appointmentId}/cancel`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// Async thunk for completing an appointment
// export const completeAppointment = createAsyncThunk(
//   "doctor/completeAppointment",
//   async (appointmentId, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`/api/appointments/${appointmentId}/complete`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const doctorSlice = createSlice({
//   name: "doctor",
//   initialState: {
//     appointments: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setAppointments: (state, action) => {
//       state.appointments = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(cancelAppointment.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(cancelAppointment.fulfilled, (state, action) => {
//         state.loading = false;
//         const updated = action.payload;
//         state.appointments = state.appointments.map((a) =>
//           a._id === updated._id ? updated : a
//         );
//       })
//       .addCase(cancelAppointment.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(completeAppointment.fulfilled, (state, action) => {
//         const updated = action.payload;
//         state.appointments = state.appointments.map((a) =>
//           a._id === updated._id ? updated : a
//         );
//       });
//   },
// });

// export const { setAppointments } = doctorSlice.actions;
// export default doctorSlice.reducer;
