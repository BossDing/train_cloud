<template>
	<view class="login page">
		<view class="login-box">
			<view class="title text-center">
				安全培训系统
			</view>
			<view class="row">
				<uni-icons type="contact" size="30" class="icon"></uni-icons>
				<input type="text" v-model="form.account" placeholder="请输入工号" class="input"/>
			</view>
			<view class="row">
				<uni-icons type="locked" size="30" class="icon"></uni-icons>
				<input type="text" v-model="form.password" placeholder="请输入密码" class="input"/>
			</view>
			<view class="btn">
				 <button type="primary" block @click="submit">登录</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {uniIcons} from '@dcloudio/uni-ui'
	export default {
		components: {uniIcons},
		data() {
			return {
				form: {
					account: '',
					password: ''
				},
				
			};
		},
		methods: {
			submit() {
				let {account, password} = this.form
				
				if ([account, password].includes('')) {
					this.showTip()
				} else {
					wx.cloud.callFunction({
					  name: 'login',
					  data: this.form
					}).then(res => {
						if (res.result.code === 0) {
							uni.navigateTo({
								url: '../index/index'
							})
						} else {
							this.showTip()
						}
					})
					
				}
			},
			showTip() {
				uni.showToast({
					icon: 'none',
					title: '工号或密码不正确',
					duration: 1000
				})
			}
		},
		mounted() {
			
		}
	}
</script>

<style lang="stylus">	
@import '../../uni.styl';
.login {
	color: #ffffff;
	background: url(https://cccodedu.oss-cn-shanghai.aliyuncs.com/upload/image/202003/login_bg.jpg) center center no-repeat;
	background-size: cover; 
	.title {
		font-size: 64upx;
		padding: 60upx 0 20vh;
		text-shadow: 0 0 20upx 20upx $uni-text-color;
	}
	.row {
		width: 80%;
		height: 80upx;
		border-radius: 80upx;
		margin: 40upx auto;
		background: #ffffff;
		position: relative;
		.icon {
			position: absolute;
			top: 10upx;
			left: 10upx;
		}
		.input {
			display: block;
			height: 80upx;
			position absolute;
			top: 0;
			left: 80upx;
			right: 20upx;
			bottom: 0;
			font-size: 36upx;
			color: $uni-text-color-muted;
		}
	}
	.btn {
		width: 80%;
		margin: 120upx auto 0;
		.login-btn {
			background: uni-bg-color-primary;
		}
	}
}
</style>
