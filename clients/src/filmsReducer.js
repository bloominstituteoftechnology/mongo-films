import { FETCHING_FILMS, FETCHED_FILMS, FETCHING_ERROR } from "./allActions";

const initialState = [];
const filmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_FILMS:
      return state;
    case FETCHED_FILMS:
      return (state = action.payload);
    case FETCHING_ERROR:
      return state;
    default:
      return state;
  }
};
export { filmsReducer };
