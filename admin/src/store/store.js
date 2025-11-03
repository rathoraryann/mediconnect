import { configureStore } from "@reduxjs/toolkit";
import valueReducer from './slices/valueSlice'
import adminReducer from './slices/adminSlice'
import doctorReducer from './slices/doctorSlice'
import appointmentsReducer from './slices/appointmentsSlice'
import dashboardReducer from './slices/DashboardSlice'

export const store = configureStore({
    reducer:{
        value: valueReducer,
        admin: adminReducer,
        doctors: doctorReducer,
        appointment: appointmentsReducer,
        dashboard: dashboardReducer
    }
})

