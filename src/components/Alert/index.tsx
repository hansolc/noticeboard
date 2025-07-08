import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../providers/redux/store";
import { close } from "../../providers/redux/features/alertSlice";

export default function GlobalAlert() {
  const { open, message, severity } = useSelector(
    (state: RootState) => state.alert
  );
  const dispatch = useDispatch();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => dispatch(close())}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={severity}
        onClose={() => dispatch(close())}
        className="max-w-[500px] w-full"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
