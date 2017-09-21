<template>
    <div class="header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" key="index" :key="item.id">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown @command="handleCommand" menu-align='start'>
			<span style="float: left;height: 36px; line-height: 36px;"><h3>您好,{{adminInfo.uname}}&nbsp;&nbsp;&nbsp;</h3></span>
			<img :src="baseImgPath + adminInfo.avatar" class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="singout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
	import {signout, loginRole} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
	import local from '@/api/local'

    export default {
    	data(){
    		return {
				baseImgPath
    		}
    	},
    	created(){
//            this.getRole()
			let isLogin = local.get('userInfo')
			if(isLogin) {
				this.$store.commit('saveAdminInfo', JSON.parse(isLogin))
			}
    	},
    	computed: {
    		...mapState(['adminInfo']),
    	},
		methods: {
			...mapActions(['getAdminData']),
			async handleCommand(command) {
				if (command == 'home') {
					this.$router.push('/manage');
				}else if(command == 'singout'){
						this.$message({
	                        type: 'success',
	                        message: '退出成功'
						});
						local.clear()
	                    this.$router.push('/');
				}
			},
            async getRole() {
			    const response = loginRole()
            }
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
