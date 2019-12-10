import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { dispatchLogin } from '@store/user/action';

import './style.less'

@connect(({ user, home }) => ({ ...user, ...home }), { dispatchLogin })
class Invite extends Component {

  config = {
    navigationBarTitleText: '加载中...'
  }
  componentDidMount(){
    const { refereeId } = this.$router.params;
    const { login: isLogin } = this.props;
    if(isLogin){
      Taro.login({
        success: (res) => {
          const { code } = res;
          this.props.dispatchLogin({ code });
        }
      })
    }
    setTimeout(() => {
      if(refereeId) {
        return Taro.navigateTo({
          url: '/pages/login/index?refereeId='+refereeId
        })
      }
      if(!isLogin){
        Taro.navigateTo({
          url: '/pages/login/index'
        })
      }
      else{
        Taro.switchTab({
          url: '/pages/index/index'
        })
      }
    }, 1500);
  }
  render () {
    return (
      <View className='loading'>
        <Image src='https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/loading.gif'></Image>
      </View>
    )
  }
}

export default Invite
