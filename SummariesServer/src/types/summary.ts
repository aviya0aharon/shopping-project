export interface Summary {
  fullName: string;
  address: string;
  email: string;
  products: {
    id: number;
    name: string;
    quantity: number;
    category: string;
    categoryID: number;
  }[];
}
