<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top: 20px;">
            <el-col :span="3" style="text-align:right;">商品名称：</el-col>
			<el-col :span="4"><el-input v-model="ordercode" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="3" style="text-align:right;">商品编码：</el-col>
			<el-col :span="4"><el-input v-model="ordercode" siez="mini" placeholder="请输入内容"></el-input></el-col>
			</el-row>
			<el-row style="margin-top: 20px;">
	            <el-col :span="3" style="text-align:right;">开始时间：</el-col>
				<el-col :span="4">
					<el-date-picker
				      v-model="startTime"
				      type="datetime"
				      placeholder="选择日期时间">
				    </el-date-picker>
				</el-col>
				<el-col :span="3" style="text-align:right;">结束时间：</el-col>
				<el-col :span="4">
					<el-date-picker
				      v-model="endTime"
				      type="datetime"
				      placeholder="选择日期时间">
				    </el-date-picker>
				</el-col>
        </el-row>
		<el-row>
			<el-col :span="24">
				<el-button style="float: right;" @click="handleSearch" type="primary">查询</el-button>
			</el-col>
		</el-row>
		<el-table
			:data="receiptData"
			stripe
			style="text-align:left;color: red;">
	        <el-table-column
	        type="index"
	        width="80"
	        label="序号">
	        </el-table-column>
			<el-table-column
			prop="outputcode" width="150px"
			label="批次">
			</el-table-column>
			<el-table-column
			prop="ordertime" width="180px"
			label="商品编码">
			</el-table-column>
			<el-table-column
			prop="customer" width="120px"
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="customer" width="120px"
			label="商品分类">
			</el-table-column>
			<el-table-column
			prop="customer" width="120px"
			label="规格型号">
			</el-table-column>
			<el-table-column
			prop="customer" width="120px"
			label="单位">
			</el-table-column>
			<el-table-column
			prop="customer" width="120px"
			label="现存量">
			</el-table-column>
			<el-table-column
			prop="customer" width="120px"
			label="入库时间">
			</el-table-column>
			<el-table-column
			prop="customer" width="120px"
			label="生产时间">
			</el-table-column>
			<el-table-column
			prop="customer" width="120px"
			label="保质期时间">
			</el-table-column>
			<el-table-column fixed="right"
			label="操作" >
			<template scope="scope">
				<el-button
				size="small"
				@click="handleEdit(scope.$index, scope.row)">调拨</el-button>
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
    import {getStockInAllB, queryStockIn} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				value1: '',
				value2: '',
				input: '',
				city: {},
				receiptData: [],
				currentPage: 1,
				count: 0,
				ordercode: '',
				ordertime: '',
				get: 0,
				startTime: '',
				endTime: '',
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
					const dataReceipt = await getStockInAllB()
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
				this.$router.push('/stockInDetails/'+ row.outputcode)
			},
			async handleSearch(){
				this.get = 1
				this.count = 0
    		    this.currentPage = 1
				let sTime = this.ordertime === '' ? '' : this.formatter(this.ordertime)
				const resData = await queryStockIn(this.ordercode,sTime,this.currentPage)
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
                let sTime = this.ordertime === '' ? '' : this.formatter(this.ordertime)
				const dataReceipt = this.get === 0 ? await getStockInAllB('','','','',this.currentPage) : await queryStockIn(this.ordercode,sTime,this.currentPage)
				if(dataReceipt.data.code === '1111'){
					this.receiptData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
				}else {
					this.receiptData = []
					this.count = 0
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
	.el-table_1_column_11{
   		color: red !important;
	}
	.is-leaf{
   		color: red !important;
	}
</style>
