import { combineReducers } from 'redux';
import routes from './routeReducer';
import routeType from './routeType';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  routes,
  routeType,
  form: formReducer
})