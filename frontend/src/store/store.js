import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from "./slices/DoctorSlice"
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer:{
        user : userReducer,
        doctors: doctorReducer,
    }
})

