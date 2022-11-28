import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { categoriesReducer } from "./categories/category.reducer";

export const rootReducer = combineReducers ({
    user:userReducer,
    categories: categoriesReducer
});