import Taro from '@tarojs/taro';
import { USER_UPDATE_WEATHER, USER_LOGIN, USER_INVITE, USER_LOGOUT } from './action-type';

const _userInfo = Taro.getStorageSync('userInfo');
const userInfo = {
  user: {},
  joinUser: {},
  ..._userInfo
}

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
          ...state.userInfo,
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
        userInfo: {
          user: {},
          joinUser: {}
        },
        weather: {},
        login: false
      }
    default:
       return state
  }
}
