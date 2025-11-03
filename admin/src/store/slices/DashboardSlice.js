import {createSlice} from '@reduxjs/toolkit'

const dashboardSlice = createSlice({
    name : "DashboardSlice",
    initialState: null,
    reducers: {
        setDashboard : (state, action)=>{
            return action.payload.data
        }
    }
})

export default dashboardSlice.reducer
export const {setDashboard} = dashboardSlice.actions