import axios from 'axios';

export const SIGNUP_REQUESTED = "SIGNUP_REQUESTED";
export const SIGNUP_RECEIVED = "SIGNUP_RECEIVED";
export const SIGNUP_FAILED = "SIGNUP_FAILED";

export function getSignupAction(username, password, name) {
  return (dispatch) => {
    dispatch({
      type: SIGNUP_REQUESTED
    });

    axios.post("http://localhost:3000/sign-up", {
      username: username, password: password, name:name
    })
    .then(data => dispatch({
      type: SIGNUP_RECEIVED,
      payload: data.data
    }))
    .catch(error => dispatch({
      type: SIGNUP_FAILED,
      payload: error
    }))
  }
}