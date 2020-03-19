<template>
	<view class="login page">
		<view class="login-box">
			<view class="title text-center">
				安全培训系统
			</view>
			<view class="row">
				
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
				
			};
		}
	}
</script>

<style lang="stylus">	
@import '../../uni.styl';
.login {
	color: #ffffff;
	.title {
		font-size: 64upx;
		padding: 40upx 0;
	}
	.row {
		width: 80%;
		height: 40upx;
		border-radius: 40upx;
		margin: 20upx auto;
		background: #ffffff;
		position: relative;
	}
}
</style>
