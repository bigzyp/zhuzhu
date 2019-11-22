import Taro, { Component } from '@tarojs/taro';
import { View, Input, Switch, Picker, Button, Form } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import * as actions from '@store/anniversary/action';
import { ANNIVERSARY_TYPE } from '@constants/constant';

import './style.less'

@connect(({ anniversary }) => ({ ...anniversary }), { ...actions })
class AnniversaryEdit extends Component {

  config = {
    navigationBarTitleText: '编辑纪念日'
  }

  constructor(props){
    super(props);
    const { commemorationDayId } = this.$router.params;
    const { anniversaryDetail } = props;
    this.state = {
      dayType: 0,
      commemorationTime: '2019-01-01',
      ...anniversaryDetail[commemorationDayId]
    }
  }

  onDateChange = e => {
    this.setState({
      commemorationTime: e.detail.value
    })
  }

  onChange = e => {
    this.setState({
      dayType: e.detail.value
    })
  }

  formSubmit = e => {
    const { value } = e.detail;
    const { commemorationDayId } = this.state;
    Taro.showLoading({
      title: '保存中～'
    })
    const submitFn = commemorationDayId ? this.props.dispatchUpdate : this.props.dispatchSave
    submitFn({ ...value }).then(() => {
      this.props.dispatchGetList().then(() => {
        Taro.navigateBack();
      })
    }).finally(() => {
      Taro.hideLoading();
    });
  }

  render () {
    const { 
      dayType, 
      commemorationTime,
      title,
      homeDisplay,
      repeatTime,
      detail
    } = this.state;
    return (
      <View className='anniversary-edit'>
        <Form onSubmit={this.formSubmit} >
          <Input name='title' className='title' placeholder='请输入标题' value={title} />
          <View className='item-wrap'>
            <View className='item'>
              <View className='label'>日期</View>
              <Picker name='commemorationTime' mode='date' onChange={this.onDateChange}>
                <View className='picker'>
                  { commemorationTime }
                </View>
              </Picker>
            </View>
            <View className='item'>
              <View className='label'>分类</View>
              <Picker name='dayType' mode='selector' range={ANNIVERSARY_TYPE} onChange={this.onChange}>
                <View className='picker'>
                  { ANNIVERSARY_TYPE[dayType] }
                </View>
              </Picker>
            </View>
            <View className='item'>
              <View className='label'>重复</View>
              <Switch name='repeatTime' checked={Boolean(repeatTime)} color='#f06292' />
            </View>
            <View className='item'>
              <View className='label'>首页展示</View>
              <Switch name='homeDisplay' checked={Boolean(homeDisplay)} color='#f06292' />
            </View>
            <View className='item'>
              <View className='label'>描述</View>
              <Input className='detail' name='detail' placeholder='请输入描述' value={detail} />
            </View>
          </View>
          <Button formType='submit'>保存</Button>
        </Form>
      </View>
    )
  }
}

export default AnniversaryEdit
