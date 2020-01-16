/*
 * @Author: zengyangping
 * @Date: 2019-10-29 15:36:31
 * @LastEditors: zengyangping
 * @LastEditTime: 2020-01-16 13:42:45
 * @Description: 
 * @FilePath: /zhuzhutool/src/utils/request.js
 */
import Taro from '@tarojs/taro'
import { API_USER_LOGIN, API_USER_LOGIN_TEST } from '@constants/api'

const CODE_SUCCESS = '200'
const CODE_AUTH_EXPIRED = '600'

function getStorage(key) {
  return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
}

function updateStorage(data = {}) {
  return Promise.all([
    Taro.setStorage({
      key: 'userInfo',
      data
    }),
    Taro.setStorage({
      key: 'userId',
      data: data.user.userId
    })
  ])
}

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function request(options) {
  const { url, payload, method = 'GET', showToast = true, autoLogin = true } = options
  const userId = await getStorage('userId');
  if(userId) payload.userId = userId;
  const token = '';
  const header = token ? { 'WX-PIN-SESSION': token, 'X-WX-3RD-Session': token } : {}
  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }

  return Taro.request({
    url,
    method,
    data: payload,
    header
  }).then(async (res) => {
    const { code, data } = res.data;
    if(url.indexOf('heweather') !== -1){
      return Promise.resolve(res.data.HeWeather6[0])
    }
    if (code != CODE_SUCCESS) {
      if (code === CODE_AUTH_EXPIRED) {
        await updateStorage({})
      }
      return Promise.reject(res.data)
    }

    if (url === API_USER_LOGIN || url === API_USER_LOGIN_TEST) {
      await updateStorage(data)
    }

    // XXX 用户信息需展示 uid，但是 uid 是登录接口就返回的，比较蛋疼，暂时糅合在 fetch 中解决
    // if (url === API_USER) {
    //   const uid = await getStorage('uid')
    //   return { ...data, uid }
    // }

    return data
  }).catch((err) => {
    const defaultMsg = err.status === CODE_AUTH_EXPIRED ? '登录失效' : '请求异常'
    if (showToast) {
      Taro.showToast({
        title: err && err.error || defaultMsg,
        icon: 'none'
      })
    }

    if (err.code === CODE_AUTH_EXPIRED && autoLogin) {
      Taro.navigateTo({
        url: '/pages/user-login/user-login'
      })
    }

    return Promise.reject({ message: defaultMsg, ...err })
  })
}
