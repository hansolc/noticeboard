import { createPost as api } from "@actions/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../../../providers/redux/hooks";
import { show } from "../../../providers/redux/features/alertSlice";
import { useNavigate } from "react-router";

function useCreatePost() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: createPost,
    isPending,
    error,
  } = useMutation({
    mutationFn: api,
    onSuccess: (res) => {
      navigate("/posts");
      dispatch(show({ message: res, severity: "success" }));
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  return {
    createPost,
    isPending,
    error,
  };
}

export default useCreatePost;
