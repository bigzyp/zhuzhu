import Taro, { Component } from '@tarojs/taro';
import { View, Input, Switch, Picker, Button, Form, Image, Textarea } from '@tarojs/components';
import Modal from '@components/modal';
import { connect } from '@tarojs/redux';
import * as actions from '@store/wishes/action';
import { HOST_OSS, API_UPLOAD } from '@constants/api';

import './style.less'

@connect(({ wishes }) => (wishes), { ...actions })
class WishesEdit extends Component {

  constructor(props){
    super(props);
    const { wishDetail } = props;
    this.state = {
      myId: Taro.getStorageSync('userId'),
      showModal: false,
      wishTime: '2019-11-20',
      imgList: [],
      imgMax: 4,
      ...wishDetail
    }
  }

  config = {
    navigationBarTitleText: '编辑心愿'
  }

  componentDidMount(){
    const { id } = this.$router.params;
    if(id){
      Taro.showLoading();
      this.props.dispatchGetDetail({ wishBoxId: id }).then(() => {
        const { wishDetail } = this.props;
        this.setState({ ...wishDetail });
        Taro.hideLoading();
      })
    }
  }

  onDateChange = e => {
    const date = new Date(e.detail.value);
    this.setState({
      wishTime: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    })
  }

  formSubmit = e => {
    const { imgList, wishBoxId, myId } = this.state;
    const { value } = e.detail;
    const wishPic = [];
    let uploadedCnt = 0;
    imgList.forEach((ele) => {
      Taro.uploadFile({
        url: API_UPLOAD,
        name: 'file',
        filePath: ele,
        formData: {
          'userId': myId
        }
      }).then((res) => {
        uploadedCnt++;
        wishPic.push(HOST_OSS+res.data);
        if(uploadedCnt === imgList.length) {
          value.wishPic = wishPic.join(',');
          value.homeDisplay = Number(value.homeDisplay);
          value.wishSuccess = Number(value.wishSuccess);
          value.state = value.state? 3 : 1;
          value.wishTime = new Date(value.wishTime).getTime();
          this.props.dispatchUpdate({ wishBoxId, ...value }).then(() => {
            Taro.navigateBack();
          });
        }
      })
    })
  }

  deleteImage = index => {
    const { imgList } = this.state;
    imgList.splice(index, 1);
    this.setState({ imgList });
  }

  chooseImage = () => {
    let { imgList, imgMax } = this.state;
    const count = imgMax - imgList.length;
    Taro.chooseImage({ count, sizeType: 'compressed' }).then(data => {
      const { tempFilePaths } = data;
      imgList = imgList.concat(tempFilePaths);
      this.setState({ imgList })
    })
  }

  previewImage = index => {
    const { imgList } = this.state;
    Taro.previewImage({
      urls: imgList,
      current: `urls[${index}]`
    })
  }

  showModal = () => {
    this.setState({ showModal: true });
  }
  hideModal = () => {
    this.setState({ showModal: false });
  }

  delete = () => {
    const { wishBoxId } = this.state;
    this.hideModal();
    Taro.showLoading({
      title: '删除中～'
    })
    this.props.dispatchUpdate({
      wishBoxId,
      state: 2
    }).then(() => {
      Taro.navigateBack();
    }).finally(() => {
      Taro.hideLoading();
    });
  }

  render () {
    const {
      myId,
      userId,
      showModal,
      wishAddress,
      imgList = [],
      wishName,
      detail,
      homeDisplay,
      wishTime,
      wishSuccess,
      state
    } = this.state;
    const date = new Date(wishTime);
    return (
      <View className='wishes-edit'>
        <Form onSubmit={this.formSubmit} >
          <Input name='wishName' className='title' placeholder='请输入标题' value={wishName} />
          <View className='item-wrap'>
            <View className='item image-wrap'>
              <View className='label'>以图为证</View>
              <View className='wrap'>
                { imgList.map((ele, index) => (
                    <View className='image' key={String(index)}>
                      <View className='delete' onClick={this.deleteImage.bind(this, index)}>×</View>
                      <Image src={ele} mode='aspectFill' onClick={this.previewImage.bind(this, index)} />
                    </View>
                  ))
                }
                { imgList.length !== 4 && 
                  <Image 
                    className='add' 
                    src='https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/addimage.png'
                    onClick={this.chooseImage}
                  />
                }
              </View>
            </View>
            <View className='item flex'>
              <View className='label'>啥时候完成der</View>
              <Picker name='wishDate' mode='date' onChange={this.onDateChange}>
                <View className='picker'>
                  { `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` }
                </View>
              </Picker>
            </View>
            <View className='item'>
              <View className='label'>哪里完成der</View>
              <Input name='wishAddress' className='where' placeholder='请输入地点' value={wishAddress} />
            </View>
            <View className='item'>
              <View className='label'>瞎说一句当时的心情</View>
              <Textarea name='detail' className='desc' placeholder='请输入描述' value={detail} />
            </View>
            <View className='item flex'>
              <View className='label'>心愿盒推荐</View>
              <Switch name='homeDisplay' color='#f06292' checked={homeDisplay} />
            </View>
            <View className='item flex'>
              <View className='label'>是否完成</View>
              <Switch name='wishSuccess' color='#f06292' checked={wishSuccess} />
            </View>
            { userId === myId &&
              <View className='item flex'>
                <View className='label'>不让TA看</View>
                <Switch name='state' color='#f06292' checked={state === 3} />
              </View>
            }
          </View>
          {userId === myId && <View className='delete' onClick={this.showModal}>删除心愿</View>}
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

export default WishesEdit
