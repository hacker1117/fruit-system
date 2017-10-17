<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top: 20px;">
			<el-col :span="2" style="text-aligh:right;">批次:</el-col>
			<el-col :span="6">
				<el-select v-model="batchID" placeholder="请选择批次">
					<el-option v-for="(item,index) in batchData" :key="item.id" :label="item" :value="item"></el-option>
				</el-select>
			</el-col>
			<el-col :span="16"><el-button style="float: right;" @click="handleBatchSearch" type="primary">按批次查询</el-button></el-col>
		</el-row>
		<el-row style="margin-top: 20px;">
			<el-col :span="4">
				<el-radio-group v-model="radio2">
					<el-radio :label="1">未完成</el-radio>
					<el-radio :label="2">已完成</el-radio>
				</el-radio-group>
			</el-col>
			<el-col :span="20">
				日期：&nbsp;&nbsp;从
				<el-date-picker
				v-model="value1"
				type="date"
				format="yyyy-MM-dd"
				placeholder="选择日期">
				</el-date-picker>
				&nbsp;至
				<el-date-picker
				v-model="value2"
				type="date"
				format="yyyy-MM-dd"
				placeholder="选择日期">
				</el-date-picker>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="2" style="text-aligh:right;">订单号：</el-col>
			<el-col :span="6"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
			<el-col :span="16"><el-button style="float: right;" @click="handleSearch" type="primary">条件查询</el-button></el-col>
		</el-row>
		<el-table
			:data="receiptData"
			stripe
			style="width: 100%;text-align:left;">
			<el-table-column
			prop="orderdetailid" width="120px"
			label="订单明细ID">
			</el-table-column>
			<el-table-column
			prop="ordersId" width="120px"
			label="订单ID">
			</el-table-column>
			<el-table-column
			prop="customerid" width="120px"
			label="购买人ID">
			</el-table-column>
			<el-table-column
			prop="proid" width="120px"
			label="商品ID">
			</el-table-column>
            <el-table-column
			prop="ordersno" width="120px"
			label="订单号">
			</el-table-column>
			<el-table-column
			prop="level" width="120px"
			label="级别">
			</el-table-column>
			<el-table-column
			prop="productcode" width="120px"
			label="商品编号">
			</el-table-column>
			<el-table-column
			prop="brand" width="120px"
			label="商品品牌">
			</el-table-column>
			<el-table-column
			prop="proname" width="120px"
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="pname" width="120px"
			label="商品归属">
			</el-table-column>
			<el-table-column
			prop="pitposition" width="120px"
			label="坑位">
			</el-table-column>
			<el-table-column
			prop="streamno" width="120px"
			label="流水号">
			</el-table-column>
			<el-table-column
			prop="uname" width="120px"
			label="分拣员">
			</el-table-column>
			<el-table-column
			prop="isComplete" width="120px"
			label="状态">
			</el-table-column>
			<el-table-column
			prop="odate" width="120px"
			label="开始时间">
			</el-table-column>
            <el-table-column
			prop="completiondate" width="120px"
			label="完成时间">
			</el-table-column>
            <el-table-column
			prop="count" width="120px"
			label="单品数量">
			</el-table-column>
            <el-table-column
			prop="assemblelinecode" width="120px"
			label="流水线">
			</el-table-column>
            <el-table-column
			prop="prounite" width="120px"
			label="单位">
			</el-table-column>
            <el-table-column
			prop="remark" width="120px"
			label="备注">
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
    import {getPlanAll, getBatchAll, queryPlanByBatch, queryPlan} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				radio2: 0,
				value1: '',
				value2: '',
				input: '',
				city: {},
				receiptData: [],
				batchData:[],
				batchID:'',
                count: 0,
                currentPage: 1,
				get: 0,
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
					const dataReceipt = await getPlanAll(this.currentPage)
					if(dataReceipt.data.code === '1111'){
						this.receiptData = dataReceipt.data.data.list
                        this.count = dataReceipt.data.data.total
					} else {
						console.log('获取生产计划数据出错')
					}
					const dataBatch = await getBatchAll()
					if(dataBatch.data.code === '1111'){
						this.batchData = dataBatch.data.data
					}else {
						console.log('获取生产计划批次出错')
					}
    			}catch(err){
    				console.log(err);
    			}
			},
			async handleBatchSearch() {
				this.get = 1
				this.count = 0
				const resData = await queryPlanByBatch(this.batchID)
				if(resData.data.code === '1111'){
					this.receiptData = resData.data.data.list
					this.count = resData.data.data.total
				} else {
					this.$message(resData.data.message)
					this.receiptData = []
					this.count = 0
				}
			},
			handleEdit(index,row) {
				console.log(index,row)
				this.$destroy()
				this.$router.push('/receiptDetails/'+ row.ordersid)
			},
			async handleSearch(){
				this.get = 2
				this.count = 0
				let radioCon =''
				let sTime = this.value1 === '' ? '' : this.formatter(this.value1)
				let eTime = this.value2 === '' ? '' : this.formatter(this.value2)
				console.log(sTime)
				console.log(eTime)
				console.log(this.input)
				console.log(this.radio2)
				if(this.radio2 === 1) {
					radioCon = '未完成'
				}else if(this.radio2 === 2) {
					radioCon = '已完成'
				}
				const resData = await queryPlan(this.input,radioCon,sTime,eTime,1,10)
				if(resData.data.code === '1111'){
					this.receiptData = resData.data.data.list
					this.count = resData.data.data.total
				} else {
					this.$message(resData.data.message)
					this.receiptData = []
					this.count = 0
				}
			},
			formatter(date){
				console.log(date.getMonth())
				let res = ''
				res += date.getFullYear()+ '-' + (date.getMonth() + 1) + '-' +date.getDate()
				return res
			},
            async handleCurrentChange(num) {
			    this.currentPage = num
                let dataReceipt = {}
				if(this.get === 0){
                    dataReceipt = await getPlanAll(this.currentPage)
				}else if(this.get === 1){
                    dataReceipt = await queryPlanByBatch(this.batchID,this.currentPage)
				}else{
                    let radioCon =''
                    if(this.radio2 === 1) {
                        radioCon = '未完成'
                    }else if(this.radio2 === 2) {
                        radioCon = '已完成'
                    }
                    let sTime = this.value1 === '' ? '' : this.formatter(this.value1)
                    let eTime = this.value2 === '' ? '' : this.formatter(this.value2)
                    dataReceipt = await queryPlan(this.input,radioCon,sTime,eTime,this.currentPage)
				}
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
