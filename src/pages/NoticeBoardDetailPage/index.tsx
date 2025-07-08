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
    <main>
      <PostDetail {...queryPostData} />
      <PostComments {...queryCommentsData} />
    </main>
  );
}

export default NoticeBoardDetailPage;
