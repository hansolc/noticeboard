import Main from "@components/Main";
import useSearchPostsQuery from "./hooks/useSearchPostsQuery";

function NoticeBoardPage() {
  const { data } = useSearchPostsQuery();
  console.log(data);
  return <Main></Main>;
}

export default NoticeBoardPage;
