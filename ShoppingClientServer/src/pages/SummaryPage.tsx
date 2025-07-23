import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { TextField, Button, Stack } from "@mui/material";

import { Pages } from "../enums/pages";
import type { AppDispatch } from "../app/store";
import ShoppingList from "../components/shoppingList";
import {
  resetShoppingList,
  selectShoppingList,
} from "../features/shoppingListSlice";

const SummaryPage = () => {
  const formInitState = {
    fullName: "",
    address: "",
    email: "",
  };

  const [form, setForm] = useState(formInitState);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const shoppingList = useSelector(selectShoppingList);

  const isFormValid: boolean =
    !!form.fullName && !!form.address && !!form.email;

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const saveSummary = async () => {
    setLoading(true);
    try {
      const result = await fetch("/summariesServer/summary/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, products: shoppingList }),
      });

      if (result.ok) {
        alert("ההזמנה נשמרה בהצלחה");
        resetShop();
      } else {
        alert("שמירת ההזמנה נכשלה");
      }
    } catch (error) {
      console.error("Error submitting summary:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetShop = () => {
    setForm(formInitState);
    dispatch(resetShoppingList());
    navigate(Pages.ShoppingPage);
  };

  return (
    <Stack spacing={3}>
      <TextField
        label="שם ושם משפחה"
        variant="outlined"
        value={form.fullName}
        onChange={handleChange("fullName")}
      />
      <TextField
        label="כתובת"
        variant="outlined"
        value={form.address}
        onChange={handleChange("address")}
      />
      <TextField
        label="אמייל"
        type="email"
        variant="outlined"
        value={form.email}
        onChange={handleChange("email")}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "end",
        }}
      >
        <Button
          variant="contained"
          component={RouterLink}
          style={{
            width: "fit-content",
          }}
          to={Pages.ShoppingPage}
        >
          ערוך הזמנה
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={!isFormValid || loading}
          onClick={() => saveSummary()}
        >
          {loading ? "שומר הזמנה..." : "אשר הזמנה"}
        </Button>
      </div>
      <ShoppingList></ShoppingList>
    </Stack>
  );
};

export default SummaryPage;
