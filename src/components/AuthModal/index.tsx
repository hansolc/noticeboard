import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../providers/redux/hooks";
import type { RootState } from "../../providers/redux/store";
import { close } from "../../providers/redux/features/authModalSlice";
import AuthForm from "./AuthForm";
import { useState } from "react";
import RoleTabs from "./RoleTabs";
import type { AuthFormTypes, Role } from "../../types/auth";

function AuthModal() {
  const { open, type } = useAppSelector((state: RootState) => state.authModal);
  const dispatch = useAppDispatch();
  const [role, setRole] = useState<Role>("user");

  const onSubmit = (data: AuthFormTypes) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onClose={() => dispatch(close())}>
      <DialogTitle>{type === "login" ? "Login" : "Registration"}</DialogTitle>
      <DialogContent>
        <RoleTabs role={role} setRole={setRole} />
        <AuthForm mode={type} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
