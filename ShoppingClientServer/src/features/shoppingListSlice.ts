import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../app/store";
import type { ShoppingProduct } from "../types/product.type";

const initialState: { value: ShoppingProduct[] } = {
  value: [],
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ShoppingProduct>) => {
      let index = state.value.findIndex((item) => item.id == action.payload.id);
      if (index === -1) state.value.push(action.payload);
      else state.value[index].amount += action.payload.amount;

      state.value = [...state.value];
    },
    removeProduct: (state, action: PayloadAction<ShoppingProduct>) => {
      let index = state.value.findIndex((item) => item.id == action.payload.id);
      if (index === -1) return;

      state.value[index].amount -= action.payload.amount;
      if (state.value[index].amount <= 0) state.value.splice(index);
      state.value = [...state.value];
    },
    resetShoppingList: (state) => {
      state.value = [];
    },
  },
});

export const selectShoppingList = (state: RootState) =>
  state.shoppingList.value;
export const { addProduct, removeProduct, resetShoppingList } =
  shoppingListSlice.actions;
export default shoppingListSlice.reducer;
