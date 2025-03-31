import { createSlice } from "@reduxjs/toolkit";

const candidateSlice = createSlice({
    name:"candidate",
    initialState:{
        candidateProfile: null,
        isAuthenticated: false
    },
    reducers:{
        getCandidateProfile: (state, action)=>{
            state.candidateProfile = action.payload
        },
        setAuthentication: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    }
})

export const {getCandidateProfile,setAuthentication} = candidateSlice.actions;

export default candidateSlice.reducer;