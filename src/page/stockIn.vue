<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top: 20px;">
            <el-col :span="2" style="text-align:right;">单据编码：</el-col>
			<el-col :span="4"><el-input v-model="input" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">单据日期：</el-col>
			<el-col :span="4"><el-input v-model="input" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">入库类型：</el-col>
			<el-col :span="4"><el-input v-model="input" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">经手人：</el-col>
			<el-col :span="4"><el-input v-model="input" siez="mini" placeholder="请输入内容"></el-input></el-col>
		</el-row>
		<el-row>
			<el-col :span="24"><el-button style="float: right;" @click="handleSearch" type="primary">查询</el-button></el-col>
		</el-row>
		<el-table
			:data="receiptData"
			stripe
			style="width: 100%;text-align:left;">
			<el-table-column
			prop="ordercode" width="120px"
			label="销售单号">
			</el-table-column>
			<el-table-column
			prop="outputrepositorycode" width="120px"
			label="出库编码">
			</el-table-column>
			<el-table-column
			prop="outdate" width="120px"
			label="出库日期">
			</el-table-column>
			<el-table-column
			prop="operatedate" width="120px"
			label="订单生成日期">
			</el-table-column>
			<el-table-column
			prop="repositorycode" width="120px"
			label="仓库编码">
			</el-table-column>
			<el-table-column
			prop="acceptanceFormID" width="120px"
			label="验收单">
			</el-table-column>
			</el-table-column>
			<el-table-column
			prop="consigneeName" width="120px"
			label="收货人名称">
			</el-table-column>
			<el-table-column
			prop="customer" width="120px"
			label="客户ID">
			</el-table-column>
			<el-table-column
			prop="acceptanceHuman" width="120px"
			label="验收员">
			</el-table-column>
			<el-table-column
			prop="sendtype" width="120px"
			label="所属区域">
			</el-table-column>
			<el-table-column
			prop="addressDetail" width="120px"
			label="详细地址">
			</el-table-column>
			<el-table-column
			label="操作" fixed="right" width="120px">
			<template scope="scope">
				<el-button
				size="small"
				@click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
			</template>
			</el-table-column>
		</el-table>
		</div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {getStockInAll, queryStockIn} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				value1: '',
				value2: '',
				input: '',
				city: {},
				receiptData: [],
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		this.initData();
    	},
    	methods: {
    		async initData(){
    			try{
					const dataReceipt = await getStockInAll()
					console.log('re: ',dataReceipt.data.data)
					this.receiptData = dataReceipt.data.data.list
    			}catch(err){
    				console.log(err);
    			}
    		},
			handleEdit(index,row) {
				console.log(index,row)
				this.$destroy()
				this.$router.push('/stockOutDetails/'+ row.outputrepositorycode)
			},
			async handleSearch(){
				// let sTime = this.formatter(this.value1)
				// let eTime = this.formatter(this.value2)
				// console.log(sTime)
				// console.log(eTime)
				// console.log(this.input)
				// const resData = await queryStockIn(this.input,sTime,eTime,1,10)
				// this.receiptData = resData.data.data.list
				// console.log(resData.data)
			},
			formatter(date){
				console.log(date.getMonth())
				let res = ''
				res += date.getFullYear()+ '-' + (date.getMonth() + 1) + '-' +date.getDate()
				return res
			}
		}
    }
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.button_submit{
		text-align: center;
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
	.el-row {
		margin-bottom: 20px;
		&:last-child {
		margin-bottom: 0;
		}
	}
	.el-col {
		border-radius: 4px;
		height: 36px;
		line-height: 36px;
		font-size: 14px;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.bg-purple-light {
		background: #e5e9f2;
	}
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
	.el-input__inner {
		height: 32px !important;
	}
	.fruit-content {
		padding: 0 4%;
	}
</style>
