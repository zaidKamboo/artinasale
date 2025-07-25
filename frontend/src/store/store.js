import { configureStore } from "@reduxjs/toolkit";

import loader from "./slices/loader.slice";
import user from "./slices/user.slice";
import product from "./slices/product.slice";
import products from "./slices/products.slice";

export default configureStore({
  reducer: { loader, user, product, products },
});
