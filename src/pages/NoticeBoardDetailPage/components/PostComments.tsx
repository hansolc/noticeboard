import React from "react";
import type { PostItemCommentResponseType } from "../../../schema/posts";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

interface PostCommentsProps {
  data?: PostItemCommentResponseType["comments"];
  isError: boolean;
  isLoading: boolean;
}

function PostComments({ data, isError }: PostCommentsProps) {
  if (isError) return <Typography variant="body1">에러 발생</Typography>;
  if (!data || data.length === 0)
    return <Typography>댓글이 없습니다.</Typography>;
  console.log(data);
  return (
    <div className="pt-5">
      <Typography variant="h5">Comments</Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {data.map((comment) => {
          return (
            <ListItem
              alignItems="flex-start"
              key={`post_comment_${comment.id}`}
            >
              <ListItemAvatar>
                <Avatar alt={comment.user.fullName} />
              </ListItemAvatar>
              <ListItemText
                primary={`${comment.user.fullName} - ${comment.user.username}`}
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2">
                      {comment.body}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default PostComments;
