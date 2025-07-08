import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Role } from "../../../types/auth";

type UserState = {
  user: {
    id: number;
    email: string;
    role: Role;
  } | null;
};

const userInfo = localStorage.getItem("userInfo");

const initialState: UserState = {
  user: userInfo ? JSON.parse(userInfo) : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("userInfo");
      state.user = null;
    },
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
