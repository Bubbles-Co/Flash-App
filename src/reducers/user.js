import { LOGIN_REQUESTED, LOGIN_RECEIVED, LOGIN_FAILED } from "../actions/loginActions";
import { SIGNUP_REQUESTED, SIGNUP_RECEIVED, SIGNUP_FAILED } from "../actions/signupActions";

const initialState = { id: null, status: "" }

function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUESTED:
      state = Object.assign({}, state, { status: "waiting" });
      break;
    case LOGIN_RECEIVED:
      state = Object.assign({}, state, { id: action.payload.id, status: "received" });
      break;
    case LOGIN_FAILED:
      state = Object.assign({}, state, { status: "failed", error: action.payload })
      break;
    case SIGNUP_REQUESTED:
      state = Object.assign({}, state, { status: "waiting" });
      break;
    case SIGNUP_RECEIVED:
      state = Object.assign({}, state, { id: action.payload.id, status: "received" });
      break;
    case SIGNUP_FAILED:
      state = Object.assign({}, state, { status: "failed", error: action.payload })
      break;
  }

  return state;
}

export default user;