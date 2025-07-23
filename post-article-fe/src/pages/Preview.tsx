import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  createdDate: string;
  updatedDate: string;
  status: "publish" | "draft" | "thrash";
}

export default function Preview() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);

  const fetchPublished = async () => {
    const res = await axios.get(`${BASE_URL}/article/5/${page * 5}`);
    const filtered = res.data.filter((p: Post) => p.status === "publish");
    setPosts(filtered);
  };

  useEffect(() => {
    fetchPublished();
  }, [page]);

  return (
    <div className="p-6">
      {posts.map((post) => (
        <div key={post.id} className="mb-6 border-b pb-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-500 text-sm mb-2">{post.category}</p>
          <p>{post.content.substring(0, 200)}...</p>
        </div>
      ))}
      <div className="flex justify-center gap-3 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
