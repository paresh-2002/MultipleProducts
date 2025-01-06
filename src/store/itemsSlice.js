import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    // Action to add initial items to the state
    addInitialItems: (state, action) => {
      return action.payload;  // Replaces state with the fetched list of products
    },

    removeProduct: (state, action) => {
      const productId = action.payload; 
      const productExists = state.some((item) => item.id === productId); 

      if (!productExists) {
        console.warn(`Product with ID ${productId} not found.`); 
      }

      // Filter out the product with the matching ID
      return state.filter((product) => product.id !== productId);
    },
  },
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice;
