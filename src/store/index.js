import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex)

const state = {
	adminInfo: {},
    pageList:[]
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	},
    setPageList(state, pageInfo) {
	    state.pageList = pageInfo
    }
}

const actions = {
	async getAdminData({commit}){
		try{
			let res = state.adminInfo
			if (res.uname !== '') {
				commit('saveAdminInfo', res.data);
			}else{
				throw new Error(res)
			}
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})
