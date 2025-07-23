import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { updatePostStatus } from "../redux/postsAPI";

interface Post {
  id: number;
  title: string;
  category: string;
  status: string;
}

interface PostTableProps {
  posts: Post[];
}

export default function PostTable({ posts }: PostTableProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const moveToTrash = (id: number) => {
    dispatch(updatePostStatus({ id, data: { status: "thrash" } }));
  };

  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Title</th>
          <th className="p-2 border">Category</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td className="p-2 text-center border">{post.title}</td>
            <td className="p-2 text-center border">{post.category}</td>
            <td className="p-2 justify-center flex gap-3">
              <FaEdit
                onClick={() => navigate(`/edit/${post.id}`)}
                className="cursor-pointer text-blue-500"
              />
              <FaTrash
                onClick={() => moveToTrash(post.id)}
                className="cursor-pointer text-red-500"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
