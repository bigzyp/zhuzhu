import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { dispatchGetList, dispatchGetDetail } from '@store/anniversary/action';
import { computeDays } from '@utils/tools';

import './style.less'

@connect(({ anniversary }) => ({ ...anniversary }), { dispatchGetList, dispatchGetDetail })
class Anniversary extends Component {

  config = {
    navigationBarTitleText: '纪念日'
  }
  state = {
    // statusBarHeight: Taro.getSystemInfoSync().statusBarHeight, // 状态栏高度
    // showGetPhone: false
  }

  componentDidShow(){
    
  }

  goEdit = (commemorationDayId) => {
    if(!commemorationDayId){
      return Taro.navigateTo({
        url: '/pages/anniversary-edit/index'
      });
    }
    Taro.showLoading();
    this.props.dispatchGetDetail({ commemorationDayId }).then(() => {
      Taro.navigateTo({
        url: '/pages/anniversary-edit/index?commemorationDayId=' + commemorationDayId
      });
      Taro.hideLoading();
    })
  }

  render () {
    const { anniversaryList } = this.props;
    return (
      <View className='anniversary'>
        <View className='mask'></View>
        <View className='content-wrap'>
          <View className='top'>
            <View className='flex'>
              在一起已经
              <Text>999</Text>
              天
            </View>
            <View className='start'>起始日：2018年01月01日</View>
          </View>
          <View className='list'>
          { anniversaryList.map((ele, index) => (
              <View className='item' key={String(index)} onClick={this.goEdit.bind(this, ele.commemorationDayId)}>
                <Image src={`https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/type/${ele.dayType}.png`}></Image>
                <View className='title'>{ ele.title }</View>
                <View className='num'>{ computeDays({ target: ele.commemorationTime, isRepeat: ele.repeatTime }) }</View>
              </View>
           ))
          }
          </View>
          <Image 
            className='add' 
            src='https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/add.png'
            onClick={this.goEdit.bind(this, false)}
          />
        </View>
      </View>
    )
  }
}

export default Anniversary
