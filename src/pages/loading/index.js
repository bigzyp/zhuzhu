import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import './style.less'

class Invite extends Component {

  config = {
    navigationBarTitleText: '加载中...'
  }
  componentDidMount(){
    const userId = Taro.getStorageSync('userId');
    setTimeout(() => {
      if(!userId){
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
