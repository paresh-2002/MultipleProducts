import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  shoppingCart: [],
  userOrderList:[],
  totalPrice: 0,
  totalQty: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToOrder: (state, action) => {
      const { id, item } = action.payload;
      const existingItem = state.shoppingCart.find(
        (cartItem) => cartItem.id === id
      );

      if (existingItem) {
        toast.info("This Product is Already in your Cart");
      } else {
        const newItem = {
          ...item,
          qty: 1,
          TotalProductPrice: item.productPrice * 1,
        };
        state.shoppingCart.push(newItem);
        state.totalPrice += newItem.TotalProductPrice;
        state.totalQty += 1;
        toast.success("Product added successfully!");
      }
    },

    removeFromOrder: (state, action) => {
      const { id } = action.payload;
      const itemIndex = state.shoppingCart.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        const item = state.shoppingCart[itemIndex];
        state.shoppingCart.splice(itemIndex, 1);
        state.totalPrice -= item.TotalProductPrice;
        state.totalQty -= item.qty;
        toast.success("Product removed successfully!");
      } else {
        toast.error("Item not found in order.");
      }
    },

    increment: (state, action) => {
      const { id } = action.payload;
      const itemIndex = state.shoppingCart.findIndex(
        (cartItem) => cartItem.id === id
      );

      if (itemIndex !== -1) {
        const item = state.shoppingCart[itemIndex];
        state.shoppingCart[itemIndex] = {
          ...item,
          qty: item.qty + 1,
          TotalProductPrice: item.productPrice * (item.qty + 1),
        };
        state.totalPrice += item.productPrice;
        state.totalQty += 1;
        toast.success("Quantity increased successfully!");
      } else {
        toast.error("Item not found in order.");
      }
    },

    decrement: (state, action) => {
      const { id } = action.payload;
      const itemIndex = state.shoppingCart.findIndex(
        (cartItem) => cartItem.id === id
      );

      if (itemIndex !== -1) {
        const item = state.shoppingCart[itemIndex];
        if (item.qty > 1) {
          state.shoppingCart[itemIndex] = {
            ...item,
            qty: item.qty - 1,
            TotalProductPrice: item.productPrice * (item.qty - 1),
          };
          state.totalPrice -= item.productPrice;
          state.totalQty -= 1;
          toast.success("Quantity decreased successfully!");
        } else {
          toast.info("Minimum quantity reached.");
        }
      } else {
        toast.error("Item not found in order.");
      }
    },
  },
});

export const OrderActions = orderSlice.actions;
export default orderSlice;
