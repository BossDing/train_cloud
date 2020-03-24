<template>
	<view class="bank page">
		<view class="questions-wrapper">
			<view class="title">
				题库
			</view>
			<view class="list" v-for="(item, index) in list" :key="item._id">
				<view class="question">
					{{index+1}}. {{item.title}} <text class="type">({{typeMap[item.type]}})</text>
				</view>
				<radio-group>
					<label class="item-cell" v-for="o in item.items" :key="o.key">
						<view>
							<radio :value="o.key" :checked="false" :disabled="true" />
						</view>
						<view>{{o.key}} 、 {{o.value}}</view>
					</label>
				</radio-group>
				<view class="anwser">
					答案是： {{item.answer}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { limit, typeMap } from '../../constants/const.js'
	const db = wx.cloud.database()
	import { transQuestion } from '../../utils/transData.js'
	export default {
		data() {
			return {
				typeMap,
				list: [],
				total: 0,
				skip: 0
			};
		},

		methods: {
			radioChange(e, i) {
				let { value } = e.detail
				this.answers[i].answer = value
			},
			
			async getTotal() {
				let res = await db.collection('questions').count()
				this.total = res.total
			},
			
			async getList() {
				try{
					let res = await db.collection('questions').skip(this.skip*10).limit(limit).get()
					if (res.data.length) {
						this.list = [...this.list, ...transQuestion(res.data)]
					}
					
					
				}catch(e){
					console.log(e)
				}
			}
		},
		onReachBottom() {
			this.skip += 1
			if (this.list.length < this.total) {
				this.getList()
			}
			
		},
		onLoad() {
			this.getTotal()
			this.getList()
		}
	}
</script>

<style lang="stylus">
@import '../../uni.styl';	
.bank {
	.questions-wrapper {
		background: rgba(225, 225, 255, 0.85); 
	}
	.title {
		font-size: 40upx;
		padding-top: 20upx;
		padding-left: 20upx;
		box-sizing: border-box;
	}
	.list {
		box-sizing: border-box;
		padding: 20upx;
		border-bottom: 1upx solid $uni-border-color;
		.question {
			color: $uni-text-color;
			font-size: 32upx;
		}
		.item-cell {
			box-sizing: border-box;
			padding: 20upx;
			border-bottom: 1upx dashed $uni-border-color;
			display: flex;
			width: 100%;
		}
		.anwser {
			margin: 20upx 0 0 0;
			color: $uni-color-primary
		}
	}
}
</style>
