<template>
	<view class="index page">
		<!-- 一般用法 -->
		<uni-grid :column="3">
		    <uni-grid-item>
		        <navigator url="">
					
				</navigator>
		    </uni-grid-item>
		    <uni-grid-item>
		        <text class="text">文本</text>
		    </uni-grid-item>
		    <uni-grid-item>
		        <text class="text">文本</text>
		    </uni-grid-item>
		</uni-grid>
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
</style>
