import axios from 'axios';

export const GET_USERS = 'FETCHING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const getAllUsers = () => dispatch => {
  dispatch ({ type: GET_USERS });
  axios
    .get('http://localhost:5000/api/users')
    .then(res => {
      dispatch({ 
        type: SUCCESS, 
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: FAILURE,
        payload: err.response
      })
    })
}