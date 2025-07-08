import { getPostById } from "@actions/posts";
import { useQuery } from "@tanstack/react-query";

function usePost({ id }: { id: number }) {
  const { data, isError, isLoading, error } = useQuery({
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
