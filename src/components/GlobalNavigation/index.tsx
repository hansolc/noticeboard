import { AppBar, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { open } from "../../providers/redux/features/authModalSlice";
import { useAppSelector } from "../../providers/redux/hooks";
import type { RootState } from "../../providers/redux/store";
import { logout } from "../../providers/redux/features/userSlice";

function GlobalNavigation() {
  const dispatch = useDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);

  return (
    <>
      <AppBar component="header">
        <div className="w-full mx-auto max-w-[500px] xl:max-w-[1280px] flex justify-between items-center px-4 py-2">
          <Typography variant="h6">Notice Board</Typography>
          {user && (
            <div className="flex items-center gap-4">
              <Typography>{`Welcome ${user.role} ${user.email}`}</Typography>
              <Button color="inherit" onClick={() => dispatch(logout())}>
                Logout
              </Button>
            </div>
          )}
          {!user && (
            <div>
              <Button color="inherit" onClick={() => dispatch(open("login"))}>
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => dispatch(open("register"))}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </AppBar>
    </>
  );
}

export default GlobalNavigation;
