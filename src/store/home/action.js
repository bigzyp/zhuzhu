import { createAction } from '@utils/redux';
import { API_ANNIVERSARY_LIST } from '@constants/api';
import { HOME_ANNIVERSARY_LIST } from './action-type';

export const dispatchGetList = payload => createAction({
  url: API_ANNIVERSARY_LIST,
  type: HOME_ANNIVERSARY_LIST,
  method: 'GET',
  payload
})

export const a = 'a'

