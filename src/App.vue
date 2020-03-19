<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="stylus">
@import './uni.styl';
@import './util.styl';
.page {
	background-color: $uni-bg-color-primary;
	height: 100vh;
}
</style>
