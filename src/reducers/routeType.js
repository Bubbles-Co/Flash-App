import { SELECT_ROUTE_TYPE } from '../actions/selectRouteType';

function routeType(state = "", action) {
  switch (action.type) {
    case SELECT_ROUTE_TYPE:
      return action.routeType
    default:
      return state
  }
}

export default routeType;