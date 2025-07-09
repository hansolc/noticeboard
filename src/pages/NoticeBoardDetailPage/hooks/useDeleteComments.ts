import { deleteComment as api } from "@actions/comments";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../../providers/redux/hooks";
import { deleteComment as deleteAction } from "../../../providers/redux/features/commentsSlice";

function useDeleteComment() {
  const dispatch = useAppDispatch();
  const {
    mutate: deleteComment,
    isPending,
    error,
  } = useMutation({
    mutationFn: api,
    onSuccess: (res) => {
      if (res) {
        dispatch(
          deleteAction({ postId: res.comment.postId, id: res.comment.id })
        );
      }
    },
  });

  return {
    deleteComment,
    isPending,
    error,
  };
}

export default useDeleteComment;
