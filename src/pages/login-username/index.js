/*
 * @Author: zengyangping
 * @Date: 2020-01-15 10:06:54
 * @LastEditors  : zengyangping
 * @LastEditTime : 2020-01-16 10:30:02
 * @Description: 
 * @FilePath: /zhuzhutool/src/pages/login-username/index.js
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Form, Input, Button, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { dispatchLoginTest } from '@store/user/action'
import './style.less'

@connect(({ user }) => ({ ...user }), { dispatchLoginTest })
class LoginUsername extends Component {

  config = {
    navigationBarTitleText: '注册/登录'
  }

  formSubmit = e => {
    const { value: { username, password } } = e.detail;
    const { refereeId } = this.$router.params;
    if(username === '') return Taro.showToast({ title: '用户名不能为空', icon: 'none' });
    if(password === '') return Taro.showToast({ title: '密码不能为空', icon: 'none' });
    console.log(refereeId)
    Taro.showLoading({ title: '登录中～' });
    this.props.dispatchLoginTest({ loginName: username, password }).then(() => {
      Taro.switchTab({
        url: '/pages/index/index'
      })
    }).finally(() => { Taro.hideLoading() });
  }

  render () {
    const { username, password } = this.state;
    return (
      <View className='invite'>
        <Image className='logo' src='https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/loading.gif' ></Image>
        <Form onSubmit={this.formSubmit} >
          <Input className='username' name='username' placeholder='请输入账号' value={username} />
          <Input className='password' name='password' placeholder='请输入密码' value={password} />
          <Button className='btn active' formType='submit'>注册/登录</Button>
        </Form>
      </View>
    )
  }
}

export default LoginUsername
