import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { dispatchGetList } from '@store/home/action';
import { dispatchWeather } from '@store/user/action';
import { computeDays } from '@utils/tools';
import request from '@utils/request';
import { WEATHER_TIPS } from '@constants/constant';

import './style.less'

@connect(({ user, home }) => ({ ...user, ...home }), { dispatchGetList, dispatchWeather })
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  
  componentDidShow(){
    const { login: isLogin } = this.props;
    isLogin && this.props.dispatchGetList({ homeDisplay: 1 });
  }

  goAnniversary = () => {
    Taro.navigateTo({
      url: '/pages/anniversary/index'
    })
  }

  getWeather = () => {
    Taro.getLocation({
      success: (data) => {
        const { latitude, longitude } = data;
        request({ 
          url: `https://free-api.heweather.net/s6/weather/now`,
          method: 'GET',
          payload: {
            location: `${longitude},${latitude}`,
            key: '5fe1e7efe30e43a2bb2eee4451913d2c'
          }
        }).then((res) => {
          this.props.dispatchWeather({ ...res })
        })
      }
    })
  }

  render () {
    const { userInfo: { user, joinUser }, anniversaryList, weather } = this.props;
    return (
      <ScrollView className='scroll-view' scrollY>
        <View className='mask'></View>
        <View className='index'>
          <View className='content-wrap'>
            <View className='top'>
              <View className='top-left'>
                <View className='img' style={{backgroundImage: `url(${user.headPortrait || ''})`}}></View>
                { weather.now ?
                  <View className='weather' style={{backgroundImage: `url(https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/cond/${weather.now.cond_code}.png)`}} >{`${weather.now.tmp}℃`}</View> :
                  <View className='weather no' onClick={this.getWeather}>获取天气</View>
                }
              </View>
              <View className='top-middle'>
                { weather.now &&
                  <View className='text left'>{WEATHER_TIPS[Math.floor(weather.now.tmp/5)]}</View>
                }
                <View className='text right'>天气冷啦，要加衣服了！</View>
              </View>
              <View className='top-left'>
                <View className='img' style={{backgroundImage: `url(${joinUser.headPortrait || ''})`}}></View>
                <View className='weather'>22℃</View>
              </View>
            </View>
            <View className='middle'>
              <Text className='days'>999</Text>
              <Text className='text'>天</Text>
              <View className='start'>起始日：2018年01月01日</View>
            </View>
            <View className='bottom'>
              { anniversaryList.map((ele, index) => (
                <View className='item' key={String(index)}>
                  <View>
                    <View className='title'>{ ele.title }</View>
                    <View className='days'>{ computeDays({ target: ele.commemorationTime, isRepeat: ele.repeatTime }) }</View>
                  </View>
                  <View className='icon' style={{backgroundImage: `url(https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/type/${ele.dayType}.png)`}}></View>
                </View>
              ))
              }
            </View>
            <View className='enchance' onClick={this.goAnniversary}>值得纪念</View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default Index
