import Taro, { Component } from '@tarojs/taro';
import { View, Input, Switch, Picker, Button, Form, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { dispatchSave, dispatchUpdate } from '@store/wishes/action';

import './style.less'

@connect(({ wishes }) => (wishes), { dispatchSave, dispatchUpdate })
class WishesEdit extends Component {

  constructor(props){
    super(props);
    this.state = {
      wishDate: '2019-11-20',
      imgMax: 4,
      ...props.wishesDetail
    }
  }

  config = {
    navigationBarTitleText: '编辑心愿'
  }

  componentDidMount(){

  }

  onDateChange = e => {
    this.setState({
      wishDate: e.detail.value
    })
  }

  formSubmit = e => {
    const { wishPic, wishBoxId } = this.state;
    const { value } = e.detail;
    value.wishPic = wishPic;
    value.isHomeDisplay = Number(value.isHomeDisplay);
    this.props.dispatchUpdate({ wishBoxId, wishName: '测试更新' });
  }

  deleteImage = index => {
    const { wishPic } = this.state;
    wishPic.splice(index, 1);
    this.setState({ wishPic });
  }

  chooseImage = () => {
    let { wishPic, imgMax } = this.state;
    const count = imgMax - wishPic.length;
    Taro.chooseImage({ count }).then(data => {
      const { tempFilePaths } = data;
      wishPic = wishPic.concat(tempFilePaths);
      this.setState({ wishPic })
    })
  }

  previewImage = index => {
    const { wishPic } = this.state;
    Taro.previewImage({
      urls: wishPic,
      current: `urls[${index}]`
    })
  }

  render () {
    const {
      wishAddress,
      wishPic = [],
      wishName,
      detail,
      isHomeDisplay,
      wishDate
    } = this.state;
    return (
      <View className='wishes-edit'>
        <Form onSubmit={this.formSubmit} >
          <Input name='wishName' className='title' placeholder='请输入标题' value={wishName} />
          <View className='item-wrap'>
            <View className='item image-wrap'>
              <View className='label'>以图为证</View>
              <View className='wrap'>
                { wishPic.map((ele, index) => (
                    <View className='image' key={String(index)}>
                      <View className='delete' onClick={this.deleteImage.bind(this, index)}>×</View>
                      <Image src={ele} mode='aspectFill' onClick={this.previewImage.bind(this, index)} />
                    </View>
                  ))
                }
                { wishPic.length !== 4 && 
                  <Image 
                    className='add' 
                    src='https://ac-dev.oss-cn-hangzhou.aliyuncs.com/20190231/test/addimage.png'
                    onClick={this.chooseImage}
                  />
                }
              </View>
            </View>
            <View className='item'>
              <View className='label'>瞎说一句当时的心情</View>
              <Input name='detail' className='desc' placeholder='请输入描述' value={detail} />
            </View>
            <View className='item'>
              <View className='label'>啥时候完成der</View>
              <Input name='wishAddress' className='where' placeholder='请输入地点' value={wishAddress} />
            </View>
            <View className='item flex'>
              <View className='label'>啥时候完成der</View>
              <Picker name='wishDate' mode='date' onChange={this.onDateChange}>
                <View className='picker'>
                  {wishDate}
                </View>
              </Picker>
            </View>
            <View className='item flex'>
              <View className='label'>心愿盒推荐</View>
              <Switch name='isHomeDisplay' color='#f06292' checked={isHomeDisplay} />
            </View>
          </View>
          <Button formType='submit'>保存</Button>
        </Form>
      </View>
    )
  }
}

export default WishesEdit
