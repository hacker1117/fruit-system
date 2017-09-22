<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top: 20px;">
            <el-col :span="2" style="text-align:right;">商品编号：</el-col>
			<el-col :span="4"><el-input v-model="procode" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">商品名称：</el-col>
			<el-col :span="4"><el-input v-model="pname" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">损耗商品码：</el-col>
			<el-col :span="4"><el-input v-model="wasteproductcode" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">制单员：</el-col>
			<el-col :span="4"><el-input v-model="createhuman" siez="mini" placeholder="请输入内容"></el-input></el-col>
		</el-row>
		<el-row>
            <el-col :span="2" style="text-align:right;">报损时间：</el-col>
			<el-col :span="4">
				<el-date-picker
				v-model="reporttime"
				type="date"
				format="yyyy-MM-dd"
				placeholder="选择日期">
				</el-date-picker>
			</el-col>			
		</el-row>
		<el-row>
			<el-col :span="24">
                <el-button style="float: right; margin-right:10px;" @click="handleSearch" type="primary">查询</el-button>
                <el-button style="float: right;" @click="" type="primary">新增</el-button>
            </el-col>
		</el-row>
		<el-table
			:data="receiptData"
			stripe
			style="width: 100%;text-align:left;">
			<el-table-column
			prop="orderid" width="120px"
			label="订单号">
			</el-table-column>
			<el-table-column
			prop="procode" width="120px"
			label="商品编号">
			</el-table-column>
			<el-table-column
			prop="pname" width="120px"
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="unite" width="120px"
			label="单位">
			</el-table-column>
			<el-table-column
			prop="wasteproductcode" width="120px"
			label="损耗商品编码">
			</el-table-column>
			<el-table-column
			prop="productcount" width="120px"
			label="数量">
			</el-table-column>
			</el-table-column>
			<el-table-column
			prop="wastetype" width="120px"
			label="损耗类别">
			</el-table-column>
			<el-table-column
			prop="unincludeelse" width="120px"
			label="其他">
			</el-table-column>
			<el-table-column
			label="操作" width="120px">
			<template scope="scope">
				<el-button
				size="small"
				@click="handleEdit(scope.$index, scope.row)">修改</el-button>
				<el-button
				size="small"
				@click="handleEdit(scope.$index, scope.row)">删除</el-button>
			</template>
			</el-table-column>
		</el-table>
		<div class="Pagination" style="text-align: left;margin-top: 10px;">
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-size="10"
				layout="total, prev, pager, next"
				:total="count">
			</el-pagination>
		</div>
		</div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {getWasteAll, queryWasteList} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				value1: '',
				value2: '',
				procode: '',
				pname: '',
				wasteproductcode: '',
				createhuman: '',
				reporttime: '',
				city: {},
				receiptData: [],
				currentPage: '',
				count: ''
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
					const dataReceipt = await getWasteAll(1, 10)
					console.log('re: ',dataReceipt.data.data)
					this.receiptData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
    			}catch(err){
    				console.log(err);
    			}
    		},
			handleEdit(index,row) {
				console.log(index,row)
				this.$destroy()
				this.$router.push('/transportWasteDetails/'+ row.orderid)
			},
			async handleSearch(){
				let times = this.reporttime === '' ? '' : this.formatter(this.reporttime)
				const resData = await queryWasteList(this.procode,this.pname,this.wasteproductcode,this.createhuman,times)
				if(resData.data.code === '1111'){
					this.receiptData = resData.data.data.list
					this.count = resData.data.data.total
				} else {
					this.$message(resData.data.message)
					this.receiptData =""
					this.count = 0
				}
			},
			formatter(date){
				console.log(date.getMonth())
				let res = ''
				res += date.getFullYear()+ '-' + (date.getMonth() + 1) + '-' +date.getDate()
				return res
			},
			async handleCurrentChange(num){
				this.currentPage = num
				const dataReceipt = await getWasteAll(this.currentPage)
				this.receiptData = dataReceipt.data.data.list
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
