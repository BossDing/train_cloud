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
			        <navigator url="../special/special?type=pratice" class="nav">
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
				    		安排抽考
				    	</view>
				    </navigator>
				</uni-grid-item>
				<uni-grid-item v-if="$store.state.user.permissions.includes(2)" class="gird-item">
				    <navigator url="../special/special?type=exam" class="nav">
				    	<view class="icon-wrapper">
				    		<image class="icon" src="/static/img/integral.png" mode="aspectFit"></image>
				    	</view>
				    	<view class="nav-txt">
				    		新试卷
				    	</view>
						<text class="tip">{{hasNew ? '(您有新试卷)' : '(暂无新试卷)'}} </text>
						
				    </navigator>
					<view v-show="!hasNew" class="cover" @click="showTip">
						
					</view>
				</uni-grid-item>
				<uni-grid-item>
				    <navigator url="../other/other" class="nav">
				    	<view class="icon-wrapper">
				    		<image class="icon" src="/static/img/other.png" mode="aspectFit"></image>
				    	</view>
				    	<view class="nav-txt">
				    		答卷历史
				    	</view>
				    </navigator>
				</uni-grid-item>
			</uni-grid>
		</view>
		
	</view>
</template>

<script>
	const db = wx.cloud.database()
	import { uniGrid, uniGridItem } from '@dcloudio/uni-ui'
	export default {
		components: {
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				hasNew: false,
			}
		},
		onLoad() {
			this.getExam()
		},
		methods: {
			showTip() {
				uni.showToast({
					icon: 'none',
					title: '你暂无新试卷要做',
					duration: 1000
				})
			},
			
			async getExam() {
				let { data } = await db.collection('exam').where({
					account: this.$store.state.user.account
				}).get()
				if (data.length) {
					let accounts = data.map(item => item.account)
					this.hasNew = accounts.includes(this.$store.state.user.account)
				} else {
					this.hasNew = false
				}
				
			}
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
	.gird-item {
		position: relative;
		.cover {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1;
			background: rgba(255, 255, 255, 0.3);
		}
	}
	.nav {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: rgba(255, 255, 255, 0.8);
		position: relative;
		.tip {
			position: absolute;
			text-align: center;
			bottom: 10upx;
			color: $uni-text-color-grey;
			font-size: 24upx;
		}
		.icon {
			width: 80upx;
			height: 80upx;
		}
		
	}
}


</style>
