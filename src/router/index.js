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
const stockOut = r => require.ensure([], () => r(require('@/page/stockOut')), 'stockOut');
const stockOutDetails = r => require.ensure([], () => r(require('@/page/stockOutDetails')), 'stockOut');
const plannation = r => require.ensure([], () => r(require('@/page/plannation')), 'plannation');
const stockIn = r => require.ensure([], () => r(require('@/page/stockIn')), 'stockIn');
const stockInDetails = r => require.ensure([], () => r(require('@/page/stockInDetails')), 'stockIn');
const stockInList = r => require.ensure([], () => r(require('@/page/stockInList')), 'stockInList');
const stockInListDetails = r => require.ensure([], () => r(require('@/page/stockInListDetails')), 'stockInList');
const transportWaste = r => require.ensure([], () => r(require('@/page/transportWaste')), 'transportWaste');
const transportWasteDetails = r => require.ensure([], () => r(require('@/page/transportWasteDetails')), 'transportWaste');
const stockInA = r => require.ensure([], () => r(require('@/page/stockInA')), 'stockInA');
const stockInADetails = r => require.ensure([], () => r(require('@/page/stockInADetails')), 'stockInA');
const purchaseSum = r => require.ensure([], () => r(require('@/page/purchaseSum')), 'purchaseSum');
const supplier = r => require.ensure([], () => r(require('@/page/supplier')), 'supplier');
const supplierDetails = r => require.ensure([], () => r(require('@/page/supplierDetails')), 'supplier');
const goods = r => require.ensure([], () => r(require('@/page/goods')), 'goods');
const goodsDetails = r => require.ensure([], () => r(require('@/page/goodsDetails')), 'goods');
const stockBalanceA = r => require.ensure([], () => r(require('@/page/stockBalanceA')), 'stockBalanceA');
const waste = r => require.ensure([], () => r(require('@/page/waste')), 'waste');
const stockOutA = r => require.ensure([], () => r(require('@/page/stockOutA')), 'stockOutA');
const stockOutADetails = r => require.ensure([], () => r(require('@/page/stockOutADetails')), 'stockOutA');
const virtualStock = r => require.ensure([], () => r(require('@/page/virtualStock')), 'virtualStock');
const purchaseOrder = r => require.ensure([], () => r(require('@/page/purchaseOrder')), 'purchaseOrder');
const purchaseOrderDetails = r => require.ensure([], () => r(require('@/page/purchaseOrderDetails')), 'purchaseOrder');
const purchase = r => require.ensure([], () => r(require('@/page/purchase')), 'purchase');
const purchaseDetails = r => require.ensure([], () => r(require('@/page/purchaseDetails')), 'purchase');
const dailyWaste = r => require.ensure([], () => r(require('@/page/dailyWaste')), 'dailyWaste');
const branchHouse = r => require.ensure([], () => r(require('@/page/branchHouse')), 'branchHouse');
const stockBalance = r => require.ensure([], () => r(require('@/page/stockBalance')), 'stockBalance');


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
			path: '/purchaseOrder',
			component: purchaseOrder,
			meta: ['A库进销存管理', '采购订单管理', '采购单'],
		},{
			path: '/purchaseOrderDetails/:id',
			component: purchaseOrderDetails,
			meta: ['A库进销存管理', '采购订单管理', '采购单'],
		},{
			path: '/purchaseSum',
			component: purchaseSum,
			meta: ['A库进销存管理', '采购订单管理', '采购汇总单'],
		},{
			path: '/supplier',
			component: supplier,
			meta: ['A库进销存管理', '采购订单管理', '供应商管理'],
		},{
			path: '/supplierDetails/:id',
			component: supplierDetails,
			meta: ['A库进销存管理', '采购订单管理', '供应商管理'],
		},{
			path: '/goods',
			component: goods,
			meta: ['A库进销存管理', '采购订单管理', '货品管理'],
		},{
			path: '/goodsDetails/:id',
			component: goodsDetails,
			meta: ['A库进销存管理', '采购订单管理', '货品管理'],
		},{
			path: '/stockInA',
			component: stockInA,
			meta: ['A库进销存管理', '库存管理', '入库单'],
		},{
			path: '/stockInADetails/:id',
			component: stockInADetails,
			meta: ['A库进销存管理', '库存管理', '入库单'],
		},{
			path: '/virtualStock',
			component: virtualStock,
			meta: ['A库进销存管理', '库存管理', '虚拟库'],
		},{
			path: '/stockBalanceA',
			component: stockBalanceA,
			meta: ['A库进销存管理', '库存管理', '库存余额表'],
		},{
			path: '/waste',
			component: waste,
			meta: ['A库进销存管理', '库存管理', '损耗管理'],
		},{
			path: '/stockOutA',
			component: stockOutA,
			meta: ['A库进销存管理', '出库管理', '出库单'],
		},{
			path: '/stockOutADetails/:id',
			component: stockOutADetails,
			meta: ['A库进销存管理', '出库管理', '出库单'],
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
			path: '/stockOut',
			component: stockOut,
			meta: ['生产执行管理', '生产单元分配', '出库单'],
		},{
			path: '/stockOutDetails/:id',
			component: stockOutDetails,
			meta: ['生产执行管理', '生产单元分配', '出库单'],
		},{
			path: '/plannation',
			component: plannation,
			meta: ['生产执行管理', '资源分配管理', '生产计划汇总'],
		},{
			path: '/stockIn',
			component: stockIn,
			meta: ['B库进销存管理', '入库管理', '入库单'],
		},{
			path: '/stockInDetails/:id',
			component: stockInDetails,
			meta: ['B库进销存管理', '入库管理', '入库单'],
		},{
			path: '/stockInList',
			component: stockInList,
			meta: ['B库进销存管理', '入库管理', '入库清单'],
		},{
			path: '/stockInListDetails/:id',
			component: stockInListDetails,
			meta: ['B库进销存管理', '入库管理', '入库清单'],
		},{
			path: '/transportWaste',
			component: transportWaste,
			meta: ['B库进销存管理', '入库管理', '运输损耗'],
		},{
			path: '/transportWasteDetails/:id',
			component: transportWasteDetails,
			meta: ['B库进销存管理', '入库管理', '运输损耗'],
		},{
			path: '/purchase',
			component: purchase,
			meta: ['B库进销存管理', '入库管理', '采购单管理'],
		},{
			path: '/purchaseDetails/:id',
			component: purchaseDetails,
			meta: ['B库进销存管理', '入库管理', '采购单管理'],
		},{
			path: '/dailyWaste',
			component: dailyWaste,
			meta: ['B库进销存管理', '库存管理', '日常损耗管理']
		},{
			path: '/branchHouse',
			component: branchHouse,
			meta: ['B库进销存管理', '库存管理', '分库管理']
		},{
			path: '/stockBalance',
			component: stockBalance,
			meta: ['B库进销存管理', '库存管理', '库存余额表']
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
