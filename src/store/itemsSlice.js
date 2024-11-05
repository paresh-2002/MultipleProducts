import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addInitialItems: (state, action) => {
      return action.payload;
    },
    removeProduct: (state, action) => {
      console.log(action.payload);
      state.filter((itemId) => itemId !== action.payload);
    },
  },
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice;
