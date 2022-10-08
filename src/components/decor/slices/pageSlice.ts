import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  page: number;
}

const initialState: CounterState = {
  page: 1,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page++;
    },
    previousPage: (state) => {
      state.page--;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { nextPage, previousPage, setPage } = pageSlice.actions;

export default pageSlice.reducer;
