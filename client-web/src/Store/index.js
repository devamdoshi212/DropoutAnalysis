import { configureStore } from "@reduxjs/toolkit";
import UserData from "./UserData";

const store = configureStore({
  reducer: {
    user: UserData,
  },
});

export default store;
