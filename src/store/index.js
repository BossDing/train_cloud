import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		videoUrl: ''
	},
    mutations: {
		changeVideoUrl(state, payload) {
			state.videoUrl = payload
		}
	},
    actions: {}
})
export default store