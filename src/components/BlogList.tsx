import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import BlogControls from "./BlogControls";
import { fetchPosts } from "../api/blog";
import type { Category, Post } from "../types/post";

const POSTS_PER_PAGE = 10;

async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/blogpost-categories`
  );
  const data = await res.json();
  return data.map((category: Category) => category);
}

function BlogList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort, order]);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: [
      "posts",
      currentPage,
      POSTS_PER_PAGE,
      search || undefined,
      category || undefined,
      sort ? `${sort}:${order}` : undefined,
    ] as const,
    queryFn: fetchPosts,
    keepPreviousData: true,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    staleTime: Infinity,
  });

  if (isLoading && !data)
    return <div className="text-center py-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 py-8">Error loading posts</div>
    );

  const posts = data?.data ?? [];
  const totalPosts = data?.total ?? 0;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <>
      <BlogControls
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        categories={categories}
      />

      {isFetching && !isLoading && (
        <div className="text-center py-2 text-sm text-gray-500">Updating…</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts &&
          posts.map((post: Post) => <BlogCard key={post.id} post={post} />)}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default BlogList;
