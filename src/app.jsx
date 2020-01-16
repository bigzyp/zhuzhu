import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss';
import Index from './pages/index/index'
import configStore from './store'

import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// 初始化 SDK版本 
// Bmob.initialize('aed6ee1814710b30', 'zhuzhu');

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/loading/index',
      'pages/index/index',
      'pages/wishes/index',
      'pages/user/index',
      'pages/allwishes/index',
      'pages/anniversary/index',
      'pages/anniversary-edit/index',
      'pages/wishes-edit/index',
      'pages/wishes-detail/index',
      'pages/login/index',
      'pages/login-username/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#8c8c8c',
      selectedColor: '#f06292',
      borderStyle: 'black',
      backgroundColor: '#fff',
      list: [
          {
            text: 'Ing',
            pagePath: 'pages/index/index',
            iconPath: './statics/images/index_gray.png',
            selectedIconPath: './statics/images/index.png'
          },
          {
            text: '心愿盒',
            pagePath: 'pages/wishes/index',
            iconPath: './statics/images/wishes_gray.png',
            selectedIconPath: './statics/images/wishes.png'
          },
          {
            text: '我啊',
            pagePath: 'pages/user/index',
            iconPath: './statics/images/mine_gray.png',
            selectedIconPath: './statics/images/mine.png'
          }
      ]
    },
    permission: {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序位置接口的效果展示"
      }
    }
  }

  componentDidMount(){
    Taro.setStorage({ key: 'systemInfo', data: Taro.getSystemInfoSync() });
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
