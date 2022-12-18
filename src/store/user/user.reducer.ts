import {AnyAction} from 'redux';
import { USER_ACTION_TYPES} from "./user.types";

import { signInSuccess,signOutSuccess,signInFailed,signUpFailed, signOutFailed } from './user.action';

import { UserData } from '../../utils/firebase/firebase.utils';

 
export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: Boolean;
  readonly error: Error | null;
}


  const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
  };
  
  export const userReducer = (state = INITIAL_STATE, action: AnyAction):UserState => {


    if (signInSuccess.match(action)) {
      return {
        ...state,
        currentUser: action.payload,
      };
    }

    if (signOutSuccess.match(action)) {
      return {
        ...state,
        currentUser:null,
      }
    }
    if (signUpFailed.match(action) || signOutFailed.match(action) || signInFailed.match(action)) {
      return {
        ...state,
        error: action.payload,
      }
    }

    return state;

    // switch (type) {
    //   case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
    //     return {
    //       ...state,
    //       currentUser: payload,
    //     };
    //   case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
    //     return {
    //       ...state,
    //       currentUser:null,
    //     }
    //   case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    //   case USER_ACTION_TYPES.SIGN_IN_FAILED:
    //   case USER_ACTION_TYPES.SIGN_UP_FAILED:
    //     return {
    //       ...state,
    //       error: payload,
    //     }
    //   default:
    //     return state;
    // }
  };
  
