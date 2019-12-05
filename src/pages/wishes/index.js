import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as acitons from '@store/wishes/action'
import GetUserInfo from '@components/getUserInfo'

import './style.less'

@connect(({ wishes }) => (wishes), {...acitons})
class Wishes extends Component {

  config = {
    navigationBarTitleText: '心愿盒'
  }
  state = {
    // statusBarHeight: Taro.getSystemInfoSync().statusBarHeight, // 状态栏高度
    showGetPhone: false
  }

  componentDidShow () {
    console.log(this.props);
    this.props.dispatchGetList();
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
    const { showGetPhone } = this.state;
    const { wishBoxList } = this.props;
    return (
      <View className='wishes'>
        {!!showGetPhone && <GetUserInfo onCancle={this.hideGetPhone} onConfirm={this.getUserInfo} />}
        <View className='mask'></View>
        <Swiper
          className='swiper_wrap'
        >
        {wishBoxList.map((ele, index) => (
          <SwiperItem key={String(index)}>
            <View className='section section1'>
              <View className='box' onClick={this.goAllwishes}>
                <View className='card top' style={{backgroundImage: `url(${ele.wishPic})`}}></View>
                <View className='text title'>{ele.wishName}</View>
                <View className='text desc'>{ele.detail}</View>
                {/* <Image className='btn_status add' src={ele.wishPic} /> */}
              </View>
              <View className='btn share'>撒狗粮～</View>
              <View className='btn hide'>暂时隐藏</View>
            </View>
          </SwiperItem>
        ))
        }
      </Swiper>
        <View className='enchance' onClick={this.addWishes}>心愿宝盒</View>
      </View>
    )
  }
}

export default Wishes
