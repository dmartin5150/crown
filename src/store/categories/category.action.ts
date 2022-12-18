import {
  createAction,
  Action,
  ActionwithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPES, Category } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export type FetchCategoriesStart =
  Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORY_START>;

export type FetchCategoriesSuccess = ActionwithPayload<
  CATEGORY_ACTION_TYPES.FETCH_CATEGORY_SUCCESS,
  Category[]
>;

export type FetchCategoriesFailed = ActionwithPayload<
  CATEGORY_ACTION_TYPES.FETCH_CATEGORY_FAILED,
  Error
>;

// export const setCategories = (categoriesArray) =>
//   createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categoriesArray);



export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORY_START));




export const fetchCategoriesSuccess = withMatcher((
  categoriesArray: Category[]
): FetchCategoriesSuccess =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORY_SUCCESS, categoriesArray));

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORY_FAILED, error));

// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());
//   try {
//     const categoriesArray = await getCategoriesAndDocuments("categories");
//     dispatch(fetchCategoriesSuccess(categoriesArray));
//   } catch (error) {
//     dispatch(fetchCategoriesFailed(error));
//   }
// };
