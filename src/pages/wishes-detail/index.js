import Taro, { Component } from '@tarojs/taro';
import { View, Image, Button} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { dispatchGetDetail } from '@store/wishes/action';

import './style.less';

@connect(({ wishes }) => (wishes), { dispatchGetDetail })
class WishesDetail extends Component {

  config = {
    navigationBarTitleText: '心愿详情'
  }

  componentDidMount () {
    const { id } = this.$router.params;
    Taro.showLoading();
    this.props.dispatchGetDetail({ wishBoxId: id }).then(() => {
      const { wishDetail } = this.props;
      this.setState({ ...wishDetail });
      Taro.hideLoading();
    })
  }

  onShareAppMessage () {
    const { wishBoxList } = this.props;
    const { current } = this.state;
    return {
      title: `“${wishBoxList[current].wishName}”心愿达成～～～`,
      imageUrl: wishBoxList[current].wishPic.split(',')[0],
      path: `pages/wishes-edit/index?id=${wishBoxList[current].wishBoxId}`
    }
  }

  goEdit = () => {
    Taro.navigateTo({ url: '/pages/wishes-edit/index' });
  }

  render () {
    const {
      wishName,
      wishPic = '',
      wishTime,
      wishAddress
    } = this.state;
    const date = new Date(wishTime);
    return (
      <View className='wishes-detail'>
        <View className='wishName'>{wishName}</View>
        <View className='wishDate'>
        { `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` }
        </View>
        <View className='wishAddress'>{wishAddress}</View>
        <View className='wishPic'>
          {
            wishPic.split(',').map((ele, index) => (
              <Image
                className='img' 
                key={String(index)}
                src={ele}
              />
            ))
          }
        </View>
        <Button onClick={this.goEdit} >编辑</Button>
      </View>
    )
  }
}

export default WishesDetail
