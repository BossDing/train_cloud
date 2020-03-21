<template>
	<view class="result page">
		<view class="result-wapper">
			<view class="title">
				得分：{{score}}
			</view>
			<view class="desc">
				共{{limit}}题，你答对了{{corrects}}道
			</view>
		</view>
		<view class="btn-wrapper">
			<button type="default" @click="jump('../special/special')">
				再练一次
			</button>
			<button type="primary" @click="jump('../index/index')">
				返回首页
			</button>
		</view>
	</view>
</template>

<script>
	import { limit } from '../../constants/const.js'
	export default {
		data() {
			return {
				corrects: 0,
				limit
			};
		},
		computed: {
			score() {
				return 100 / limit * this.corrects
			}
		},
		methods: {
			jump(url) {
				uni.reLaunch({
					url,
				})
				
			}
		},
		onLoad(opt) {
			this.corrects = opt.corrects
		}
	}
</script>

<style lang="stylus">
@import '../../uni.styl';	
.result {
	height: 100vh;
	position: relative;
	.result-wapper {
		height: 100vh;
		background: rgba(255, 255, 255, 0.85);
	}
	.title {
		color: $uni-color-primary;
		height: 200upx;
		line-height: 200upx;
		box-sizing: border-box;
		text-align: center;
		font-size: 80upx;
	}
	.desc {
		color: $uni-color-primary;
		height: 200upx;
		line-height: 200upx;
		box-sizing: border-box;
		text-align: center;
		font-size: 64upx;
		margin: 80upx auto;
	}
		
	.btn-wrapper {
		display: flex;
		justify-content: center;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 40upx;
		z-index: 1;
	}
}
</style>
