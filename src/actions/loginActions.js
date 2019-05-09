import axios from 'axios';

export const LOGIN_REQUESTED = "LOGIN_REQUESTED";
export const LOGIN_RECEIVED = "LOGIN_RECEIVED";
export const LOGIN_FAILED = "LOGIN_FAILED";

export function getLoginAction(username, password) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUESTED
    });

    axios.post("http://localhost:3000/sign-in", {
      username: username, password: password
    })
    .then(data => dispatch({
      type: LOGIN_RECEIVED,
      payload: data.data
    }))
    .catch(error => dispatch({
      type: LOGIN_FAILED,
      payload: error
    }))
  }
}