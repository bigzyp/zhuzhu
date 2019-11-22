import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import Modal from '@components/modal';
import { connect } from '@tarojs/redux';
import * as acitons from '@store/user/action';

import './style.less'

@connect(({ user }) => (user), {...acitons})
class Allwishes extends Component {

  config = {
    navigationBarTitleText: '心愿宝盒'
  }
  state = {
    showModal: false,
    wishesList: [
      {
        title: '一起去吃河马先生',
        id: 1
      },
      {
        title: '一起去吃大象先生',
        id: 2
      },
      {
        title: '一起去吃绵羊小姐',
        id: 3
      }
    ]
  }

  componentDidShow () {
    
  }
  toEdit = id => {
    Taro.navigateTo({
      url: '/pages/wishes-edit/index?id=' + id
    })
  }
  addWishes = (value) => {
    const { wishesList } = this.state;
    if(value.length){
      wishesList.push({title: value, id: 9});
      this.setState({ wishesList, showModal: false });
    }
  }
  showModal = () => {
    this.setState({ showModal: true });
  }
  hideModal = () => {
    this.setState({ showModal: false });
  }

  render () {
    const { showModal, wishesList } = this.state;
    return (
      <View className='allwishes'>
        <View className='mask'></View>
        <View className='content-wrap'>
          <View className='progress_wrap'>
            <View className='text'>当前心愿进度：</View>
            <View className='progress_bar'>
              <View className='done'>12</View>
              <View className='total'>99</View>
            </View>
          </View>
          <View className='list'>
            { wishesList.map((ele, index) => (
              <View className='section' key={String(index)} onClick={this.toEdit.bind(this, ele.id)}>
                <View className='mask'></View>
                <View className='text'>{ele.title}</View>
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
