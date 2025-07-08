import { createComment as api } from "@actions/comments";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../../../providers/redux/hooks";
import { setComments } from "../../../providers/redux/features/commentsSlice";
import type { RootState } from "../../../providers/redux/store";

function useCreateComment() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const {
    mutate: createComment,
    isPending,
    error,
  } = useMutation({
    mutationFn: api,
    onSuccess: (res) => {
      if (user) {
        dispatch(
          setComments([{ ...res, user: { id: user.id, username: user.email } }])
        );
      }
    },
  });

  return {
    createComment,
    isPending,
    error,
  };
}

export default useCreateComment;
