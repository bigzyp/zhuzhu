import Taro, { Component } from '@tarojs/taro'
import { View, Image, Label } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as acitons from '@store/user/action'
import GetUserInfo from '@components/getUserInfo'

import './style.less'

@connect(({ user }) => (user), {...acitons})
class Login extends Component {

  config = {
    navigationBarTitleText: 'ing',
    navigationStyle: 'custom',
    navigationBarTextStyle: 'white'
  }
  state = {
    statusBarHeight: Taro.getSystemInfoSync().statusBarHeight, // 状态栏高度
    showGetPhone: false
  }

  componentDidShow () {
    
  }

  startRecord = () => {
    const rm = Taro.getRecorderManager()
    // Taro.openSetting()
    rm.start({
      success: (e) => {
        console.log(e)
      },
      failed: (e) => {
        console.log(e)
      }
    })
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

  getUserInfo = () => {
    // const { dispatchUser } = this.props
    // const { userInfo } = e.detail
    // dispatchUser(userInfo)
    // this.hideGetPhone()
  }
  login = (e) => {
    console.log(e)
    this.setState({
      showGetPhone: false
    })
  }

  render () {
    const { statusBarHeight, showGetPhone } = this.state
    const { userInfo, login } = this.props
    return (
      <View>
        {!!showGetPhone && <GetUserInfo onCancle={this.hideGetPhone} onConfirm={this.getUserInfo} onLoginBack={this.login} />}
        <View className='mine_banner' style={{paddingTop: `${statusBarHeight}px`}}>
            <View className='mine_banner_title'>我的</View>
            {/* <Image src='https://oss.aircourses.com/web/ac_write/mine_banner_bg.png' className='mine_banner_bg' /> */}
            <Image src='https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/banner1.jpeg' className='mine_banner_bg' />
        </View>
        {!login ? 
          <View className='mine_user_info' onClick={this.showGetPhone}>
            <View className='mine_info'>
                <View className='img_wrap'>
                  <View className='head_img img1' style={{backgroundImage: 'url(https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/portrait.png)'}} />
                  <View className='head_img img2' style={{backgroundImage: 'url(https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/portrait.png)'}} />
                </View>
                <View className='mine_user_name'>点击登录/注册</View>
            </View>
          </View>
          :
          <View className='mine_user_info' onClick='goToSet'>
            <View className='mine_info'>
              <View className='img_wrap'>
                <View className='head_img img1' style={{backgroundImage: `url(${userInfo.headPortrait})`}} />
                <View className='head_img img2' style={{backgroundImage: 'url(https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/portrait.png)'}} />
              </View>
              <View className='mine_user_name'>{userInfo.nickname}</View>
            </View>
          </View>
        }
        <View className='mine_logistics' onClick={this.login}>
            <View className='mine_logistics_box'> 
                <Image className='icon icon_pass' src='https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/yaoqing.png' />
                <Label>邀请TA</Label>
            </View>
            <View className='icon icon_arrow' />
        </View>
      </View>
    )
  }
}

export default Login
