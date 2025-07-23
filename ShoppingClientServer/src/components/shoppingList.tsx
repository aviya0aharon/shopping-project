import { useMemo } from "react";
import { useSelector } from "react-redux";

import type { ShoppingProduct } from "../types/product.type";
import { selectShoppingList } from "../features/shoppingListSlice";

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const ShoppingList = () => {
  const products = useSelector(selectShoppingList);

  const { productByCategory, maxRow } = useMemo(() => {
    let productByCategory = products.reduce(
      (acc: { [key: string]: ShoppingProduct[] }, product) => {
        const key: string = product.category;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(product);
        return acc;
      },
      {}
    );

    let maxRow = Math.max(
      ...Object.values(productByCategory).map((products) => products.length)
    );

    return { productByCategory, maxRow };
  }, [products]);

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))),
    [products]
  );

  return (
    <TableContainer component={Paper} sx={{ mt: 4, overflowX: "auto" }}>
      <Table sx={{ tableLayout: "fixed", minWidth: categories.length * 150 }}>
        <colgroup>
          {categories.map((_, index) => (
            <col
              key={index}
              style={{ width: "150px", minWidth: "150px", maxWidth: "150px" }}
            />
          ))}
        </colgroup>
        <TableHead>
          <TableRow>
            {categories.map((category, index) => (
              <TableCell
                key={category}
                align="center"
                style={{ width: 200 }}
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRight:
                    index < categories.length - 1 ? "2px solid #ccc" : "none",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "150px !important", // force MUI to respect width
                  minWidth: "150px !important",
                  maxWidth: "150px !important",
                }}
              >
                {category}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: maxRow }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {categories.map((category) => {
                const product = productByCategory[category][rowIndex];
                return (
                  <TableCell
                    key={category + rowIndex}
                    align="center"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "150px !important",
                      minWidth: "150px !important",
                      maxWidth: "150px !important",
                    }}
                  >
                    {product ? `${product.name} - ${product.amount}` : ""}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShoppingList;
