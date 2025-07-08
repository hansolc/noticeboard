import { Button } from "@mui/material";
import { useAppSelector } from "../../../providers/redux/hooks";
import type { RootState } from "../../../providers/redux/store";
import useDeletePost from "../hooks/useDeletePost";
import type { MouseEvent } from "react";

function DeletePostButton({ postId }: { postId: number }) {
  const user = useAppSelector((state: RootState) => state.user.user);
  const { deletePost, isPending } = useDeletePost();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deletePost({ postId });
  };

  if (!user || user.role !== "admin") return null;
  return (
    <Button
      variant="contained"
      className="bg-red-500! mt-4! ml-auto! w-full"
      onClick={handleClick}
    >
      {isPending ? "Deleteing..." : "Delete"}
    </Button>
  );
}

export default DeletePostButton;
