import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};


export const userReducer = (state = INITIAL_STATE, action) => { // NOSONAR
  const { type, payload } = action;
  switch (type) { // NOSONAR
    case USER_ACTION_TYPES.SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: payload,
      };
    }
    default:
      console.log('default');
      return state;
  }
};
