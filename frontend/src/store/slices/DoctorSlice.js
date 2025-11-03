import { createSlice } from "@reduxjs/toolkit";

const DoctorSlice = createSlice({
    name: "doctors",
    initialState: {
        doctors : []
    },
    reducers:{
        setDoctors : (state, action) =>{
            state.doctors = action.payload.data
        }
    }
})

export const {setDoctors} = DoctorSlice.actions
export default DoctorSlice.reducer;
