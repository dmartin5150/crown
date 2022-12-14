import {takeLatest, all, call, put} from 'typed-redux-saga/macro';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';
import { CATEGORY_ACTION_TYPES } from './category.types';



  // export const fetchCategoriesAsync = () => async (dispatch) => {
  //   dispatch(fetchCategoriesStart());
  //   try {
  //     const categoriesArray = await getCategoriesAndDocuments('categories');
  //     dispatch(fetchCategoriesSuccess(categoriesArray));
  //   } catch (error) {
  //     dispatch (fetchCategoriesFailed(error));
  //   }
  // }


  export function* fetchCategoriesAsync() {
    try {
      const categoriesArray = yield* call(getCategoriesAndDocuments);
      console.log('saga categories', categoriesArray);
      yield* put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      yield* put (fetchCategoriesFailed(error as Error));
    }
  }


  export function* onFetchCategories() {
    yield* takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORY_START, fetchCategoriesAsync);
  }

  export function* categoriesSaga() {
    yield* all([call(onFetchCategories)]);
  }