import { AppBar, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { open } from "../../providers/redux/features/authModalSlice";

function GlobalNavigation() {
  const dispatch = useDispatch();
  return (
    <>
      <AppBar component="header">
        <div className="w-full mx-auto max-w-[500px] xl:max-w-[1280px] flex justify-between items-center px-4 py-2">
          <Typography variant="h6">Notice Board</Typography>
          <Button color="inherit" onClick={() => dispatch(open("login"))}>
            Login
          </Button>
        </div>
      </AppBar>
    </>
  );
}

export default GlobalNavigation;
