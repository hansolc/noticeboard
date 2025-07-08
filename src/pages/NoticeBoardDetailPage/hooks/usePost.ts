import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../../../actions/posts";

function usePost({ id }: { id: number }) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById({ id }),
  });

  return {
    data,
    isError,
    isLoading,
  };
}

export default usePost;
