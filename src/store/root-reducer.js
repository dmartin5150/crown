import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";
import {  persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};



export const rootReducer = combineReducers({
  user: userReducer,
  categories: persistReducer(persistConfig, categoriesReducer),
  cart: persistReducer(persistConfig, cartReducer),
});
// export const rootReducer = combineReducers({
//   user: userReducer,
//   categories: categoriesReducer,
//   cart: cartReducer,
// });

// export const persistedReducer = persistReducer(persistConfig, rootReducer);