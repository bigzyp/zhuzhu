import Taro from '@tarojs/taro';
import { USER_UPDATE_WEATHER, USER_LOGIN, USER_LOGOUT } from './action-type';

const userInfo = Taro.getStorageSync('userInfo') || {};

const INITIAL_STATE = {
  userInfo,
  weather: {},
  login: Boolean(userInfo.userId),
}

export default function user (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        userInfo: {
          ...action.payload,
        },
        login: true
      }
    case USER_UPDATE_WEATHER:
      return {
        ...state,
        weather: {
          ...action.payload,
        }
      }
    case USER_LOGOUT:
      return {
        ...INITIAL_STATE
      }
    default:
       return state
  }
}
