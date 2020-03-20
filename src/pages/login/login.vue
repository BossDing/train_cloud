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
				<input type="password" v-model="form.password" placeholder="请输入密码" class="input"/>
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
	background: url(https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1584672785&di=73c510559b4f28b5ee5f01c7a7418e94&src=http://img.jk51.com/img_jk51/330795344.jpeg) center center no-repeat;
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
