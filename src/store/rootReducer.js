import { combineReducers } from 'redux';
import counter from './counter/reducer';
import user from './user/reducer';
import anniversary from './anniversary/reducer';

export default combineReducers({
  counter,
  user,
  anniversary
});