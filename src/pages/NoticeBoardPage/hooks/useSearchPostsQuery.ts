import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../../../actions/posts";
import { useSearchParams } from "react-router";

const POSTS_PER_PAGE = 10;

function useSearchPostsQuery() {
  const [searchParams] = useSearchParams();
  return useInfiniteQuery({
    queryKey: [
      "posts",
      { ...(searchParams.get("q") ? { terms: searchParams.get("q") } : {}) },
    ],
    queryFn: ({ pageParam }) =>
      getPosts({
        term: searchParams.get("q") ?? "",
        skip: pageParam,
        limit: POSTS_PER_PAGE,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < POSTS_PER_PAGE) return undefined;
      return allPages.length * POSTS_PER_PAGE;
    },
    initialPageParam: 0,
  });
}

export default useSearchPostsQuery;
