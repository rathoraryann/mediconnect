import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "adminSlice",
    initialState: {
        token : localStorage.getItem('token') ? localStorage.getItem('token') : '',
    },
    reducers:{
        setToken: (state, action)=>{
            state.token = action.payload.data;
        }
    }
})

export default adminSlice.reducer;
export const {setToken} = adminSlice.actions