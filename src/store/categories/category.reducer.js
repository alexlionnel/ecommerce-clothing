import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => { // NOSONAR
  const { type, payload } = action;
  switch (type) { // NOSONAR
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES: {
      return { ...state, categories: payload };
    }
    default:
      return state;
  }
};