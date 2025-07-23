import { Routes, Route } from "react-router-dom";
import AllPosts from "./pages/AllPosts";
import AddNew from "./pages/AddNew";
import EditPost from "./pages/EditPost";
import Preview from "./pages/Preview";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AllPosts />} />
      <Route path="/add" element={<AddNew />} />
      <Route path="/edit/:id" element={<EditPost />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  );
}
