import { createSlice } from "@reduxjs/toolkit";

const userOrderSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addUserOrder: (state, action) => {
      return action.payload;
    },
    removeUserOrder: (state, action) => {
      const productId = action.payload; 
      const productExists = state.some((item) => item.id === productId); 

      if (!productExists) {
        console.warn(`Product with ID ${productId} not found.`); 
      }

      return state.filter((product) => product.id !== productId);
    },
  },
});

export const userOrderActions = userOrderSlice.actions;
export default userOrderSlice;
