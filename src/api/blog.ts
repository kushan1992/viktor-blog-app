import axios from "axios";
import type { Post } from "../types/post";

export interface PostsResponse {
  data: Post[];
  total: number;
}

export interface FetchPostsParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export const fetchPosts = async ({
  queryKey,
}: {
  queryKey: [
    string,
    number,
    number,
    string | undefined,
    string | undefined,
    string | undefined
  ];
}): Promise<PostsResponse> => {
  const [, page, limit, search, category, sort] = queryKey;

  const params = new URLSearchParams({
    _start: ((page - 1) * limit).toString(),
    _limit: limit.toString(),
  });

  if (search) params.append("title_contains", search);
  if (category) params.append("blogpost_categories.id", category);

  if (sort) {
    params.append("_sort", sort);
  }

  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/blogposts/?${params.toString()}`
  );

  return {
    data: res.data,
    total: parseInt(res.headers["x-total-count"] ?? "0", 10),
  };
};
