import { useEffect, useRef } from "react";
import useSearchPostsQuery from "../hooks/useSearchPostsQuery";
import useInView from "@hooks/useInView";
import { useNavigate } from "react-router";
import useYScrollRestore from "@hooks/useYScrollRestore";
import { CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeletePostButton from "./DeletePostButton";

function PostList() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage } =
    useSearchPostsQuery();
  const { observe } = useInView({ actionInView: fetchNextPage });
  const navigate = useNavigate();
  useYScrollRestore();

  useEffect(() => {
    if (targetRef.current) {
      observe(targetRef.current);
    }
  }, [observe]);

  if (isError) return <Typography variant="body1">에러 발생</Typography>;
  if (data && data.posts.length === 0)
    return <Typography variant="body1">게시물이 없습니다.</Typography>;

  return (
    <>
      <Grid container spacing={4} component="section">
        {/* TODO: data.length===0 처리 */}
        {data?.posts.map((post) => {
          return (
            <Grid
              component={Card}
              key={post.id}
              size={{ mobile: 12, desktop: 3 }}
              className="cursor-pointer"
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              <CardMedia component="img" image="/images/logo.png" alt="logo" />
              <CardContent>
                <Typography gutterBottom variant="h5" className="line-clamp-1">
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                  className="line-clamp-4 h-[100px]"
                >
                  {post.body}
                </Typography>
                <div className="flex justify-between pt-4">
                  <div className="flex gap-1 items-center">
                    <AccountCircleIcon fontSize="small" />
                    <Typography variant="subtitle2">
                      by {post.userId}
                    </Typography>
                  </div>
                  <div className="flex gap-1">
                    <VisibilityIcon fontSize="small" />
                    <Typography variant="subtitle2">{post.views}</Typography>
                    <FavoriteIcon fontSize="small" />
                    <Typography variant="subtitle2">
                      {post.reactions.likes}
                    </Typography>
                  </div>
                </div>
                <DeletePostButton postId={post.id} />
              </CardContent>
            </Grid>
          );
        })}
      </Grid>
      {hasNextPage && <div ref={targetRef}></div>}
      {isFetchingNextPage && <p>게시판 목록 가져오는 중...</p>}
    </>
  );
}

export default PostList;
