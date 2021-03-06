import Taro, { Component } from '@tarojs/taro';
import { View, Input, Switch, Picker, Button, Form } from '@tarojs/components';
import Modal from '@components/modal';
import { connect } from '@tarojs/redux';
import * as actions from '@store/anniversary/action';
import { ANNIVERSARY_TYPE } from '@constants/constant';
import dayjs from 'dayjs';

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
      showModal: false,
      dayType: 0,
      ...anniversaryDetail[commemorationDayId]
    }
  }
  onDateChange = e => {
    const date = new Date(e.detail.value);
    this.setState({
      commemorationTime: new Date(date).getTime()
    })
  }
  
  onChange = e => {
    this.setState({
      dayType: e.detail.value
    })
  }
  showModal = () => {
    this.setState({ showModal: true });
  }
  hideModal = () => {
    this.setState({ showModal: false });
  }

  formSubmit = e => {
    const { value } = e.detail;
    const { commemorationDayId } = this.state;
    value.homeDisplay = Number(value.homeDisplay);
    value.repeatTime = Number(value.repeatTime);
    value.commemorationTime = dayjs(value.commemorationTime).format('YYYY-MM-DD');
    Taro.showLoading({
      title: '保存中～'
    })
    const submitFn = commemorationDayId ? this.props.dispatchUpdate : this.props.dispatchSave
    submitFn({ ...value, commemorationDayId }).then(() => {
      Taro.navigateBack();
    }).finally(() => {
      Taro.hideLoading();
    });
  }

  delete = () => {
    const { commemorationDayId } = this.state;
    this.hideModal();
    Taro.showLoading({
      title: '删除中～'
    })
    this.props.dispatchUpdate({
      commemorationDayId,
      state: 2
    }).then(() => {
      Taro.navigateBack();
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
      detail,
      commemorationDayId,
      showModal
    } = this.state;
    const date = dayjs(commemorationTime).format('YYYY-MM-DD');
    return (
      <View className='anniversary-edit'>
        <Form onSubmit={this.formSubmit} >
          <Input name='title' className='title' placeholder='请输入标题' value={title} />
          <View className='item-wrap'>
            <View className='item'>
              <View className='label'>日期</View>
              <Picker name='commemorationTime' mode='date' value={date} onChange={this.onDateChange}>
                <View className='picker'>{date}</View>
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
          {commemorationDayId && <View className='delete' onClick={this.showModal}>删除纪念日</View>}
          <Button className='btn-save' formType='submit'>保存</Button>
        </Form>
        {!!showModal && 
          <Modal
            text='确定删除这个纪念日咩？'
            cancelText='取消'
            confirmText='删掉'
            onConfirm={this.delete}
            onCancel={this.hideModal}
          />
        }
      </View>
    )
  }
}

export default AnniversaryEdit
