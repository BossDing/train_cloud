<template>
	<view class="index page">
		<!-- 一般用法 -->
		<view class="grid-wrapper">
			<uni-grid :column="3">
			    <uni-grid-item>
			        <navigator url="../videoList/videoList" class="nav">
						<view class="icon-wrapper">
							<image class="icon" src="/static/img/video.png" mode="aspectFit"></image>
						</view>
						<view class="nav-txt">
							视频课程
						</view>
					</navigator>
			    </uni-grid-item>
			    <uni-grid-item>
			        <navigator url="../bank/bank" class="nav">
			        	<view class="icon-wrapper">
			        		<image class="icon" src="/static/img/bank.png" mode="aspectFit"></image>
			        	</view>
			        	<view class="nav-txt">
			        		考试题库
			        	</view>
			        </navigator>
			    </uni-grid-item>
			    <uni-grid-item>
			        <navigator url="../special/special" class="nav">
			        	<view class="icon-wrapper">
			        		<image class="icon" src="/static/img/special.png" mode="aspectFit"></image>
			        	</view>
			        	<view class="nav-txt">
			        		专题练习
			        	</view>
			        </navigator>
			    </uni-grid-item>
				<uni-grid-item v-if="$store.state.user.permissions.includes(0)">
				    <navigator url="../archives/archives" class="nav">
						<view class="icon-wrapper">
							<image class="icon" src="/static/img/archives.png" mode="aspectFit"></image>
						</view>
						<view class="nav-txt">
							管理档案
						</view>
					</navigator>
				</uni-grid-item>
				<uni-grid-item v-if="$store.state.user.permissions.includes(1)">
				    <navigator url="../superior/superior" class="nav">
				    	<view class="icon-wrapper">
				    		<image class="icon" src="/static/img/superior.png" mode="aspectFit"></image>
				    	</view>
				    	<view class="nav-txt">
				    		上级抽考
				    	</view>
				    </navigator>
				</uni-grid-item>
				<uni-grid-item>
				    <navigator url="../other/other" class="nav">
				    	<view class="icon-wrapper">
				    		<image class="icon" src="/static/img/other.png" mode="aspectFit"></image>
				    	</view>
				    	<view class="nav-txt">
				    		查看历史练习
				    	</view>
				    </navigator>
				</uni-grid-item>
			</uni-grid>
		</view>
		
	</view>
</template>

<script>
	import { uniGrid, uniGridItem } from '@dcloudio/uni-ui'
	export default {
		components: {
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="stylus">
@import '../../uni.styl';
.index {	
	display: flex;
	align-items: flex-end;
	height: 100vh;
	.grid-wrapper {
		width: 100vw;
		height: auto;
	}
	.nav {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: rgba(255, 255, 255, 0.8);
		.icon {
			width: 80upx;
			height: 80upx;
		}
	}
}


</style>
