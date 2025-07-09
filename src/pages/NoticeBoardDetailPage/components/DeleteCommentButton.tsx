import { Button } from "@mui/material";
import { useAppSelector } from "../../../providers/redux/hooks";
import type { RootState } from "../../../providers/redux/store";
import useDeleteComment from "../hooks/useDeleteComments";
import type { CommentState } from "../../../providers/redux/features/commentsSlice";

function DeleteCommentButton({ comment }: { comment: CommentState }) {
  const user = useAppSelector((state: RootState) => state.user.user);
  const { deleteComment } = useDeleteComment();
  if (!user || user.role !== "admin") return null;
  return (
    <Button
      className="bg-red-500! text-white!"
      onClick={() => deleteComment({ comment })}
    >
      Delete
    </Button>
  );
}

export default DeleteCommentButton;
