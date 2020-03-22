<template>
	<view class="video-list page">
		<view class="list">
			<view v-for="item in list" :key="item._id" class="item" @click="toVideo(item.url)">
				<image class="img" :src="item.img" mode="aspectFill"></image>
				<view class="desc">
					{{item.desc}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const db = wx.cloud.database()
	export default {
		data() {
			return {
				list: []
			};
		},
		methods: {
			toVideo(url) {
				this.$store.commit('changeVideoUrl', url)
				uni.navigateTo({
					url: '../video/video',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			
			async getList() {
				try{
					let res = await db.collection('videos').get()
					this.list = res.data
				}catch(e){
					console.log(e)
				}
			}
		},
		onLoad() {
			this.getList()
		}
	}
</script>

<style lang="stylus">
@import '../../uni.styl';	
.video-list {
	height: 100vh;
	.list {
		height: 100%;
		background: rgba(255, 255, 255, 1);
		overflow: auto;
		.item {
			padding: 80upx auto 40upx;
			height: 600upx;
			border-bottom: 1upx dashed $uni-border-color;
			margin-bottom: 40upx;
			.img {
				display: block;
				width: 100%;
				height: 520upx;
			}
			.desc {
				font-size: 40upx;
				color: $uni-text-color-muted;
				text-align: center;
				line-height: 80upx;
			}
		}
	}
	
}
</style>
