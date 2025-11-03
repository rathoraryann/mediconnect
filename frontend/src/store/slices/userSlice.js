import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'userSlice',
    initialState : {
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        user: {}
    },
    reducers : {
        setToken : (state, action) =>{
            state.token = action.payload.data;
        },
        setUser : (state, action) =>{
            state.user = action.payload.data
        }
    }
})

export default userSlice.reducer
export const {setToken, setUser} = userSlice.actions