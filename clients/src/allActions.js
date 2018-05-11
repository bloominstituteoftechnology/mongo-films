import axios from "axios";
export const FETCHING_FILMS = "FETCHING_FILMS";
export const FETCHED_FILMS = "FETCHED_FILM";
export const FETCHING_ERROR = "FETCHING_ERROR";

const fetchingMoviesActionCreator = () => {
  const promise = axios.get("http://localhost:5000/api/films");
  return dispatch => {
    promise
      .then(
        dispatch({
          type: FETCHING_FILMS
        })
      )
      .then(response => {
        console.log(response.data);
        dispatch({
          type: FETCHED_FILMS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: FETCHING_ERROR
        });
      });
  };
};
export { fetchingMoviesActionCreator };
