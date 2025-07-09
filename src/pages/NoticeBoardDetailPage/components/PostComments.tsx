import React from "react";
import type { PostItemCommentResponseType } from "../../../schema/posts";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { useAppSelector } from "../../../providers/redux/hooks";
import type { RootState } from "../../../providers/redux/store";
import CreateCommentsInput from "./CreateCommentsInput";
import DeleteCommentButton from "./DeleteCommentButton";

interface PostCommentsProps {
  data?: PostItemCommentResponseType["comments"];
  isError: boolean;
  isLoading: boolean;
  postId: number;
}

function PostComments({ data, isError, postId }: PostCommentsProps) {
  const comments = useAppSelector((state: RootState) => state.comments);
  if (isError) return <Typography variant="body1">Error Occured</Typography>;
  if (!data || data.length === 0)
    return <Typography className="pt-4">There is no comments</Typography>;

  return (
    <div className="pt-5">
      <Typography variant="h5">Comments</Typography>
      <List>
        {comments[postId] &&
          comments[postId].map((comment) => {
            return (
              <ListItem
                key={`post_comment_${comment.id}`}
                className="flex max-xl:flex-col"
              >
                <ListItemAvatar>
                  <Avatar alt={comment.user.fullName ?? "Unknown User"} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${comment.user.fullName ?? "Unknown User"} - ${
                    comment.user.username
                  }`}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2">
                        {comment.body}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <DeleteCommentButton comment={comment} />
              </ListItem>
            );
          })}
      </List>
      <CreateCommentsInput postId={postId} />
    </div>
  );
}

export default PostComments;
