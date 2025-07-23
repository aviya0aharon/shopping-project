import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState } from "../app/store";
import type { Product } from "../types/product.type";

type productsState = {
  value: {
    categories: string[];
    products: Product[];
    status: string;
    error: string | undefined;
  };
};

const initialState: productsState = {
  value: {
    categories: [],
    products: [],
    status: "idle",
    error: undefined,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.value.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.value.status = "succeeded";
        state.value.categories = action.payload.categories;
        state.value.products = action.payload.items;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.value.status = "failed";
        state.value.error = action.error.message;
      });
  },
});

export const selectCategories = (state: RootState) =>
  state.products.value.categories;
export const selectProducts = (state: RootState) =>
  state.products.value.products;
export const selectStatus = (state: RootState) => state.products.value.status;
export const selectError = (state: RootState) => state.products.value.error;
export const {} = productsSlice.actions;
export default productsSlice.reducer;

export const fetchData = createAsyncThunk(
  "shopping/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/productsServer/products");

      if (!response.ok) return rejectWithValue(`HTTP ${response.status}`);

      let result: any = await response.json();

      if (!response.ok) return result;
      else {
        return {
          categories: Array.from(
            new Set((result as Product[]).map((item) => item.category))
          ),
          items: result,
        };
      }
    } catch (err) {
      return rejectWithValue((err as any).message);
    }
  }
);
