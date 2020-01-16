/*
 * @Author: zengyangping
 * @Date: 2019-11-22 22:11:43
 * @LastEditors  : zengyangping
 * @LastEditTime : 2020-01-16 11:09:15
 * @Description: 
 * @FilePath: /zhuzhutool/src/pages/login/index.js
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as acitons from '@store/user/action'
import GetUserInfo from '@components/getUserInfo'

import './style.less'

@connect(({ user }) => ({ ...user }), {...acitons})
class Invite extends Component {

  config = {
    navigationBarTitleText: '注册/登录'
  }
  state = {
    showGetPhone: false
  }
  showGetPhone () {
    this.setState({
      showGetPhone: true
    })
  }
  hideGetPhone = () => {
    this.setState({
      showGetPhone: false
    })
  }
  login = () => {
    Taro.switchTab({
      url: '/pages/index/index'
    })
  }

  goLogin = () => {
    Taro.navigateTo({
      url: '/pages/login-username/index'
    })
  }

  render () {
    const { refereeId } = this.$router.params;
    const { showGetPhone } = this.state;
    return (
      <View className='invite'>
        {!!showGetPhone && <GetUserInfo onCancle={this.hideGetPhone} onLoginBack={this.login} loginOptions={{ refereeId }} />}
        <View className='btn' onClick={this.showGetPhone}>{refereeId ? '接受邀请' : '一键登录'}</View>
        <View className='btn' onClick={this.goLogin}>账号登录</View>
      </View>
    )
  }
}

export default Invite
