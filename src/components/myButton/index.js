import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

import './style.less'

export default class MyBotton extends Component {
	state = {
		uglyHair: ''
	}
	componentDidMount(){
		Taro.getSystemInfo().then(res => {
			if(res.model.indexOf('iPhone X') >= 0 || res.model.indexOf('iPhone 11') >= 0) {
				this.setState({ uglyHair: 'ugly' })
			}
		})
	}
	handleClick = () => {
		this.props.onClick();
	}
	render () {
		const { text = '保存', style={} } = this.props;
		const { uglyHair } = this.state;
		return (
			<View className={`my-button ${uglyHair}`} style={{...style}} onClick={this.handleClick}>
				<Button>{text}</Button>
			</View>
		)
	}
}
