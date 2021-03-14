import { LOGGED_IN_USER, LOGGED_OUT } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case LOGGED_IN_USER:
      return action.payload;
    case LOGGED_OUT:
      return action.payload;

    default:
      return state;
  }
};
