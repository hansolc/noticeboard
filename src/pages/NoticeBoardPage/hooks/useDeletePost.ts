import { deletePost as api } from "@actions/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../../../providers/redux/hooks";
import { show } from "../../../providers/redux/features/alertSlice";

function useDeletePost() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const {
    mutate: deletePost,
    isPending,
    error,
  } = useMutation({
    mutationFn: api,
    onSuccess: (res) => {
      dispatch(show({ message: res, severity: "success" }));
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  return {
    deletePost,
    isPending,
    error,
  };
}

export default useDeletePost;
