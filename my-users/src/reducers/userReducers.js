import {
  GET_USERS,
  SUCCESS,
  FAILURE,
} from '../actions/actions';

const initialState = {
  users: [],
  gettingUsers: false,
  error: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_USERS:
      return {
        ...state,
        gettingUsers: true,
        error: null,
      }
    case SUCCESS:
      return {
        ...state,
        users: action.payload,
        gettingUsers: false,
        error: null,
      }
    case FAILURE:
      return {
        ...state,
        gettingUsers: false,
        error: action.payload,
      }
    default:
      return state
  }
}