import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AlertStates {
  message: string;
  open: boolean;
  severity: "error" | "success";
}

const initialState: AlertStates = {
  message: "",
  open: false,
  severity: "success",
};

export const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    show: (state, action: PayloadAction<Omit<AlertStates, "open">>) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

export const { show, close } = alertSlice.actions;
export default alertSlice.reducer;
