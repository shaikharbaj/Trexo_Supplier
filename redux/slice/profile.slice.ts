import { createSlice } from "@reduxjs/toolkit";
import { fetchProfileThunk } from "../thunk/profile.thunk";

const initialState = {
  isProfileLoading: true,
  profile: {
    id:undefined,
    uuid: undefined,
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    mobile_number: undefined,
    user_type: undefined
  },
};

export const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action?.payload;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchProfileThunk.pending, (state: any) => {
        state.isProfileLoading = true;
      })
      .addCase(fetchProfileThunk.fulfilled, (state: any, action: any) => {
        state.profile = action?.payload?.data;
        state.isProfileLoading = false;
      })
      .addCase(fetchProfileThunk.rejected, (state: any) => {
        state.isProfileLoading = false;
      });
  },
});

export const { setProfile } = profile.actions;

export default profile.reducer;
