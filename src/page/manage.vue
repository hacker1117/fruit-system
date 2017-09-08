<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #009a76;">
				<el-menu :default-active="defaultActive" style="min-height: 100%; background-color: #009a76;" theme="light" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>供应链管理后台</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>A库进销存管理</template>
						<el-submenu style="background-color: #009a76;" index="7">
							<template slot="title"><i class="el-icon-plus"></i>采购订单管理</template>
							<el-menu-item style="background-color: #009a76;" index="/addShop">采购单</el-menu-item>
							<el-menu-item style="background-color: #009a76;" index="/addGoods">采购汇总单</el-menu-item>
							<el-menu-item style="background-color: #009a76;" index="/addGoods">供应商管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;" index="/addGoods">货品管理</el-menu-item>
						</el-submenu>
						<el-submenu style="background-color: #009a76;" index="8">
							<template slot="title"><i class="el-icon-plus"></i>库存管理</template>
							<el-menu-item style="background-color: #009a76;" index="/addShop">入库单</el-menu-item>
							<el-menu-item style="background-color: #009a76;" index="/addGoods">虚拟库</el-menu-item>
							<el-menu-item style="background-color: #009a76;" index="/addGoods">库存余额表</el-menu-item>
							<el-menu-item style="background-color: #009a76;" index="/addGoods">损耗管理</el-menu-item>
						</el-submenu>
						<el-submenu style="background-color: #009a76;" index="9">
							<template slot="title"><i class="el-icon-plus"></i>出库管理</template>
							<el-menu-item style="background-color: #009a76;" index="/addShop">出库单管理</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-submenu style="background-color: #009a76;" index="3">
						<template slot="title"><i class="el-icon-document"></i>B库进销存管理</template>
						<el-submenu style="background-color: #009a76;" index="10">
							<template slot="title"><i class="el-icon-plus"></i>入库管理</template>
							<el-menu-item style="background-color: #009a76;" index="/addShop">入库单管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;" index="/addGoods">入库清单管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;" index="/addGoods">运输损耗</el-menu-item>
							<el-menu-item style="background-color: #009a76;" index="/addGoods">采购单管理</el-menu-item>
						</el-submenu>
						<el-submenu style="background-color: #009a76;" index="11">
							<template slot="title"><i class="el-icon-plus"></i>库存管理</template>
							<el-menu-item style="background-color: #009a76;" index="/addShop">日常损耗管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;" index="/addGoods">分库管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;" index="/addGoods">库存余额表</el-menu-item>
						</el-submenu>
						<el-submenu style="background-color: #009a76;" index="12">
							<template slot="title"><i class="el-icon-plus"></i>出库管理</template>
							<el-menu-item style="background-color: #009a76;" index="/addShop">出库单管理</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-submenu style="background-color: #009a76;" index="4">
						<template slot="title"><i class="el-icon-star-on"></i>生产执行管理</template>
						<el-submenu style="background-color: #009a76;" index="13">
							<template slot="title"><i class="el-icon-plus"></i>资源分配管理</template>
							<el-menu-item style="background-color: #009a76;" index="/receiptCount">销售订单汇总</el-menu-item>
							<el-menu-item style="background-color: #009a76;" index="/addGoods">生产计划汇总</el-menu-item>
							<el-menu-item style="background-color: #009a76;" index="/bomManage">BOM管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;" index="/classification">货品分类</el-menu-item>
						</el-submenu>
						<el-submenu style="background-color: #009a76;" index="14">
							<template slot="title"><i class="el-icon-plus"></i>生产单元分配</template>
							<el-menu-item style="background-color: #009a76;" index="/addShop">出库单</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-submenu  style="background-color: #009a76;" index="5">
						<template slot="title"><i class="el-icon-edit"></i>用户管理</template>
						<!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
						<el-menu-item style="background-color: #009a76;" index="/vueEdit">人员管理</el-menu-item>
						<el-menu-item style="background-color: #009a76;" index="/vueEdit">权限管理</el-menu-item>
						<el-menu-item style="background-color: #009a76;" index="/vueEdit">组管理</el-menu-item>
						<el-menu-item style="background-color: #009a76;" index="/vueEdit">角色权限</el-menu-item>
						<el-menu-item style="background-color: #009a76;" index="/vueEdit">页面权限</el-menu-item>
					</el-submenu>
					<el-submenu style="background-color: #009a76;" index="6">
						<template slot="title"><i class="el-icon-setting"></i>配置管理</template>
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
