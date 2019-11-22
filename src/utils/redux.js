/**
 * 适当封装 Redux，简化调用
 */
/* eslint-disable import/prefer-default-export */
import request from './request'

export function createAction(options) {
  const { url, payload = {}, method, fetchOptions, callback, type } = options
  return (dispatch) => {
    return request({ url, payload, method, ...fetchOptions }).then((res) => {
      dispatch({ type, payload: callback ? callback(res) : res })
      return res
    })
  }
}