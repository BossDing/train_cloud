<template>
	<view class="integral">
		<view v-for="item in list" :key="item._id" class="staff">
			<view class="header">
				<view class="avatar">
					<image class="img" :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="name">
					姓名： {{item.name}}
				</view>
			</view>
			<view class="info">
				<view class="account">
					成绩：{{item.score}} 分
				</view>
				<view class="account">
					一共答对：{{item.correct}} 题
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const db = wx.cloud.database()
	import {uniIcons} from '@dcloudio/uni-ui'
	export default {
		components: {uniIcons},
		data() {
			return {
				list: []
			};
		},
		methods: {
			async getList() {
				try{
					let res = await db.collection('scores').orderBy('score', 'desc').get()
					console.log(res)
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
.integral {
	background: rgba(225, 225, 255, 0.75); 
	
	.staff {
		height: 400upx;
		border-bottom: 1upx dashed $uni-border-color;
		background: #ffffff;
		margin-bottom: 40upx;
		.header {
			height: 200upx;
			display: flex;
			align-items: center;
			.avatar {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				.img {
					width: 160upx;
					height: 160upx;
					border-radius: 50%;
				}
			}
			.name {
				flex: 3;
				font-size: 48upx;
				padding-left: 20upx;
			}
		}
		.info {
			padding-left: 40upx;
			color: $uni-text-color-muted;
			.account {
				margin-top: 20upx;
				margin-bottom: 20upx;
			}
			.password {
				height: 80upx;
				position: relative;
				.label {
					position: absolute;
					top: 0;
					left: 0;
					display: flex;
					align-items: center;
					.input {
						display: inline-block;
						height: 80upx;
						line-height: 80upx;
						&.focus {
							border: 1upx solid $uni-color-primary;
							padding-left: 20upx;
						}
					}
					
				}
				.icon {
					position: absolute;
					top: 20upx;
					right: 20upx;
					color: $uni-text-color-grey;
				}
			}
		}
	}
}
</style>
