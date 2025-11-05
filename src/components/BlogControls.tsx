import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import type { Category } from "../types/post";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  order: "ASC" | "DESC";
  setOrder: (v: "ASC" | "DESC") => void;
  categories: Category[];
}

export default function BlogControls({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  order,
  setOrder,
  categories,
}: Props) {
  const [localSearch, setLocalSearch] = useState(search);
  const [debouncedSearch] = useDebounce(localSearch, 1000);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Search */}
      <input
        type="text"
        placeholder="Search posts…"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="flex-1 px-3 py-2 border rounded"
      />

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3 py-2 border rounded"
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={`${sort}:${order}`}
        onChange={(e) => {
          const [newSort, newOrder] = e.target.value.split(":");
          setSort(newSort);
          setOrder(newOrder as "ASC" | "DESC");
        }}
        className="px-3 py-2 border rounded"
      >
        <option value="">Default</option>
        <option value="title:ASC">Title ↑</option>
        <option value="title:DESC">Title ↓</option>
        <option value="publication_date:ASC">Date ↑</option>
        <option value="publication_date:DESC">Date ↓</option>
      </select>
    </div>
  );
}
