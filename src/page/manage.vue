<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #009a76;">
				<el-menu :default-active="defaultActive" style="min-height: 100%; background-color: #009a76;" theme="light" router>
					<el-menu-item  index="manage"><i class="el-icon-menu"></i><span style="color:#333;">供应链管理后台</span></el-menu-item>
					<el-submenu index="2"  v-if="getRole('11')">
						<template slot="title"><i class="el-icon-document"></i><span style="color:#333;">A库进销存管理</span></template>
						<el-submenu style="background-color: #009a76;" index="7">
							<template  slot="title"><i class="el-icon-plus"></i><span style="color:#333;">采购订单管理</span></template>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('01')" index="/purchaseOrder">采购单</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('04')" index="/purchaseSum">采购汇总单</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('03')" index="/supplier">供应商管理</el-menu-item>
						</el-submenu>
						<el-submenu style="background-color: #009a76;" index="8">
							<template  slot="title"><i class="el-icon-plus"></i><span style="color:#333;">库存管理</span></template>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('06')" index="/stockInA">入库单</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('07')" index="/virtualStock">虚拟库</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('08')" index="/stockBalanceA">库存余额表</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('09')" index="/waste">损耗管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('47')" index="/packagingManagement_a">包装管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('48')" index="/Inventory_a">盘点</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('50')" index="/securityThresholdManagement_a">安全阈值管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('53')" index="/shelfLifeReminder_a">保质期提醒</el-menu-item>
						</el-submenu>
						<el-submenu style="background-color: #009a76;" index="9">
							<template  slot="title"><i class="el-icon-plus"></i><span style="color:#333;">出库管理</span></template>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('10')" index="/stockOutA">出库单管理</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-submenu style="background-color: #009a76;" index="3"  v-if="getRole('18')">
						<template  slot="title"><i class="el-icon-document"></i><span style="color:#333;">B库进销存管理</span></template>
						<el-submenu style="background-color: #009a76;" index="10">
							<template slot="title"><i class="el-icon-plus"></i><span style="color:#333;">入库管理</span></template>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('19')" index="/stockIn">入库单管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('25')" index="/stockInList">入库清单管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('20')" index="/transportWaste">运输损耗</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('21')" index="/purchase">采购单管理</el-menu-item>
						</el-submenu>
						<el-submenu style="background-color: #009a76;" index="11">
							<template  slot="title"><i class="el-icon-plus"></i><span style="color:#333;">库存管理</span></template>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('22')" index="/dailyWaste">日常损耗管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('24')" index="/stockBalance">库存余额表</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('46')" index="/Inventory_b">盘点</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('49')" index="/packagingManagement_b">包装管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('52')" index="/allotmentSheet_b">调出调拨单</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('54')" index="/transferBill_b">调入调拨单</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-submenu style="background-color: #009a76;" index="4" v-if="getRole('28')">
						<template  slot="title"><i class="el-icon-star-on"></i><span style="color:#333;">生产执行管理</span></template>
						<el-submenu style="background-color: #009a76;" index="13">
							<template  slot="title"><i class="el-icon-plus"></i><span style="color:#333;">资源分配管理</span></template>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('29')" index="/receiptCount">销售订单汇总</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('31')" index="/plannation">生产计划汇总</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('32')" index="/bomManage">BOM管理</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('51')" index="/productionLine">生产线管理</el-menu-item>
						</el-submenu>
						<el-submenu  style="background-color: #009a76;" index="14">
							<template  slot="title"><i class="el-icon-plus"></i><span style="color:#333;">生产单元分配</span></template>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('36')" index="/stockOut">出库单</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-submenu  style="background-color: #009a76;" index="5"  v-if="getRole('38')">
						<template  slot="title"><i class="el-icon-edit"></i><span style="color:#333;">配置管理</span></template>
						<!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
						<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('39')" index="/person">人员管理</el-menu-item>
						<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('41')" index="/group">组管理</el-menu-item>
						<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('42')" index="/role">角色权限</el-menu-item>
						<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('23')" index="/branchHouse">分库管理</el-menu-item>
						<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('35')" index="/classification">货品分类</el-menu-item>
							<el-menu-item style="background-color: #009a76;color: #333;" v-if="getRole('05')" index="/goods">货品管理</el-menu-item>
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
    import local from '@/api/local'
    export default {
        data() {
            return {
                views: JSON.parse(local.get('pageInfo'))
            }
        },
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
        methods: {
            getRole(index) {
                if (!this.views) {
                    this.$router.push('/')
                    return false
                }
//                console.log('views', this.views)
                for (let i of this.views) {
//                    console.log(i[0], i[1])
                    if (i[0] === index) return i[1]
                }
                return false
            }
        }
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
	.el-submenu .el-menu-item:hover, .el-menu-item:hover {
    background-color: #d1dbe5 !important;
}
</style>
