import { createAction } from '@utils/redux';
import { API_ANNIVERSARY_LIST, API_WISHES_LIST } from '@constants/api';
import { HOME_ANNIVERSARY_LIST, HOME_WISHES_LIST } from './action-type';

export const dispatchAnniversaryList = payload => createAction({
  url: API_ANNIVERSARY_LIST,
  type: HOME_ANNIVERSARY_LIST,
  method: 'GET',
  payload
})

export const dispatchWishesList = payload => createAction({
  url: API_WISHES_LIST,
  type: HOME_WISHES_LIST,
  method: 'GET',
  payload
})

