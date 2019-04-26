import { combineReducers } from 'redux';
import routes from './routeReducer';
import routeType from './routeType'

export default combineReducers({
  routes,
  routeType
})