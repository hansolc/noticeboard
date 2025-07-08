import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../providers/redux/store";
import { close } from "../../providers/redux/features/authModalSlice";

interface UserInfoTypes {
  username: string;
  password: string;
}

interface UserRegistrationTypes extends UserInfoTypes {
  passwordCheck: string;
}

function AuthModal() {
  const { open, type } = useSelector((state: RootState) => state.authModal);
  const dispatch = useDispatch();
  const isLogin = type === "login";

  const [userInfo, setUserInfo] = useState<
    UserInfoTypes | UserRegistrationTypes
  >(
    isLogin
      ? { username: "", password: "" }
      : { username: "", password: "", passwordCheck: "" }
  );

  useEffect(() => {
    setUserInfo(
      isLogin
        ? { username: "", password: "" }
        : { username: "", password: "", passwordCheck: "" }
    );
  }, [isLogin]);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserInfo((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = () => {
    if (isLogin) {
      // 로그인 처리
      console.log("로그인", userInfo);
    } else {
      // 회원가입 처리
      console.log("회원가입", userInfo);
    }
    // onClose(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(close())}
      // PaperProps deprecated but maxWidth, fullWidth not working properly
      //   maxWidth="sm"
      //   fullWidth
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "500px",
        },
      }}
    >
      <form>
        <DialogTitle>{isLogin ? "Login" : "Registration"}</DialogTitle>
        <DialogContent className="flex flex-col gap-4">
          <TextField
            autoFocus
            label="username"
            type="text"
            variant="outlined"
            margin="dense"
            fullWidth
            value={userInfo.username}
            onChange={handleChange("username")}
          />
          <TextField
            label="password"
            type="password"
            variant="outlined"
            fullWidth
            value={userInfo.password}
            onChange={handleChange("password")}
          />
          {!isLogin && (
            <TextField
              margin="dense"
              label="password check"
              type="password"
              variant="outlined"
              value={(userInfo as UserRegistrationTypes).passwordCheck}
              onChange={handleChange("passwordCheck")}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" className="w-full">
            {isLogin ? "로그인" : "회원가입"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AuthModal;
