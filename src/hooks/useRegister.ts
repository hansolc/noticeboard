import { register as registerApi } from "@actions/auth";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../providers/redux/hooks";
import { show } from "../providers/redux/features/alertSlice";
import { close } from "../providers/redux/features/authModalSlice";

function useRegister() {
  const dispatch = useAppDispatch();

  const {
    mutate: register,
    isPending,
    error,
  } = useMutation({
    mutationFn: registerApi,
    onSuccess: (res) => {
      dispatch(show({ message: "Registration Success", severity: "success" }));
      dispatch(close());
    },
  });
  return { register, isPending, error };
}

export default useRegister;
