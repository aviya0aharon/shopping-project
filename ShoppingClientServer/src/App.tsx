import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";

import { Pages } from "./enums/pages";
import SummaryPage from "./pages/SummaryPage";
import { type AppDispatch } from "./app/store";
import ShoppingPage from "./pages/ShoppingPage";
import { fetchData } from "./features/productsSlice";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    navigate(Pages.ShoppingPage);
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Routes>
          <Route path={Pages.ShoppingPage} element={<ShoppingPage />} />
          <Route path={Pages.SummaryPage} element={<SummaryPage />} />
        </Routes>
      </div>
    </>
  );
}
