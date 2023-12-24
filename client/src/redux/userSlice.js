import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    clearUserData: (state) => {
      state.data = null;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export const selectUserData = (state) => state.user.data;

export default userSlice.reducer;
