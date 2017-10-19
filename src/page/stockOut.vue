<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content" style="overflow:auto;">
		<el-row style="margin-top: 20px;">
			<el-col :span="20">
				出库日期：&nbsp;&nbsp;从
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
			<el-col :span="2" style="text-aligh:right;">客户ID</el-col>
			<el-col :span="6"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
			<el-col :span="16"><el-button style="float: right;" @click="handleSearch" type="primary">查询</el-button></el-col>
		</el-row>
		<el-table
			:data="receiptData"
			stripe
			style="text-align:left; margin-bottom:20px;">
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
    import {getStockOutAll, queryStockOut} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				value1: '',
				value2: '',
				input: '',
				city: {},
				receiptData: [],
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
        beforeRouteLeave (to, from, next) {
            this.$destroy()
            next()
        },
    	methods: {
    		async initData(){
    			try{
					const dataReceipt = await getStockOutAll(1,10)
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
				this.$router.push('/stockOutDetails/'+ row.outputrepositorycode)
			},
			async handleSearch(){
				this.get = 1
				this.count = 0
				let sTime = this.value1 === '' ? '' : this.formatter(this.value1)
				let eTime = this.value2 === '' ? '' : this.formatter(this.value2)
				const resData = await queryStockOut(this.input,sTime,eTime,1,10)
				if(resData.data.code === '1111'){
					this.receiptData = resData.data.data.list
					this.count = resData.data.data.total
				} else {
					this.$message(resData.data.message)
					this.receiptData = []
					this.count = 0
				}
			},
            async handleCurrentChange(num){
			    this.currentPage = num
                let sTime = this.value1 === '' ? '' : this.formatter(this.value1)
                let eTime = this.value2 === '' ? '' : this.formatter(this.value2)
				const dataReceipt = this.get = 0 ? await getStockOutAll(this.currentPage) : await queryStockOut(this.input,sTime,eTime,this.currentPage)
				if(dataReceipt.data.code === '1111'){
					this.receiptData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
				}else {
					this.receiptData = []
				}
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
