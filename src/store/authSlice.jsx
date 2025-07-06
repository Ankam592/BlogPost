import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status : false,
    userData : null
}

const authSlice = createSlice({                        // it will store login status and change status accordingly using reducers(login.logout) whenever a user does.
    name : "auth",
    initialState,
    reducers : {
        login_user : (state,action) => {
             state.status = true
             state.userData = action.payload;
        },
        logout : (state,action) =>
        {
            state.status = false,
            state.userData = null
        }
    }
})


export const {login_user,logout} = authSlice.actions;

export default authSlice.reducer;