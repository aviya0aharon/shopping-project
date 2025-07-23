import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import type { AppDispatch } from "../app/store";
import type { Product } from "../types/product.type";
import { addProduct } from "../features/shoppingListSlice";
import { selectCategories, selectProducts } from "../features/productsSlice";

export default function ProductAdder() {
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(selectCategories);
  const allProducts = useSelector(selectProducts);

  const [amount, setAmount] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products = useMemo(
    () =>
      allProducts.filter(
        (product: Product) => product.category === selectedCategory
      ),
    [allProducts, selectedCategory]
  );

  useEffect(() => {
    setSelectedProduct(null);
  }, [selectedCategory]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        direction: "rtl",
        gap: "10px",
      }}
    >
      <Autocomplete
        id="itemTypes"
        disablePortal
        options={categories}
        sx={{ width: 300 }}
        onChange={(_, value) => setSelectedCategory(value)}
        renderInput={(params) => <TextField {...params} label="בחר קטגוריה" />}
      />
      <Autocomplete
        disabled={!selectedCategory}
        disablePortal
        options={products}
        value={selectedProduct}
        sx={{ width: 300 }}
        onChange={(_, value) => setSelectedProduct(value)}
        getOptionLabel={(option: Product) => option.name || ""} // Show product name
        renderInput={(params) => <TextField {...params} label="שם מוצר" />}
      />

      <TextField
        onKeyDown={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        onChange={(event) => setAmount(Number.parseInt(event.target.value))}
        label="כמות"
      />
      <Button
        variant="contained"
        disabled={!(selectedCategory && selectedProduct && amount)}
        onClick={() => dispatch(addProduct({ ...selectedProduct!, amount }))}
      >
        הוסף מוצר לסל
      </Button>
    </div>
  );
}
