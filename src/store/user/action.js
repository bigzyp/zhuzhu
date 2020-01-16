/*
 * @Author: zengyangping
 * @Date: 2019-10-30 11:01:09
 * @LastEditors  : zengyangping
 * @LastEditTime : 2020-01-16 10:24:05
 * @Description: 
 * @FilePath: /zhuzhutool/src/store/user/action.js
 */
import { createAction } from '@utils/redux';
import { API_USER_LOGIN, API_USER_INVITE, API_USER_UPDATE, API_USER_LOGIN_TEST } from '@constants/api'
import { USER_UPDATE_WEATHER, USER_LOGIN, USER_INVITE,USER_LOGOUT, USER_UPDATE } from './action-type';

export const dispatchWxLogin = payload => createAction({
  url: API_USER_LOGIN,
  type: USER_LOGIN,
  method: 'POST',
  payload
})

export const dispatchLoginTest = payload => createAction({
  url: API_USER_LOGIN_TEST,
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

