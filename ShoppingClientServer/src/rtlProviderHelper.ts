import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { createTheme } from "@mui/material";
import rtlPlugin from "@mui/stylis-plugin-rtl";

// Create rtl cache
export const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export const theme = createTheme({
  direction: "rtl",
});
