export const ADD_ROUTE = "ADD_ROUTE";
export const REMOVE_ROUTE = "REMOVE_ROUTE";

export const addRoute = (grade, finish, now) => ({
  type: ADD_ROUTE, payload: {grade, finish, now}
})

export const removeRoute = (grade, finish) => ({
  type: REMOVE_ROUTE, payload: {grade, finish}
})