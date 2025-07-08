import React from "react";
import type { PostResponseType } from "../../../schema/posts";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Chip from "@mui/material/Chip";

interface PostDetailProps {
  data?: PostResponseType;
  isError: boolean;
  isLoading: boolean;
}

function PostDetail({ data, isError, isLoading }: PostDetailProps) {
  if (isLoading || !data)
    return <Typography variant="body1">가져오는 중...</Typography>;
  if (isError) return <Typography variant="body1">에러 발생</Typography>;
  return (
    <section className="flex flex-col gap-4">
      <Typography variant="h2">{data.title}</Typography>
      <div className="flex gap-1 items-center">
        <AccountCircleIcon fontSize="small" />
        <Typography variant="subtitle2">by {data.userId}</Typography>
      </div>
      <div className="flex gap-2">
        {data.tags.map((tag) => (
          <Chip key={`post_${data.id}_${tag}`} label={tag} />
        ))}
      </div>
      <Typography variant="body1">{data.body}</Typography>
    </section>
  );
}

export default PostDetail;
