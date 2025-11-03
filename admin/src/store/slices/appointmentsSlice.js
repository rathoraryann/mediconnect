import { createSlice } from "@reduxjs/toolkit";

const AppointmentSlice = createSlice({
    name: "appointmentSlice",
    initialState: {
        appointments: [],
    },
    reducers:{
        setAppointments: (state, action)=>{
            state.appointments = action.payload.data;
        }
    }
})

export default AppointmentSlice.reducer;
export const {setAppointments} = AppointmentSlice.actions