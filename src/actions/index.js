export const ADD_ROUTE = "ADD_ROUTE";
export const REMOVE_ROUTE = "REMOVE_ROUTE";
export const SELECT_ROUTE_TYPE = "SELECT_ROUTE_TYPE";

export const addRoute = (grade, finish) => ({
  type: ADD_ROUTE, grade, finish
})

export const removeRoute = (grade, finish) => ({
  type: REMOVE_ROUTE, grade, finish
})

export const selectRouteType = (routeType) => ({
  type: SELECT_ROUTE_TYPE, routeType
})