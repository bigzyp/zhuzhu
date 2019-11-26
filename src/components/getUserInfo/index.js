import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as acitons from '@store/user/action'

import './style.less'

@connect(({ user }) => (user), {...acitons})
export default class GetUserInfo extends Component {
	getUserInfo = (e) => {
		const { userInfo } = e.detail;
		const { loginOptions = {} } = this.props;
		let loginFn =  this.props.dispatchLogin;
		if(loginOptions.refereeId) loginFn = this.props.dispatchInvite;
		Taro.showLoading({
			title: '登录中...'
		})
		Taro.login({
			success: (data) => {
				loginFn({
					...loginOptions,
					code: data.code,
					nickname: userInfo.nickName,
					headPortrait: userInfo.avatarUrl,
					sex: userInfo.gender
				}).then((res) => {
					this.props.onLoginBack(res)
					setTimeout(() => {
						Taro.showToast({
							title: '登录成功'
						})
					}, 500)
				}).finally(() => {
					Taro.hideLoading()
				})
			},
			fail: (data) => {
				console.log(data)
			}
		})
	}
	render () {
		return (
			<View className='mask'>
				<View className='auto_box'>
					<View className='auto_t1'>您还未登录</View>
					<View className='aoto_t2'>请先登录进行操作</View>
					<View className='btn_box'>
						<View className='auto_cancel' onClick={this.props.onCancle}>暂不登录</View>
						<Button className='auto_sure' open-type='getUserInfo' onGetUserInfo={this.getUserInfo} >立即登录</Button>
					</View>
				</View>
			</View>
		)
	}
}
