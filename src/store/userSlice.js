import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, ref } from "firebase/database";
import { db } from "../FirebaseConfig";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

const INITIAL_STATE = {
  currentUser: (() => {
    try {
      // Retrieve from cookies as a fallback
      const cookieUser = Cookies.get("user");
      return cookieUser ? JSON.parse(cookieUser) : null;
    } catch (error) {
      console.error("Error parsing user from cookies:", error);
      return null;
    }
  })(),
  status: 'idle',
  error: null
};

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async ({ uid, email }) => {
    try {
      const dbRef = ref(db, `userData/${uid}`);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        toast.success("Login Successful");
        const userData = { ...snapshot.val(), uid, email };
        return userData;
      } else {
        throw new Error("No user data found.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      throw new Error(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      Cookies.remove("user"); // Remove cookie
      toast.success("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
        Cookies.set("user", JSON.stringify(action.payload), { expires: 1 }); // Cookie expires in one day
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const userActions = userSlice.actions;
export default userSlice;
