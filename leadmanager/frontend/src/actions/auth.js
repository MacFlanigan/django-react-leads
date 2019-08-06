import axios from 'axios';
import {returnErrors} from "./messages";
import {USER_LOADING, USER_LOADED, AUTH_ERROR} from "./types";

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({type: USER_LOADING});

  // Get token
  const token = getState().authReducer.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios.get('/api/auth/me', config)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({type: AUTH_ERROR});
  });
};