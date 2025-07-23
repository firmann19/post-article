import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import PostTable from "../components/PostTable";
import { fetchPosts } from "../redux/postsAPI";

const TABS = ["publish", "draft", "thrash"] as const;

export default function AllPosts() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("publish");
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = posts.filter((post) => post.status === activeTab);

  return (
    <div className="p-6">
      <div className="mb-4 flex gap-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded capitalize ${
              tab === activeTab ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? <p>Loading...</p> : <PostTable posts={filteredPosts} />}
    </div>
  );
}
