import { createSlice } from "@reduxjs/toolkit";

export interface DetailsState {
  address: string;
  phoneNumber: string;
  email: string;
  products: string[];
  about: string;
  name: string;
  detailDisplay: boolean;
  singleUrl: string;
  singleImage: string;
  singleImages: string[];
}

const initialState: DetailsState = {
  address: "",
  phoneNumber: "",
  email: "",
  products: [],
  about: "",
  name: "",
  detailDisplay: false,
  singleUrl: "",
  singleImage: "",
  singleImages: [],
};

export const DetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAbout: (state, action) => {
      state.about = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setDetailDisplay: (state, action) => {
      state.detailDisplay = action.payload;
    },
    setSingleUrl: (state, action) => {
      state.singleUrl = action.payload;
    },
    setSingleImage: (state, action) => {
      state.singleImage = action.payload;
    },
    setSingleImages: (state, action) => {
      state.singleImages = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAddress,
  setPhoneNumber,
  setEmail,
  setName,
  setAbout,
  setProducts,
  setDetailDisplay,
  setSingleUrl,
  setSingleImage,
  setSingleImages,
} = DetailsSlice.actions;

export default DetailsSlice.reducer;
