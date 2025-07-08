import Main from "@components/Main";
import { useParams } from "react-router";
import usePost from "./hooks/usePost";
import PostDetail from "./components/PostDetail";
import usePostsComments from "./hooks/usePostComments";
import PostComments from "./components/PostComments";

function NoticeBoardDetailPage() {
  const { id } = useParams();
  const queryPostData = usePost({ id: Number(id) });
  const queryCommentsData = usePostsComments({ id: Number(id) });

  return (
    <Main>
      <PostDetail {...queryPostData} />
      <PostComments {...queryCommentsData} />
    </Main>
  );
}

export default NoticeBoardDetailPage;
