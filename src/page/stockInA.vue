<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px;">
			<el-col :span="24">
				<el-button @click="handleAdd" >新增入库单</el-button>
			</el-col>
		</el-row>
        <el-dialog title="加工损耗" v-model="dialogFormVisible">
	        <el-form :model="form">
				<el-form-item label="单据编号：" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form.storgeaid" auto-complete="off" :disabled="true"></el-input>
	            </el-form-item>
	            <el-form-item label="净重量：" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form.netweight" auto-complete="off" :disabled="true"></el-input>
	            </el-form-item>
	            <el-form-item label="损耗：" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form.workwastecount" auto-complete="off"></el-input>
	            </el-form-item>
	        </el-form>
	        <div slot="footer" class="dialog-footer">
	            <el-button @click="dialogFormVisible = false">取 消</el-button>
	            <el-button type="primary" @click="confirmAdd">确 定</el-button>
	        </div>
        </el-dialog>
		<el-row style="margin-top: 20px;">
            <el-col :span="3" style="text-align:right;">单据编号：</el-col>
			<el-col :span="4"><el-input v-model="storgeaid" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="3" style="text-align:right;">单据日期：</el-col>
			<el-col :span="4">
				<el-date-picker
				v-model="ordertime"
				type="date"
				format="yyyy-MM-dd"
				placeholder="选择日期">
				</el-date-picker>
			</el-col>
			<el-col :span="3" style="text-align:right;">商品名称：</el-col>
			<el-col :span="4"><el-input v-model="storagename" siez="mini" placeholder="请输入内容"></el-input></el-col>
		</el-row>
		<el-row>
			<el-col :span="24"><el-button style="float: right;" @click="handleSearch" type="primary">查询</el-button></el-col>
		</el-row>
		<el-table
			:data="receiptData"
			stripe
			style="width: 100%;text-align:left;">
			<el-table-column
			prop="storgeaid" width="120px"
			label="单据编号">
			</el-table-column>
			<el-table-column
			prop="storagename" width="120px"
			label="入库商品">
			</el-table-column>
			<el-table-column
			prop="visualreposity" width="120px"
			label="虚拟库">
			</el-table-column>
			<el-table-column
			prop="netweight" width="120px"
			label="净重量">
			</el-table-column>
			<el-table-column
			prop="prounite" width="120px"
			label="单位">
			</el-table-column>
			<el-table-column
			prop="perprice" width="120px"
			label="单价">
			</el-table-column>
			<el-table-column
			prop="totalmoney" width="120px"
			label="总价">
			</el-table-column>
			<el-table-column
			prop="prostandered" width="120px"
			label="规格">
			</el-table-column>
			<el-table-column
			prop="ordertime" width="120px"
			label="单据日期">
			</el-table-column>
			<el-table-column
			prop="storagetype" width="120px"
			label="入库类别">
			</el-table-column>
			</el-table-column>
			<el-table-column
			prop="supplierid" width="120px"
			label="供应商">
			</el-table-column>
			<el-table-column
			prop="remarkable" width="120px"
			label="备注">
			</el-table-column>
			<el-table-column fixed="right"
			label="操作" width="120px">
			<template scope="scope">
				<el-button
				size="small"
				@click="handleEdit(scope.$index, scope.row)">加工损耗</el-button>
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
    import {getStockInaAll, queryStockInaAll,addStockInaA} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				value1: '',
				value2: '',
				input: '',
				city: {},
				receiptData: [],
				ordernumber: '',
				storgeaid: '',
				ordertime: '',
				storagename: '',
				currentPage: 1,
				count: 0,
				get: 0,
				dialogFormVisible: false,
				formLabelWidth: '120px',
				form: {
					storgeaid: '',
					netweight: '',
					workwastecount: '',
				},
				ind: 0,
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		this.initData();
    	},
        beforeRouteLeave (to, from, next) {
            this.$destroy()
            next()
        },
    	methods: {
    		async initData(){
    			try{
					const dataReceipt = await getStockInaAll()
					this.receiptData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
    			}catch(err){
    				console.log(err);
    			}
    		},
			 handleEdit(index,row) {
			 	this.dialogFormVisible = true
			 	this.form=row
			 	this.ind=index
			 },
			async confirmAdd(){
//				console.log(this.receiptData[this.ind])
//				console.log(this.receiptData[this.ind].storgeaid)
//				this.tableData[this.ind].infactcount=this.form.workwastecount
				const resData = await addStockInaA(this.receiptData[this.ind].storgeaid,this.receiptData[this.ind].storagename,this.receiptData[this.ind].visualreposity,this.receiptData[this.ind].netweight,this.receiptData[this.ind].prounite,this.receiptData[this.ind].perprice,this.receiptData[this.ind].totalmoney,this.receiptData[this.ind].prostandered,this.receiptData[this.ind].ordertime,this.receiptData[this.ind].storagetype,this.receiptData[this.ind].supplierid,this.receiptData[this.ind].remarkable,this.form.workwastecount)
				if(resData.data.code === '1111'){
					this.$message('成功')
//					this.$message(resData.data.message)
				} else {
					this.$message(resData.data.message)
				}
				this.dialogFormVisible = false
			},
			async handleSearch(){
				this.get = 1
				this.count = 0
				let cTime = this.ordertime === '' ? '' : this.formatter(this.ordertime)
				const resData = await queryStockInaAll(this.storgeaid,cTime,this.storagename)
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
			handleAdd() {
				this.$destroy()
				this.$router.push('/stockInADetails')
			},
			async handleCurrentChange(num){
				this.currentPage = num
				let cTime = this.ordertime === '' ? '' : this.formatter(this.ordertime)
				const dataReceipt = this.get = 0 ? await getStockInaAll(this.currentPage) : await queryStockInaAll(this.storgeaid,cTime,this.storagename,this.currentPage)
				if(dataReceipt.data.code === '1111'){
					this.receiptData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
				}else {
					this.receiptData = []
				}
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
