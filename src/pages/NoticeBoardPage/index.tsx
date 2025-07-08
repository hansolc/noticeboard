import Main from "@components/Main";
import useSearchPostsQuery from "./hooks/useSearchPostsQuery";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useInView from "@hooks/useInView";
import { useEffect, useRef } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchPostField from "./components/SearchPostField";
import { useNavigate } from "react-router";
import useYScrollRestore from "@hooks/useYScrollRestore";

function NoticeBoardPage() {
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

  if (isError) {
    return "error!";
  }

  return (
    <Main>
      <div className="flex justify-between max-xl:flex-col max-xl: pb-10">
        <Typography variant="h2">Notice Board</Typography>
        <SearchPostField />
      </div>
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
              </CardContent>
            </Grid>
          );
        })}
      </Grid>
      {hasNextPage && <div ref={targetRef}></div>}
      {isFetchingNextPage && <p>게시판 목록 가져오는 중...</p>}
    </Main>
  );
}

export default NoticeBoardPage;
