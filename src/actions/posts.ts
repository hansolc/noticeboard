import {
  postsResponseSchema,
  type PostListResponoseType,
} from "../schema/posts";

const DUMMY_POSTS_API_URL = "https://dummyjson.com/posts";

export async function getPosts({
  term,
  skip,
  limit,
}: {
  term?: string;
  skip?: number;
  limit?: number;
}): Promise<PostListResponoseType> {
  try {
    const url = new URL(
      term ? `${DUMMY_POSTS_API_URL}/search` : DUMMY_POSTS_API_URL
    );

    if (term) {
      url.searchParams.set("q", term);
    } else {
      url.searchParams.set("skip", String(skip));
      url.searchParams.set("limit", String(limit));
    }
    const res = await fetch(url.toString());
    const jsonData = await res.json();

    const { success, data } = postsResponseSchema.safeParse(jsonData);

    if (!res.ok) {
      throw new Error("server error");
    } else if (!success) {
      throw new Error("데이터 형식이 올바르지 않습니다.");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
}
