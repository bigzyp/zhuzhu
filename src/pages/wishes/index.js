import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as acitons from '@store/user/action'
import GetUserInfo from '@components/getUserInfo'

import './style.less'

@connect(({ user }) => (user), {...acitons})
class Wishes extends Component {

  config = {
    navigationBarTitleText: '心愿盒'
  }
  state = {
    // statusBarHeight: Taro.getSystemInfoSync().statusBarHeight, // 状态栏高度
    showGetPhone: false
  }

  componentDidShow () {
    
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
  addWishes = () => {
    Taro.navigateTo({
      url: '/pages/wishes-edit/index'
    })
  }

  render () {
    const { showGetPhone } = this.state
    return (
      <View className='wishes'>
        {!!showGetPhone && <GetUserInfo onCancle={this.hideGetPhone} onConfirm={this.getUserInfo} />}
        <View className='mask'></View>
        <Swiper
          className='swiper_wrap'
          onClick={this.goAllwishes}
        >
        <SwiperItem>
          <View className='section section1'>
            <View className='box'>
              <View className='card top'></View>
              <View className='text title'>新建一个心愿</View>
              <View className='text desc'>这里是一条自由填写的心愿备注</View>
              <Image className='btn_status add' src='https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/add.png' />
            </View>
            <View className='btn_hide'>暂时隐藏</View>
          </View>
        </SwiperItem>
        <SwiperItem>
          <View className='section section1'>
            <View className='box'>
              <View className='card top'></View>
              <View className='text title'>新建一个心愿</View>
              <View className='text desc'>这里是一条自由填写的心愿备注</View>
              <Image className='btn_status add' src='https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/add.png' />
            </View>
            <View className='btn_hide'>暂时隐藏</View>
          </View>
        </SwiperItem>
        <SwiperItem>
          <View className='section section1'>
            <View className='box'>
              <View className='card top'></View>
              <View className='text title'>新建一个心愿</View>
              <View className='text desc'>这里是一条自由填写的心愿备注</View>
              <Image className='btn_status add' src='https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/add.png' />
            </View>
            <View className='btn_hide'>暂时隐藏</View>
          </View>
        </SwiperItem>
      </Swiper>
        <View className='enchance' onClick={this.addWishes}>心愿宝盒</View>
      </View>
    )
  }
}

export default Wishes
