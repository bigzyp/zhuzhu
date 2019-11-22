import { createAction } from '@utils/redux';
import { API_ANNIVERSARY_LIST, API_ANNIVERSARY_DETAIL, API_ANNIVERSARY_SAVE, API_ANNIVERSARY_UPDATE } from '@constants/api';
import { ANNIVERSARY_LIST, ANNIVERSARY_DETAIL, ANNIVERSARY_SAVE, ANNIVERSARY_UPDATE } from './action-type';

export const dispatchGetList = payload => createAction({
  url: API_ANNIVERSARY_LIST,
  type: ANNIVERSARY_LIST,
  method: 'GET',
  payload
})

export const dispatchGetDetail = payload => createAction({
  url: API_ANNIVERSARY_DETAIL,
  type: ANNIVERSARY_DETAIL,
  method: 'GET',
  payload
})

export const dispatchSave = payload => createAction({
  url: API_ANNIVERSARY_SAVE,
  type: ANNIVERSARY_SAVE,
  method: 'POST',
  payload
})

export const dispatchUpdate = payload => createAction({
  url: API_ANNIVERSARY_UPDATE,
  type: ANNIVERSARY_UPDATE,
  method: 'PUT',
  payload
})

