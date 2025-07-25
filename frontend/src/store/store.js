import { configureStore } from "@reduxjs/toolkit";

import loader from "./slices/loader.slice";
import user from "./slices/user.slice";

export default configureStore({
  reducer: { loader, user },
});
