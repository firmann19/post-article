import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

type Post = {
  id: number;
  title: string;
  content: string;
  category: string;
  status: "publish" | "draft" | "thrash";
};

interface PostState {
  posts: Post[];
  loading: boolean;
}

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const res = await axios.get(`${BASE_URL}/article/100/0`);
  return res.data as Post[];
});

export const updatePostStatus = createAsyncThunk(
  "posts/updateStatus",
  async ({ id, data }: { id: number; data: Partial<Post> }) => {
    await axios.patch(`${BASE_URL}/article/${id}`, data);
    return { id, ...data };
  }
);

const initialState: PostState = {
  posts: [],
  loading: false,
};

const postAPI = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(updatePostStatus.fulfilled, (state, action) => {
        const idx = state.posts.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) {
          state.posts[idx] = { ...state.posts[idx], ...action.payload };
        }
      });
  },
});

export default postAPI.reducer;
