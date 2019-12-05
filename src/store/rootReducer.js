import { combineReducers } from 'redux';
import user from './user/reducer';
import home from './home/reducer';
import anniversary from './anniversary/reducer';
import wishes from './wishes/reducer';

export default combineReducers({
  home,
  user,
  anniversary,
  wishes
});