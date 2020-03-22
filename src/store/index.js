import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		videoUrl: '',
		user: {
			
		}
	},
    mutations: {
		changeVideoUrl(state, payload) {
			state.videoUrl = payload
		},
		setUser(state, payload) {
			state.user = payload
		}
	},
    actions: {}
})
export default store