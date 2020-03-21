<template>
	<view class="special page">
		<view class="questions-wrapper">
			<view class="title">单选</view>
				<view class="list" v-for="item in list" :key="item._id">
					<view class="question">
						{{item.idx}}. {{item.title}}
					</view>
					<radio-group @change="radioChange">
						<label class="item-cell" v-for="o in item.items" :key="o.key">
							<view>
								<radio :value="o.key" :checked="o.checked" />
							</view>
							<view>{{o.key}} 、 {{o.value}}</view>
						</label>
					</radio-group>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	const db = wx.cloud.database()
	import { transQuestion } from '../../utils/transData.js'
	export default {
		data() {
			return {
				list: [],
				items: [
					{
						value: 'USA',
						name: '美国'
					},
					{
						value: 'CHN',
						name: '中国',
						checked: 'true'
					},
					{
						value: 'BRA',
						name: '巴西'
					},
					{
						value: 'JPN',
						name: '日本'
					},
					{
						value: 'ENG',
						name: '英国'
					},
					{
						value: 'FRA',
						name: '法国'
					},
				],
				current: 'A'
			};
		},
		methods: {
			radioChange(e) {
				
			},
			
			async getList() {
				try{
					let res = await db.collection('questions').skip(0).limit(10).get()
					console.log(res)
					this.list = transQuestion(res.data)
					console.log(this.list)
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
.special {
	
	.questions-wrapper {
		height: 100vh;
		background: rgba(225, 225, 255, 0.7); 
	}
	.title {
		font-size: 40upx;
		padding-top: 20upx;
		padding-left: 20upx;
	}
	.list {
		padding: 20upx;
		border-bottom: 1upx solid $uni-border-color;
		.question {
			color: $uni-text-color;
			font-size: 32upx;
		}
		.item-cell {
			padding: 20upx;
			border-bottom: 1upx dashed $uni-border-color;
			display: flex;
			width: 100%;
		}
	}
}
</style>
