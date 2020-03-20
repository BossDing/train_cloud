<script>
	export default {
		onLaunch: function() {
			console.log('云init')
			wx.cloud.init({
				traceUser: true,
				env: 'dev-im8b3'
			})
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="stylus">
@import './uni.styl';
@import './util.styl';
.page {
	height: 100vh;
}
</style>
