import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  user: [{}],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialValues,
  reducers: {
    getuserdata(state, action) {
      state.user = action.payload;
    },
  },
});
export const UserActions = userSlice.actions;
export default userSlice.reducer;
