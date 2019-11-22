import { createAction } from '@utils/redux';
import { API_USER_LOGIN } from '@constants/api'
import { USER_UPDATE_WEATHER, USER_LOGIN, USER_LOGOUT } from './action-type';

export const dispatchLogin = payload => createAction({
  url: API_USER_LOGIN,
  type: USER_LOGIN,
  method: 'POST',
  payload
})

export const dispatchWeather = payload => ({
  type: USER_UPDATE_WEATHER,
  payload
})

export const dispatchLogout = () => ({ type: USER_LOGOUT })

