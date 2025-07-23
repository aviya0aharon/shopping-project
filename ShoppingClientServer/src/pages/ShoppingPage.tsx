import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { Button } from "@mui/material";

import { Pages } from "../enums/pages";
import ProductAdder from "../components/productAdder";
import ShoppingList from "../components/shoppingList";
import { selectShoppingList } from "../features/shoppingListSlice";

export default function ShoppingPage() {
  const shoppingList = useSelector(selectShoppingList);

  return (
    <div
      style={{
        gap: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ProductAdder></ProductAdder>
      <ShoppingList></ShoppingList>
      <Button
        component={RouterLink}
        style={{
          width: "fit-content",
          alignSelf: "end",
        }}
        to={Pages.SummaryPage}
        variant="contained"
        disabled={!shoppingList.length}
      >
        המשך להזמנה
      </Button>
    </div>
  );
}
