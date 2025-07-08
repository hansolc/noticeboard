import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthModalState {
  open: boolean;
  type: "login" | "register";
}

const initialState: AuthModalState = {
  open: false,
  type: "login",
};

export const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<AuthModalState["type"]>) => {
      state.open = true;
      state.type = action.payload;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

export const { open, close } = authModalSlice.actions;
export default authModalSlice.reducer;
