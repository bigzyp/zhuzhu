import { createAction } from '@utils/redux';
import { API_USER_LOGIN, API_USER_INVITE, API_USER_UPDATE } from '@constants/api'
import { USER_UPDATE_WEATHER, USER_LOGIN, USER_INVITE,USER_LOGOUT, USER_UPDATE } from './action-type';

export const dispatchLogin = payload => createAction({
  url: API_USER_LOGIN,
  type: USER_LOGIN,
  method: 'POST',
  payload
})

export const dispatchUpdate = payload => createAction({
  url: API_USER_UPDATE,
  type: USER_UPDATE,
  method: 'PUT',
  payload
})

export const dispatchInvite = payload => createAction({
  url: API_USER_INVITE,
  type: USER_INVITE,
  method: 'POST',
  payload
})

export const dispatchWeather = payload => ({
  type: USER_UPDATE_WEATHER,
  payload
})

export const dispatchLogout = () => ({ type: USER_LOGOUT })

