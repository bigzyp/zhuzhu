import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as acitons from '@store/user/action'
import GetUserInfo from '@components/getUserInfo'

import './style.less'

@connect(({ user }) => ({ ...user }), {...acitons})
class Invite extends Component {

  config = {
    navigationBarTitleText: '邀请'
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
  goAllwishes = () => {
    Taro.navigateTo({
      url: '/pages/allwishes/index'
    })
  }

  render () {
    const { refereeId } = this.$router.params;
    const { showGetPhone } = this.state;
    return (
      <View className='invite'>
        {!!showGetPhone && <GetUserInfo onCancle={this.hideGetPhone} onLoginBack={this.hideGetPhone} loginOptions={{ refereeId }} />}
        <View className='btn' onClick={this.showGetPhone}>接受邀请</View>
      </View>
    )
  }
}

export default Invite