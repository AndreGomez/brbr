import { SET_USER } from '../actions/user';
import { DESTROY_SESSION } from '../actions/auth';

const INITIAL_STATE = {};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload
      }
    case DESTROY_SESSION:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default user;