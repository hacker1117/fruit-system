<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #009a76;">
				<el-menu :default-active="defaultActive" style="min-height: 100%; background-color: #009a76;" theme="light" router>
					<el-menu-item  index="manage"><i class="el-icon-menu"></i><span style="color:#333;">供应链管理后台</span></el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i><span style="color:#333;">A库进销存管理</span></template>
						<el-submenu style="background-color: #009a76;" index="7">
							<template  slot="title"><i class="el-icon-plus"></i><span style="color:#333;">采购订单管理</span></template>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/purchaseOrder">采购单</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/purchaseSum">采购汇总单</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/supplier">供应商管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/goods">货品管理</el-menu-item>
						</el-submenu>
						<el-submenu style="background-color: #009a76;" index="8">
							<template  slot="title"><i class="el-icon-plus"></i><span style="color:#333;">库存管理</span></template>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/stockInA">入库单</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/virtualStock">虚拟库</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/stockBalanceA">库存余额表</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/waste">损耗管理</el-menu-item>
						</el-submenu>
						<el-submenu style="background-color: #009a76;" index="9">
							<template  slot="title"><i class="el-icon-plus"></i><span style="color:#333;">出库管理</span></template>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/stockOutA">出库单管理</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-submenu style="background-color: #009a76;" index="3">
						<template  slot="title"><i class="el-icon-document"></i><span style="color:#333;">B库进销存管理</span></template>
						<el-submenu style="background-color: #009a76;" index="10">
							<template slot="title"><i class="el-icon-plus"></i><span style="color:#333;">入库管理</span></template>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/stockIn">入库单管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/stockInList">入库清单管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/transportWaste">运输损耗</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/purchase">采购单管理</el-menu-item>
						</el-submenu>
						<el-submenu style="background-color: #009a76;" index="11">
							<template  slot="title"><i class="el-icon-plus"></i><span style="color:#333;">库存管理</span></template>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/dailyWaste">日常损耗管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/branchHouse">分库管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/stockBalance">库存余额表</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-submenu style="background-color: #009a76;" index="4">
						<template  slot="title"><i class="el-icon-star-on"></i><span style="color:#333;">生产执行管理</span></template>
						<el-submenu style="background-color: #009a76;" index="13">
							<template  slot="title"><i class="el-icon-plus"></i><span style="color:#333;">资源分配管理</span></template>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/receiptCount">销售订单汇总</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/plannation">生产计划汇总</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/bomManage">BOM管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/classification">货品分类</el-menu-item>
						</el-submenu>
						<el-submenu  style="background-color: #009a76;" index="14">
							<template  slot="title"><i class="el-icon-plus"></i><span style="color:#333;">生产单元分配</span></template>
							<el-menu-item style="background-color: #009a76;color: #333;" index="/stockOut">出库单</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-submenu  style="background-color: #009a76;" index="5">
						<template  slot="title"><i class="el-icon-edit"></i><span style="color:#333;">用户管理</span></template>
						<!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
						<el-menu-item style="background-color: #009a76;color: #333;" index="/person">人员管理</el-menu-item>
						<el-menu-item style="background-color: #009a76;color: #333;" index="/group">组管理</el-menu-item>
						<el-menu-item style="background-color: #009a76;color: #333;" index="/role">角色权限</el-menu-item>
					</el-submenu>
					<el-submenu style="background-color: #009a76;" index="6">
						<template  slot="title"><i class="el-icon-setting"></i><span style="color:#333;">配置管理</span></template>
						<!-- <el-menu-item index="adminSet">管理员设置</el-menu-item> -->
						<!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{
		
	}
</style>
