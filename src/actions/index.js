import axios from 'axios';
import { SubmissionError } from 'redux-form';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE,
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }, callback) {
  return function (dispatch) {
    // Submit email & password to the server
    return axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/feature'
        callback();
      })
      .catch(() => {
        // If the rquest is bad...
        // - Show an error to the user
        // dispatch(authError('Bad login info'));
        throw new SubmissionError({
          _error: 'Bad login info',
        });
      });
  };
}

export function signupUser({ email, password }, callback) {
  return function (dispatch) {
    // Submit email & password to the server
    return axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/feature'
        callback();
      })
      .catch(response => {
        // If the rquest is bad...
        // - Show an error to the user
        // dispatch(authError('Bad login info'));
        console.log(response);
        // debugger;
        throw new SubmissionError({
          _error: response.response.data.error,
        });
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER,
  };
}

export function fetchMessage() {
  return function (dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message,
        });
      });
  };
}
