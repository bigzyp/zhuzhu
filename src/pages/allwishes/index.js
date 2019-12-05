import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import Modal from '@components/modal';
import { AtProgress } from 'taro-ui';
import { connect } from '@tarojs/redux';
import * as acitons from '@store/wishes/action';

import './style.less'

@connect(({ wishes }) => (wishes), {...acitons})
class Allwishes extends Component {

  config = {
    navigationBarTitleText: '心愿宝盒'
  }
  state = {
    showModal: false
  }

  componentDidShow () {
    
  }

  toEdit = (wishBoxId) => {
    Taro.showLoading();
    this.props.dispatchGetDetail({ wishBoxId }).then(() => {
      Taro.hideLoading();
      Taro.navigateTo({
        url: '/pages/wishes-edit/index?id=' + wishBoxId
      })
    })
  }

  addWishes = (wishName) => {
    if(wishName.length){
      this.props.dispatchSave({ wishName })
    }
  }

  showModal = () => {
    this.setState({ showModal: true });
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  render () {
    const { showModal } = this.state;
    const { wishBoxList, wishSuccessNum, wishTotalNum } = this.props;
    return (
      <View className='allwishes'>
        <View className='mask'></View>
        <View className='content-wrap'>
          <View className='progress_wrap'>
            <View className='text'>当前心愿进度：</View>
            <AtProgress
              className='progress_bar'
              percent={wishSuccessNum/wishTotalNum*100}
              color='#f06292'
              strokeWidth={10}
              isHidePercent
            />
            <View className='progress'>{wishSuccessNum+ '/' +wishTotalNum}</View>
          </View>
          <View className='list'>
            { wishBoxList.map((ele, index) => (
              <View className='section'
                key={String(index)}
                style={{backgroundImage: `url(${ele.wishPic})`}}
                onClick={this.toEdit.bind(this, ele.wishBoxId)}
              >
                <View className='mask'></View>
                <View className='text'>{ele.wishName}</View>
              </View>
            ))

            }
            <View className='section add'>
              <View className='mask'></View>
              <Image
                src='https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/add.png'
                onClick={this.showModal}
              />
            </View>
          </View>
        </View>
        {!!showModal && 
          <Modal
            type='prompt'
            title='有个心愿放进宝盒'
            cancelText='不放啦'
            confirmText='好啦'
            onConfirm={this.addWishes}
            onCancel={this.hideModal}
          />
        }
      </View>
    )
  }
}

export default Allwishes
