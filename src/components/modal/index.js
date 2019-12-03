import Taro, { Component } from '@tarojs/taro'
import { View, Input, Button } from '@tarojs/components'

import './style.less'

export default class Modal extends Component {
	state = {
		value: ''
	}
	inputChange = (e) => {
		const { value } = e.detail;
		this.setState({ value })
	}
	render () {
		const {
			title = '提示',
			text,
			type,
			confirmText = '确认',
			cancelText,
			onConfirm,
			onCancel
		} = this.props;
		const { value } = this.state;
		return (
			<View className='modal_box'>
				<View className='auto_t1'>{ title }</View>
				<View className='aoto_t2'>{ text }</View>
				{ type === 'prompt' && <Input onInput={this.inputChange} maxLength='10' />}
				<View className='btn_box'>
					{ cancelText && <View className='auto_cancel' onClick={() => {onCancel && onCancel()}}>{ cancelText }</View>}
					<Button className='auto_sure' onClick={() => {onConfirm && onConfirm(value)}} >{ confirmText }</Button>
				</View>
			</View>
		)
	}
}
