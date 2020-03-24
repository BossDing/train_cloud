<template>
	<view class="special page">
		<view class="questions-wrapper">
			<view class="list" v-for="(item, index) in list" :key="item._id">
				<view class="question">
					{{index+1}}. {{item.title}} <text class="type">({{typeMap[item.type]}})</text>
				</view>
				<checkbox-group v-if="item.type === '3'" @change="radioChange($event, index)">
					<label class="item-cell" v-for="o in item.items" :key="o.key">
						<view>
							<checkbox :value="o.key" :checked="false" />
						</view>
						<view>{{o.key}} 、 {{o.value}}</view>
					</label>
				</checkbox-group>
				<radio-group v-else @change="radioChange($event, index)">
					<label class="item-cell" v-for="o in item.items" :key="o.key">
						<view>
							<radio :value="o.key" :checked="o.checked" />
						</view>
						<view>{{o.key}} 、 {{o.value}}</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="submit-btn" @click="submit">
			提交
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
				type: 'pratice',
				list: [],
				answers: [],
				corrects: 0
			};
		},
		methods: {
			radioChange(e, i) {
				
				let { value } = e.detail
				console.log(value)
				this.answers[i].answer = value
			},
			
			submit() {
				this.corrects = 0
				let len = this.list.length
				for (let i = 0; i < len; i++) {
					if (this.list[i].type === '3') {
						if (this.list[i].answer.join() === this.answers[i].answer.join()) {
							this.corrects++
						}
					} else {
						if (this.list[i].answer.includes(this.answers[i].answer)) {
							this.corrects++
						}
					}
					
				}
				
				if(this.type === 'exam') {
					this.addHistory()
					this.addScore()
					this.deleteExam()
				}
				
				uni.navigateTo({
					url: `../result/result?corrects=${this.corrects}&type=${this.type}`
				})
			},
			
			async getList() {
				let r = Math.random() * 10
				r = r === 0 ? r+1 : r
				let skip = (~~r) * 10
				
				try{
					let res = await db.collection('questions').skip(skip).limit(limit).get()
					this.list = transQuestion(res.data)
					this.answers = this.list.map(item => {
						let {
							answer,
							items,
							...rest
						} = item
						let itemsClone = [...items]
						return {
							answer: item.type === '3' ? [] : ['A'],
							items: itemsClone,
							...rest
						}
					})
				}catch(e){
					console.log(e)
				}
			},
			
			async addHistory() {
				let res = await db.collection('history').add({
					data: {
						account: this.$store.state.user.account,
						correct: this.corrects,
						score: this.corrects * 10,
						time: new Date()
					}
				})
			},
			
			
			async addScore() {
				let res = await db.collection('scores').add({
					data: {
						account: this.$store.state.user.account,
						name: this.$store.state.user.name,
						avatar: this.$store.state.user.avatar,
						correct: this.corrects,
						score: this.corrects * 10,
						time: new Date()
					}
				})
			},
			
			async deleteExam() {
				console.log(this.$store.state.user.account)
				wx.cloud.callFunction({
				  name: 'examRemove',
				  data: {
					  account: this.$store.state.user.account
				  }
				})
			}
			
			
		},
		onLoad(opt) {
			this.type = opt.type
			this.getList()
		}
	}
</script>

<style lang="stylus">
@import '../../uni.styl';	
.special {
	height: 100vh;
	position: relative;
	.questions-wrapper {
		background: rgba(225, 225, 255, 0.7); 
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 80upx;
		overflow: auto;
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
	}
	.submit-btn {
		height: 80upx;
		width: 100vw;
		position: absolute;
		left: 0;
		bottom: 0;
		background: $uni-color-success;
		color: #FFFFFF;
		text-align: center;
		line-height: 80upx;
		font-size: 36upx;
		z-index: 1;
	}
}
</style>
