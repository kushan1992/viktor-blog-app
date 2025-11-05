import { Link } from "react-router-dom";
import type { Post } from "../types/post";

interface BlogCardProps {
  post: Post;
}

function BlogCard({ post }: BlogCardProps) {
  const body = post?.body || "";
  const shortDesc = body.length > 100 ? body.slice(0, 100) + "..." : body;
  const coverImageUrl = post?.cover?.url
    ? `${import.meta.env.VITE_API_URL}${post.cover.url}`
    : "https://placehold.co/600x400";
  const authorAvatarUrl = post?.author?.avatar?.url
    ? `${import.meta.env.VITE_API_URL}${post.author.avatar.url}`
    : "https://placehold.co/600x400";

  return (
    <Link
      to={`/post/${post.id}`}
      className="inline-block text-blue-600 hover:text-blue-800 font-medium"
    >
      <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
        <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
          <img src={coverImageUrl} alt="cover-image" />
        </div>
        <div className="p-4">
          {post.blogpost_categories && post.blogpost_categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.blogpost_categories.slice(0, 3).map((category) => (
                <span
                  key={category.id ?? category.name}
                  title={category.name}
                  className="rounded-full bg-cyan-600 py-0.5 px-2.5 text-xs text-white shadow-sm"
                >
                  {category.name}
                </span>
              ))}
              {post.blogpost_categories.length > 3 && (
                <span className="text-xs text-slate-500 self-center">
                  +{post.blogpost_categories.length - 3}
                </span>
              )}
            </div>
          )}
          <h6 className="mb-2 text-slate-800 text-xl font-semibold">
            {post && post.title}
          </h6>
          <p className="text-slate-600 leading-normal font-light">
            {post && shortDesc}
          </p>
        </div>

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <img
              alt={post && post.author?.full_name}
              src={post && authorAvatarUrl}
              className="relative inline-block h-8 w-8 rounded-full"
            />
            <div className="flex flex-col ml-3 text-sm">
              <span className="text-slate-800 font-semibold">
                {post && post.author?.full_name}
              </span>
              <span className="text-slate-600">
                {post &&
                  post.author?.created_at &&
                  new Date(post.author.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
