import { useParams } from "react-router";
import usePost from "./hooks/usePost";
import PostDetail from "./components/PostDetail";
import usePostsComments from "./hooks/usePostComments";
import PostComments from "./components/PostComments";
import { useEffect } from "react";
import { useAppDispatch } from "../../providers/redux/hooks";
import { setComments } from "../../providers/redux/features/commentsSlice";

function NoticeBoardDetailPage() {
  const { id } = useParams();
  const queryPostData = usePost({ id: Number(id) });
  const queryCommentsData = usePostsComments({ id: Number(id) });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (queryCommentsData.data) {
      dispatch(setComments(queryCommentsData.data));
    }
  }, [queryCommentsData.data, dispatch]);

  return (
    <main>
      <PostDetail {...queryPostData} />
      <PostComments {...queryCommentsData} postId={Number(id)} />
    </main>
  );
}

export default NoticeBoardDetailPage;
