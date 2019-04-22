import { ADD_ROUTE, REMOVE_ROUTE } from '../actions';

function routes(state = [], action) {
  switch (action.type) {
    case ADD_ROUTE:
      return [
        ...state,
        {
          finish: action.finish,
          grade: action.grade
        }
      ]
    case REMOVE_ROUTE:
      var dropIndex = state.findIndex(r => ((r.finish === action.finish) & (r.grade === action.grade)))
      return [
        ...state.slice(0, dropIndex),
        ...state.slice(dropIndex + 1)
      ]
    default:
      return state
  }
}

export default routes;