import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../providers/redux/hooks";
import type { RootState } from "../../providers/redux/store";
import { close } from "../../providers/redux/features/authModalSlice";
import AuthForm from "./AuthForm";
import { useState } from "react";
import RoleTabs from "./RoleTabs";
import type { AuthFormTypes, Role } from "../../types/auth";
import useRegister from "@hooks/useRegister";
import useLogin from "@hooks/useLogin";

function AuthModal() {
  const { open, type } = useAppSelector((state: RootState) => state.authModal);
  const dispatch = useAppDispatch();
  const [role, setRole] = useState<Role>("user");
  const {
    register,
    // isPending: registerPending,
    // error: registerError,
  } = useRegister();
  const { login } = useLogin();

  const onSubmit = (data: AuthFormTypes) => {
    if (type === "register") {
      register({ ...data, role });
    } else {
      login({ ...data, role });
    }
  };

  return (
    <Dialog open={open} onClose={() => dispatch(close())}>
      <DialogTitle>{type === "login" ? "Login" : "Registration"}</DialogTitle>
      <DialogContent>
        {type === "register" && <RoleTabs role={role} setRole={setRole} />}
        <AuthForm mode={type} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
