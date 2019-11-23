import Taro from '@tarojs/taro';
import { USER_UPDATE_WEATHER, USER_LOGIN, USER_INVITE, USER_LOGOUT } from './action-type';

const userInfo = Taro.getStorageSync('userInfo') || { user: {}, joinUser: {} };

const INITIAL_STATE = {
  userInfo,
  weather: {},
  login: Boolean(userInfo.user.userId),
}

export default function user (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_LOGIN:
    case USER_INVITE:
      return {
        ...state,
        userInfo: {
          ...state.login,
          ...action.payload,
        },
        login: true
      }
    case USER_UPDATE_WEATHER:
      return {
        ...state,
        weather: {
          ...state.weather,
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
