import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../../../actions/posts";
import { useSearchParams } from "react-router";
import { useMemo } from "react";

const POSTS_PER_PAGE = 12;

function useSearchPostsQuery() {
  const [searchParams] = useSearchParams();
  const {
    data,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
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
      const { posts } = lastPage;
      if (posts.length < POSTS_PER_PAGE) return undefined;
      return allPages.length * POSTS_PER_PAGE;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });

  const formattedData = useMemo(() => {
    if (!data) return undefined;

    const posts = data.pages.flatMap((page) => page.posts);
    const total = data.pages[0]?.total ?? 0;

    return { posts, total };
  }, [data]);

  return {
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data: formattedData,
    refetch,
  };
}

export default useSearchPostsQuery;
