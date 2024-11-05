import { createSlice } from "@reduxjs/toolkit";

const userOrderSlice = createSlice({
    name: 'items',
    initialState:[],
    reducers:{
        addUserOrder:(state, action)=>{
            return action.payload 
        },
        removeUserOrder:(state, action)=>{
            console.log(action.payload);
            state.filter((itemId) => itemId !== action.payload);
        }
    }
})

export const userOrderActions = userOrderSlice.actions
export default userOrderSlice
