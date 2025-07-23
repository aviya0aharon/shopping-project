import { configureStore } from "@reduxjs/toolkit";

import shoppingListReducer from "../features/shoppingListSlice";
import categoriesAndItemsReducer from "../features/productsSlice";

export const store = configureStore({
  reducer: {
    products: categoriesAndItemsReducer,
    shoppingList: shoppingListReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
