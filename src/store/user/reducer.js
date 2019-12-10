import Taro from '@tarojs/taro';
import { USER_UPDATE_WEATHER, USER_LOGIN, USER_INVITE, USER_LOGOUT, USER_UPDATE } from './action-type';

const _userInfo = Taro.getStorageSync('userInfo');
const userInfo = {
  user: {},
  joinUser: {
    headPortrait: 'https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/wenhao.png'
  },
  ..._userInfo
}

const INITIAL_STATE = {
  userInfo,
  weather: {
    myWeather: {},
    joinWeather: {}
  },
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
    case USER_UPDATE:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.payload,
        },
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
