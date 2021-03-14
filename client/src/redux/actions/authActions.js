import { LOGGED_IN_USER, LOGGED_OUT } from './types';

export const loggedIn = (email, token) => async dispatch => {
  try {
    dispatch({ type: LOGGED_IN_USER, payload: { email, token } });
  } catch (err) {
    console.error(err.message);
  }
};

export const logout = email => async dispatch => {
  try {
    dispatch({ type: LOGGED_OUT, payload: null });
  } catch (err) {}
};
