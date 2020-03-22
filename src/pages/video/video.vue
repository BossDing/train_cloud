<template>
	<view>
		<video 
			class="video" 
			:src="src" 
			:autoplay="true" 
			:controls="true">
		</video>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: this.$store.state.videoUrl
			};
		},
		onLoad() {
			
		}
	}
</script>

<style lang="stylus">
.video {
	width: 100vw;
	height: 100vh;
}
</style>
