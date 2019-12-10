import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { dispatchWishesList } from '@store/home/action';
import GetUserInfo from '@components/getUserInfo';

import './style.less';

@connect(({ home }) => (home), { dispatchWishesList })
class Wishes extends Component {

  config = {
    navigationBarTitleText: '心愿盒'
  }
  state = {
    current: 0,
    showGetPhone: false
  }

  
  onShareAppMessage () {
    const { wishesList } = this.props;
    const { current } = this.state;
    return {
      title: `“${wishesList[current].wishName}”心愿达成～～～`,
      imageUrl: wishesList[current].wishPic,
      path: `pages/wishes-edit/index?id=${wishesList[current].wishBoxId}`
    }
  }
  
  componentDidShow () {
    this.props.dispatchWishesList({ homeDisplay: 1 });
  }

  handleSwip = (e) => {
    const { current } = e.detail;
    this.setState({ current });
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
  goAllwishes = () => {
    Taro.navigateTo({
      url: '/pages/allwishes/index'
    })
  }
  goEdit = (wishBoxId) => {
    Taro.navigateTo({
      url: '/pages/wishes-edit/index?id='+wishBoxId
    })
  }

  updateWishes = () => {
    const { current } = this.state;
    const { wishesList } = this.props;
    const { wishBoxId } = wishesList[current];
    this.props.dispatchUpdate({ wishBoxId, state: 3 });
    this.hideModal();
  }

  render () {
    const { showGetPhone } = this.state;
    const { wishesList } = this.props;
    console.log(this.props)
    return (
      <View className='wishes'>
        {!!showGetPhone && <GetUserInfo onCancle={this.hideGetPhone} onConfirm={this.getUserInfo} />}
        <View className='mask'></View>
        <Swiper
          className='swiper_wrap'
          onChange={this.handleSwip}
        >
        {wishesList.map((ele, index) => (
          <SwiperItem key={String(index)}>
            <View className='section section1'>
              <View className='box' onClick={this.goEdit.bind(this, ele.wishBoxId)}>
                <View className='card top' style={{backgroundImage: `url(${ele.wishPic.split(',')[index]})`}}></View>
                <View className='text title'>{ele.wishName}</View>
                <View className='text desc'>{ele.detail}</View>
                {/* <Image className='btn_status add' src={ele.wishPic} /> */}
              </View>
              <Button className='btn share' openType='share' >撒狗粮～</Button>
            </View>
          </SwiperItem>
        ))
        }
      </Swiper>
        <View className='enchance' onClick={this.goAllwishes}>心愿宝盒</View>
      </View>
    )
  }
}

export default Wishes
