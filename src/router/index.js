import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const receiptCount = r => require.ensure([], () => r(require('@/page/receiptCount')), 'receiptCount');
const bomManage = r => require.ensure([], () => r(require('@/page/bomManage')), 'bomManage');
const classification = r => require.ensure([], () => r(require('@/page/classification')), 'classification');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
const addBom = r => require.ensure([], () => r(require('@/page/addBom')), 'bomManage');
const receiptDetails = r => require.ensure([], () => r(require('@/page/receiptDetails')), 'receiptCount');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/receiptCount',
			component: receiptCount,
			meta: ['生产执行管理', '资源分配管理', '销售订单汇总'],
		},{
			path: '/receiptDetails/:id',
			component: receiptDetails,
			meta: ['生产执行管理', '资源分配管理', '销售订单汇总'],
		},{
			path: '/bomManage',
			component: bomManage,
			meta: ['生产执行管理', '资源分配管理', 'BOM管理'],
		},{
			path: '/classification',
			component: classification,
			meta: ['生产执行管理', '资源分配管理', '货品分类'],
		},{
			path: '/addBom',
			component: addBom,
			meta: ['生产执行管理', '资源分配管理', 'BOM管理'],
		},{
			path: '/addBom/:pid',
			component: addBom,
			meta: ['生产执行管理', '资源分配管理', 'BOM管理'],
		},{
			path: '/shopList',
			component: shopList,
			meta: ['数据管理', '商家列表'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['数据管理', '食品列表'],
		},{
			path: '/orderList',
			component: orderList,
			meta: ['数据管理', '订单列表'],
		},{
			path: '/adminList',
			component: adminList,
			meta: ['数据管理', '管理员列表'],
		},{
			path: '/visitor',
			component: visitor,
			meta: ['图表', '用户分布'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['图表', '用户数据'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['文本编辑', 'MarkDown'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['编辑', '文本编辑'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['设置', '发送通知'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
