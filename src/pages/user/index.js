import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
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

  onShareAppMessage () {
    const { userInfo: { user } } = this.props;
    return {
      title: '亲爱的，一起来玩鸭～',
      path: 'pages/loading/index?refereeId=' + user.userId,
      imageUrl: 'https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/share.jpeg'
    }
  }
  showGetPhone = () => {
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
    this.setState({
      showGetPhone: false
    })
  }

  logout = () => {
    this.props.dispatchLogout();
    Taro.removeStorageSync('userInfo');
    Taro.removeStorageSync('userId');
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }

  render () {
    const { statusBarHeight, showGetPhone } = this.state
    const { userInfo: { user, joinUser }, login } = this.props
    return (
      <View>
        {!!showGetPhone && <GetUserInfo onCancle={this.hideGetPhone} onLoginBack={this.login} />}
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
                <View className='head_img img1' style={{backgroundImage: `url(${user.headPortrait})`}} />
                <View className='head_img img2' style={{backgroundImage: `url(${joinUser.headPortrait})`}} />
              </View>
              <View className='mine_user_name'>{user.nickname}</View>
            </View>
          </View>
        }
        <View className='mine_item'>
          <Button className='mine_item_box' openType='share'> 
            <Image className='icon icon_pass' src='https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/yaoqing.png' />
            <View className='text'>邀请TA</View>
          </Button>
          <View className='icon icon_arrow' />
        </View>
        { login && <View className='logout' onClick={this.logout}>退出登录</View> }
      </View>
    )
  }
}

export default Login
