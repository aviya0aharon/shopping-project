export type Product = {
  id: number;
  name: string;
  category: string;
  categoryId: number;
};

export type ShoppingProduct = Product & { amount: number };
