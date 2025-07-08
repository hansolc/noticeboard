import Main from "@components/Main";
import useSearchPostsQuery from "./hooks/useSearchPostsQuery";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useInView from "@hooks/useInView";
import { useEffect, useRef } from "react";

function NoticeBoardPage() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage } =
    useSearchPostsQuery();
  const { observe } = useInView({ actionInView: fetchNextPage });
  console.log(data);

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
      <Typography variant="h2">Notice Board</Typography>
      <Grid container spacing={4}>
        {data?.posts.map((post) => {
          return (
            <Grid
              component={Card}
              key={post.id}
              size={{ mobile: 12, desktop: 3 }}
              className="cursor-pointer"
            >
              <CardMedia component="img" image="/images/logo.png" alt="logo" />
              <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {post.body}
                </Typography>
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
