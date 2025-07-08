import { login as loginApi } from "@actions/auth";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../providers/redux/hooks";
import { show } from "../providers/redux/features/alertSlice";
import { close } from "../providers/redux/features/authModalSlice";
import { setUser } from "../providers/redux/features/userSlice";
import type { Role } from "../types/auth";

function useLogin() {
  const dispatch = useAppDispatch();
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      localStorage.setItem("userInfo", JSON.stringify(res.user));
      dispatch(
        setUser({
          user: {
            role: res.user.role as Role,
            email: res.user.email,
            id: res.user.id,
          },
        })
      );
      dispatch(show({ message: "Login Success", severity: "success" }));
      dispatch(close());
    },
  });

  return {
    login,
    isPending,
    error,
  };
}

export default useLogin;
