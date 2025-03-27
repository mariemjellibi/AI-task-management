import {createSlice} from "@reduxjs/toolkit";
import { user } from "../../assets/data";
const initialState = {
    user:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null,
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        //here we gonna define the actions 
        //note:payload represent les données que tu envoies ou tu reçois dans une action
        setCredentials:(state,action)=>{
            state.user=action.payload;
            localStorage.setItem("userInfo",JSON.stringify(action.payload))
        },
        lgout:(state,action)=>{
            state.user=null;
            localStorage.removeItem("userInfo")
        },

    },
});
export const {setCredentials,lgout} = authSlice.actions;
export default authSlice.reducer;
