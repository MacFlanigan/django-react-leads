import axios from 'axios';
import {returnErrors} from "./messages";
import {USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCESS, LOGIN_FAILED, LOGOUT} from "./types";

export const tokenConfig = getState => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Get token
  const token = getState().authReducer.token;
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};


// == Check token and load user ==
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({type: USER_LOADING});

  const config = tokenConfig(getState);

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

// == Login user ==
export const login = (username, password) => dispatch => {

  const body = JSON.stringify({username, password});

  const config = {
    headers: {'Content-Type': 'application/json'}
  };

  axios.post('/api/auth/login', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCESS,
        payload: res.data
      })
    }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({type: LOGIN_FAILED});
  });
};

// == Logout user ==
export const logout = () => (dispatch, getState) => {

  const config = tokenConfig(getState);
  axios.post('/api/auth/logout', null, config)
    .then(res => {
      dispatch({
        type: LOGOUT
      })
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

