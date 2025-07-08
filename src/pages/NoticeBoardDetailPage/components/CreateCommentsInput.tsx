import { Button, TextField } from "@mui/material";
import { useState } from "react";
import useCreateComment from "../hooks/useCreateComments";
import { useAppSelector } from "../../../providers/redux/hooks";
import type { RootState } from "../../../providers/redux/store";

function CreateCommentsInput({ postId }: { postId: number }) {
  const [comment, setComment] = useState("");
  const { createComment, isPending } = useCreateComment();
  const user = useAppSelector((state: RootState) => state.user.user);

  if (!user || user.role === "guest") return null;
  return (
    <div className="flex flex-col gap-2">
      <TextField
        label="Comments"
        variant="filled"
        type="test"
        multiline
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full"
        placeholder="wrtie your comments"
      />
      <Button
        variant="contained"
        className="self-end"
        onClick={() => {
          createComment({ postId, userId: user.id, body: comment });
          setComment("");
        }}
      >
        {isPending ? "Creating..." : "Create"}
      </Button>
    </div>
  );
}

export default CreateCommentsInput;
