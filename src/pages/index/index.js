import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { dispatchGetList } from '@store/home/action';
import { dispatchWeather, dispatchUpdate } from '@store/user/action';
import { computeDays } from '@utils/tools';
import request from '@utils/request';
import { WEATHER_TIPS } from '@constants/constant';

import './style.less'

@connect(({ user, home }) => ({ ...user, ...home }), { dispatchGetList, dispatchWeather, dispatchUpdate })
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentDidMount(){
    const { login: isLogin } = this.props;
    isLogin && this.props.dispatchGetList({ homeDisplay: 1 });
    this.initWeatherInfo();
  }
  
  onShareAppMessage () {
    return {
      title: '发现一个hin好玩的小程序！',
      imageUrl: 'https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/share.jpeg',
      path: 'pages/loading/index'
    }
  }

  goAnniversary = () => {
    Taro.navigateTo({
      url: '/pages/anniversary/index'
    })
  }
  addAnniversary = () => {
    Taro.navigateTo({
      url: '/pages/anniversary-edit/index'
    })
  }

  initWeatherInfo = async () => {
    const { userInfo: { user: { address: myAddress }, joinUser: { address: joinAddress } } } = this.props;
    const myWeather = await this.getWeather(myAddress);
    const joinWeather = await this.getWeather(joinAddress);
    this.props.dispatchWeather({ myWeather, joinWeather });
  }

  getWeather = (location) => {
    return request({ 
      url: `https://free-api.heweather.net/s6/weather/now`,
      method: 'GET',
      payload: {
        location,
        key: '5fe1e7efe30e43a2bb2eee4451913d2c'
      }
    })
  }

  getLocation = () => {
    Taro.getLocation({
      success: async (data) => {
        const { latitude, longitude } = data;
        const address  = latitude + ',' + longitude;
        this.props.dispatchUpdate({ address });
        this.props.dispatchWeather({ myWeather: await this.getWeather(address) });
      }
    })
  }

  render () {
    const { userInfo: { user, joinUser }, anniversaryList, weather: { myWeather = {}, joinWeather = {} } } = this.props;
    return (
      <View className='out-wrap'>
        <View className='mask'></View>
        <View className='index'>
          <View className='content-wrap'>
            <View className='top'>
              <View className='top-left'>
                <View className='img' style={{backgroundImage: `url(${user.headPortrait || ''})`}}></View>
                { myWeather.now ?
                  <View className='weather' style={{backgroundImage: `url(https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/cond/${myWeather.now.cond_code}.png)`}} >{`${myWeather.now.tmp}℃`}</View> :
                  <View className='weather no' onClick={this.getLocation}>获取天气</View>
                }
              </View>
              <View className='top-middle'>
                { joinWeather.now &&
                  <View className='text left'>{WEATHER_TIPS[Math.floor(joinWeather.now.tmp/5)]}</View>
                }
                { myWeather.now &&
                  <View className='text right'>{WEATHER_TIPS[Math.floor(myWeather.now.tmp/5)]}</View>
                }
              </View>
              { joinUser.headPortrait &&
                <View className='top-left'>
                  <View className='img' style={{backgroundImage: `url(${joinUser.headPortrait || ''})`}}></View>
                  { joinWeather.now ?
                    <View className='weather' style={{backgroundImage: `url(https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/cond/${joinWeather.now.cond_code}.png)`}} >{`${joinWeather.now.tmp}℃`}</View> :
                    <View className='weather no'>暂无天气</View>
                  }
                </View>
              }
            </View>
            <ScrollView className='scroll' scrollY>
              <View className='bottom'>
              { anniversaryList.map((ele, index) => (
                <View className='item' key={String(index)} onClick={this.goAnniversary} >
                  <View>
                    <View className='title'>{ ele.title }</View>
                    <View className='days'>{ computeDays({ target: ele.commemorationTime, isRepeat: ele.repeatTime }) }</View>
                  </View>
                  <View className='icon' style={{backgroundImage: `url(https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/type/${ele.dayType}.png)`}}></View>
                </View>
              ))
              }
              </View>
            </ScrollView>
            <View className='enchance' onClick={this.addAnniversary}>值得纪念</View>
          </View>
        </View>
      </View>
    )
  }
}

export default Index
