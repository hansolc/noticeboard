import { useQuery } from "@tanstack/react-query";
import { getPostComment } from "../../../actions/posts";

function usePostsComments({ id }: { id: number }) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getPostComment({ id }),
  });

  return {
    data,
    isError,
    isLoading,
  };
}

export default usePostsComments;
