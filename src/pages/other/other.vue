<template>
	<view class="other page">
		<view class="list" v-for="item in list" :key="item._id">
			<view class="item">
				<view class="result">
					得分：{{item.score}}, 答对了{{item.correct}}道题
				</view>
				<view class="time">
					交卷时间： {{item.time.toLocaleString()}}
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
				list: [],
			};
		},

		methods: {
			async getList() {
				try{
					let res = await db.collection('history').where({
						account: this.$store.state.user.account
					}).get()
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
.other {
	background: rgba(225, 225, 255, 0.75); 
	min-height: 100vh;
	.item {
		margin-bottom: 20upx;
		background: #fff;
		height: 200upx;
		border-bottom: 1upx dashed $uni-border-color;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 20upx;
		.result {
			font-size: 52upx;
			color: $uni-text-color-muted;
		}
		.time {
			font-size: 36upx;
			color: $uni-text-color-grey;
			margin-top: 40upx;
		}
	}
}
</style>
