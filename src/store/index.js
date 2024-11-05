import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import fetchStatusSlice from "./fetchStatusSlice";
import orderSlice from "./orderSlice";
import userSlice from "./userSlice";
import userOrderSlice from "./userOrderSlice";

const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
    userOrder: userOrderSlice.reducer
  },
});


export default store;
