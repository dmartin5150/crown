import { updatePassword } from "firebase/auth";
import {
  createAction,
  Action,
  ActionwithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";
import {
  UserData,
  AdditionInformation,
} from "../../utils/firebase/firebase.utils";

export type SetCurrentUser = ActionwithPayload<
  USER_ACTION_TYPES.SET_CURRENT_USER,
  UserData
>;
export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;
export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;
export type EmailSignInStart = ActionwithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;
export type SignInSuccess = ActionwithPayload<
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  UserData
>;
export type SignInFailed = ActionwithPayload<
  USER_ACTION_TYPES.SIGN_IN_FAILED,
  Error
>;
export type SignUpStart = ActionwithPayload<
  USER_ACTION_TYPES.SIGN_UP_START,
  { displayName: string; email: string; password: string }
>;
export type SignUpSuccess = ActionwithPayload<
  USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  { user: UserData; addtionalDetails: AdditionInformation }
>;
export type SignUpFailed = ActionwithPayload<
  USER_ACTION_TYPES.SIGN_UP_FAILED,
  Error
>;
export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;
export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;
export type SignOutFailed = ActionwithPayload<
  USER_ACTION_TYPES.SIGN_OUT_FAILED,
  Error
>;

export const setCurrentUser = withMatcher(
  (user: UserData): SetCurrentUser =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
);

// SET_CURRENT_USER: "user/SET_CURRENT_USER",
// CHECK_USER_SESSION:"user/CHECK_USER_SESSION",
// GOOGLE_SIGN_IN_START: "user/GOOGLE_SIGN_IN_START",
// EMAIL_SIGN_IN_START: "user/EMAIL_SIGN_IN_START",
// SIGN_IN_SUCCESS:"user/SIGN_IN_SUCCESS",
// SIGN_IN_FAILURE:"user/SIGN_IN_FAILURE"

export const checkUserSession = withMatcher(
  (): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

export const googleSignInStart = withMatcher(
  (): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = (
  email: string,
  password: string
): EmailSignInStart =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = withMatcher(
  (user: UserData): SignInSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

export const signInFailed = withMatcher(
  (error: Error): SignInFailed =>
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
);

export const signUpStart = withMatcher(
  (email: string, password: string, displayName: string): SignUpStart =>
    createAction(USER_ACTION_TYPES.SIGN_UP_START, {
      email,
      password,
      displayName,
    })
);

export const signUpSuccess = withMatcher(
  (user: UserData, addtionalDetails: AdditionInformation): SignUpSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, addtionalDetails })
);
export const signUpFailed = withMatcher(
  (error: Error): SignUpFailed =>
    createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
);

export const signOutStart = withMatcher(
  (): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);
export const signOutSuccess = withMatcher(
  (): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);
export const signOutFailed = withMatcher(
  (error: Error): SignOutFailed =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);
