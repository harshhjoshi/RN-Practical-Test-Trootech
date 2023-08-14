import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// Defined the data structure for an image post
interface ImagePost {
  id: string;          // Change to string if the API returns string IDs
  images: string[];    // Array of image URLs
  name: string;        // Name of the image post
}

// Defined the state structure for the image posts slice
interface ImagePostsState {
  imagePosts: ImagePost[];
}

// Initial state for the image posts slice
const initialState: ImagePostsState = {
  imagePosts: [],
};

// Created a slice for the image posts using Redux Toolkit
const imagePostsSlice = createSlice({
  name: 'imagePosts',
  initialState,
  reducers: {
    setImagePosts: (state, action: PayloadAction<ImagePost[]>) => {
      state.imagePosts = action.payload;
    },
  },
});

// Extracted action creators from the slice
export const { setImagePosts } = imagePostsSlice.actions;

// Select the image posts from the state
export const selectImagePosts = (state: RootState) => state.imagePosts.imagePosts;

// Exported the reducer from the slice
export default imagePostsSlice.reducer;