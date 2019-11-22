import Taro, { Component } from '@tarojs/taro'
import { View, Input, Switch, Picker, Button, Form, Image } from '@tarojs/components'

import './style.less'

class WishesEdit extends Component {

  config = {
    navigationBarTitleText: '编辑心愿'
  }

  state = {
    dateSel: '2019-11-20',
    imgList: [],
    imgMax: 4
  }

  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }

  formSubmit = e => {
    const { imgList } = this.state;
    const { value } = e.detail;
    value.imgList = imgList;
    console.log(value)
  }

  deleteImage = index => {
    const { imgList } = this.state;
    imgList.splice(index, 1);
    this.setState({ imgList });
  }

  chooseImage = () => {
    let { imgList, imgMax } = this.state;
    const count = imgMax - imgList.length;
    Taro.chooseImage({ count }).then(data => {
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

  render () {
    const { imgList } = this.state;
    return (
      <View className='wishes-edit'>
        <Form onSubmit={this.formSubmit} >
          <Input name='title' className='title' placeholder='请输入标题' />
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
            <View className='item'>
              <View className='label'>瞎说一句当时的心情</View>
              <Input name='describe' className='desc' placeholder='请输入描述' />
            </View>
            <View className='item'>
              <View className='label'>啥时候完成der</View>
              <Input name='where' className='where' placeholder='请输入地点' />
            </View>
            <View className='item flex'>
              <View className='label'>啥时候完成der</View>
              <Picker name='date' mode='date' onChange={this.onDateChange}>
                <View className='picker'>
                  {this.state.dateSel}
                </View>
              </Picker>
            </View>
            <View className='item flex'>
              <View className='label'>心愿盒推荐</View>
              <Switch name='isHome' color='#f06292' />
            </View>
          </View>
          <Button formType='submit'>保存</Button>
        </Form>
      </View>
    )
  }
}

export default WishesEdit
