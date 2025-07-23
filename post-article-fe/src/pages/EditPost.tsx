import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/article/${id}`).then((res) => {
      const { title, content, category } = res.data;
      setForm({ title, content, category });
    });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (status: "publish" | "draft") => {
    try {
      await axios.patch(`${BASE_URL}/article/${id}`, { ...form, status });
      navigate("/");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <input
        type="text"
        name="title"
        className="w-full border p-2"
        value={form.title}
        onChange={handleChange}
      />
      <textarea
        name="content"
        className="w-full border p-2 h-40"
        value={form.content}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        className="w-full border p-2"
        value={form.category}
        onChange={handleChange}
      />

      <div className="flex gap-3">
        <button
          onClick={() => handleSubmit("publish")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Publish
        </button>
        <button
          onClick={() => handleSubmit("draft")}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Save as Draft
        </button>
      </div>
    </div>
  );
}
