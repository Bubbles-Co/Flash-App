import { ADD_ROUTE, REMOVE_ROUTE } from "../actions/addRoutes";

function routes(state = [], action) {
  switch (action.type) {
    case ADD_ROUTE:
      var { finish, grade, now } = action.payload;
      return [...state, { finish, grade, now }];
    case REMOVE_ROUTE:
      var { finish, grade } = action.payload;
      let dropIndex = state.findIndex(
        r => (r.finish === finish) & (r.grade === grade)
      );
      return [...state.slice(0, dropIndex), ...state.slice(dropIndex + 1)];
    default:
      return state;
  }
}

export default routes;
