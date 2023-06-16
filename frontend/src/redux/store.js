import { configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import calcReducer from "./slices/calcSlice";

const persistConfig = {
  key: "root",
  storage,
};

const store = configureStore({
  reducer: {
    calc: calcReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);

export { store, persistor };


