import { createAction } from '@utils/redux';
import { API_WISHES_LIST, API_WISHES_DETAIL, API_WISHES_SAVE, API_WISHES_UPDATE } from '@constants/api';
import { WISHES_LIST, WISHES_DETAIL, WISHES_SAVE, WISHES_UPDATE } from './action-type';

export const dispatchGetList = payload => createAction({
  url: API_WISHES_LIST,
  type: WISHES_LIST,
  method: 'GET',
  payload
})

export const dispatchGetDetail = payload => createAction({
  url: API_WISHES_DETAIL,
  type: WISHES_DETAIL,
  method: 'GET',
  payload
})

export const dispatchSave = payload => createAction({
  url: API_WISHES_SAVE,
  type: WISHES_SAVE,
  method: 'POST',
  payload
})

export const dispatchUpdate = payload => createAction({
  url: API_WISHES_UPDATE,
  type: WISHES_UPDATE,
  method: 'PUT',
  payload
})

