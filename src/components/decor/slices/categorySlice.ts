import { createSlice } from "@reduxjs/toolkit";

interface IImage {
  businessImages: string[];
  urls: string;
}

export interface CategoryState {
  clear: boolean;
  images: IImage[];
  categoryUrls: string[];
  detailDisplay: boolean;
  loading: boolean;
  inputValue: string;
  imageListDisplay: boolean;
}

const initialState: CategoryState = {
  clear: false,
  images: [],
  categoryUrls: [],
  detailDisplay: false,
  loading: false,
  inputValue: "",
  imageListDisplay: false,
};

export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setClear: (state, action) => {
      state.clear = action.payload;
      if (state.clear) {
        state.images = [];
      }
    },
    setImages: (state, action) => {
      state.images.push(action.payload);
    },
    setCategoryUrls: (state, action) => {
      state.categoryUrls = action.payload;
    },
    setDetailDisplay: (state, action) => {
      state.detailDisplay = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    setImageListDisplay: (state, action) => {
      state.imageListDisplay = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setClear,
  setImages,
  setCategoryUrls,
  setDetailDisplay,
  setLoading,
  setInputValue,
  setImageListDisplay,
} = CategorySlice.actions;

export default CategorySlice.reducer;
