import {all, call, put, takeLatest} from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import { signInSuccess,signInFailed } from './user.action';
import { getCurrentUser } from '../../utils/firebase/firebase.utils';
import {createUserDocumentFromAuth} from "./utils/firebase/firebase.utils";



export function* getSnapshotfromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapShot = yield call (createUserDocumentFromAuth, userAuth, additionalDetails);
    console.log(userSnapShot);
    console.log(userSnapShot.data());
  } catch (error) {
    yield put (signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield  call(getCurrentUser);
    if (!userAuth) return;
    yield call (getSnapshotfromUserAuth, userAuth);
  } catch (error) {
    yield put (signInFailed(error));
  }
}


export function* onCheckUserSession () {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}


export  function* userSaga() {
  yield all([onCheckUserSession]);
}