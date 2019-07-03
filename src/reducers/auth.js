import { INIT_SESSION, DESTROY_SESSION } from '../actions/auth';

const INITIAL_STATE = {
  authorize: false,
  token: null,
  firstTime: false
};

function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INIT_SESSION:
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

export default auth;
