import { createAction } from "../utils/reducer/reducer.utils";

const setCurrentUser = (user) => {
    dispatch(
      createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };