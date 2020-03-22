<template>
	<view class="superior">
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
					工号：{{item.account}}
				</view>
			</view>
			<view class="investigation">
				<button type="primary" size="mini" @click="investigation">抽查</button>
			</view>
		</view>
	</view>
</template>

<script>
	const db = wx.cloud.database()
	const _ = db.command
	export default {
		data() {
			return {
				list: []
			};
		},
		methods: {
			investigation(id) {
				uni.showToast({
					icon: 'none',
					title: '试卷已成功派发给他',
					duration: 1000
				})
			},
			
			
			async getList() {
				try{
					let res = await db.collection('accounts').where({
						permissions: _.in([2])
					}).get()
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
.superior {
	background: rgba(225, 225, 255, 0.75); 
	
	.staff {
		height: 320upx;
		border-bottom: 1upx dashed $uni-border-color;
		background: #ffffff;
		margin-bottom: 40upx;
		position: relative;
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
		.investigation {
			position: absolute;
			top: 200upx;
			right: 40upx;
		}
	}
}
</style>
