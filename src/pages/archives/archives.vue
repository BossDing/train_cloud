<template>
	<view class="archives">
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
				<view class="password" @click="changePwd(item._id)">
					<label class="label">
						<text>密码：</text>  
						<input class="input" :class="{focus: item._id === currentId}" type="text" :disabled="item._id !== currentId" v-model="item.password" />
					</label>
					<uni-icons class="icon" type="checkmarkempty" size="20" v-if="item._id === currentId" @click.native="sure(item._id, item.password)"></uni-icons>
					<text class="icon" v-else>
						修改
					</text>
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
				list: [],
				currentId: 0
			};
		},
		methods: {
			changePwd(id) {
				this.currentId = id
			},
			
			async sure(id, password) {
				try{
					let res = await db.collection('accounts').doc(id).update({
						data: {
							password
						}
					})
					console.log(res)
					uni.showToast({
						icon: 'none',
						title: '修改改成',
						duration: 1000
					})
					this.currentId = 0
				}catch(e){
					console.log(e)
				}
			},
			
			async getList() {
				try{
					let res = await db.collection('accounts').get()
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
.archives {
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
