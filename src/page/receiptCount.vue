<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
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
			<el-col :span="16">
				<el-button style="float: right;" @click="handleSearch" type="primary">查询</el-button>
				<el-button style="float: right;margin-right: 20px;" @click="abnormal" type="primary">批量转异常单</el-button>
			</el-col>
		</el-row>
		 <el-table
		    ref="multipleTable"
			:data="receiptData"
			stripe
		    @selection-change="handleSelectionChange"
			style="margin-top:20px;text-align:left;">
		    <el-table-column
		    type="selection"
		    width="55">
		    </el-table-column>
			<el-table-column
			prop="ordersstate" width="120px"
			label="订单状态">
			</el-table-column>
			<el-table-column
			prop="ordersid" width="120px"
			label="订单ID">
			</el-table-column>
			<el-table-column
			prop="customerid" width="120px"
			label="客户ID">
			</el-table-column>
			<el-table-column
			prop="shopinfoid" width="120px"
			label="店铺ID">
			</el-table-column>
			<el-table-column
			prop="totalordersno" width="120px"
			label="总订单号">
			</el-table-column>
			<el-table-column
			prop="ordersno" width="120px"
			label="订单号">
			</el-table-column>
			<el-table-column
			prop="createtime" width="120px"
			label="订单生成时间">
			</el-table-column>
			<el-table-column
			prop="updatetime" width="120px"
			label="订单修改时间">
			</el-table-column>
			<el-table-column
			prop="address" width="120px"
			label="收货详细地址">
			</el-table-column>
			<el-table-column
			prop="consignee" width="120px"
			label="收货人">
			</el-table-column>
			<el-table-column
			prop="bestsenddate" width="120px"
			label="最佳配送时间">
			</el-table-column>
			<el-table-column
			prop="sendtype" width="120px"
			label="配送方式">
			</el-table-column>
			<el-table-column
			prop="comments" width="120px"
			label="订单附言">
			</el-table-column>
			<el-table-column
			prop="ordersource" width="120px"
			label="订单来源">
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
    import {getOrderAll, queryOrders,sendAbnormal} from '@/api/getData'
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
                count: 0,
                currentPage: 1,
				get: 0,
                multipleSelection: [],
                receipt: [],
                orders: "",
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
					const dataReceipt = await getOrderAll(this.currentPage)
					console.log('re: ',dataReceipt.data.data)
					this.receiptData = dataReceipt.data.data.list
                    this.count = dataReceipt.data.data.total
                    for(var i = 0;i<this.receiptData.length;i++){
						switch(this.receiptData[i].ordersstate){
						case 0:
						  this.receiptData[i].ordersstate = "待处理";
						  break;
						case 1:
						  this.receiptData[i].ordersstate = "未处理";
						  break;
						case 2:
						  this.receiptData[i].ordersstate = "付款成功";
						  break;
						case 3:
						  this.receiptData[i].ordersstate = "正在配货";
						  break;
						case 4:
						  this.receiptData[i].ordersstate = "已经发货";
						  break;
						case 5:
						  this.receiptData[i].ordersstate = "收货确认";
						  break;
						case 6:
						  this.receiptData[i].ordersstate = "确认作废";
						  break;
						case 7:
						  this.receiptData[i].ordersstate = "异常订单";
						  break;
						case 8:
						  this.receiptData[i].ordersstate = "修改订单";
						  break;
						case 9:
						  this.receiptData[i].ordersstate = "已评价";
						  break;
						}
                    }
    			}catch(err){
    				console.log(err);
    			}
    		},
			handleEdit(index,row) {
				console.log(index,row)
				this.$destroy()
				this.$router.push('/receiptDetails/'+ row.ordersid)
			},
            handleSelectionChange(val) {
                this.multipleSelection = val
                console.log(val)
            },
			async abnormal(){
				this.receipt = this.multipleSelection.concat()
                for(let i = 0; i<this.receipt.length; i++){
 					  this.orders += this.receipt[i].ordersid + ","
                }
				const resData = await sendAbnormal(this.orders)
				console.log(resData.data)
				if(resData.data.code === '1111'){
					this.$message(resData.data.message)
					this.initData()
				} else {
					this.$message(resData.data.message)
				}
			},
			async handleSearch(){
				this.get = 1
				this.count = 0
				let radioCon =''
				console.log(this.value1)
				console.log(this.value2)
				let sTime = this.value1 === '' ? '' : this.formatter(this.value1)
				let eTime = this.value2 === '' ? '' : this.formatter(this.value2)
				if(this.radio2 === 1) {
					radioCon = '未完成'
				}else if(this.radio2 === 2) {
					radioCon = '已完成'
				}
				const resData = await queryOrders(this.input,radioCon,sTime,eTime,1,10)
				if(resData.data.code === '1111'){
					this.receiptData = resData.data.data.list
					this.count = resData.data.data.total
				} else {
					this.$message(resData.data.message)
					this.receiptData = []
					this.count = 0
				}
				for(var i = 0;i<this.receiptData.length;i++){
						switch(this.receiptData[i].ordersstate){
						case 0:
						  this.receiptData[i].ordersstate = "待处理";
						  break;
						case 1:
						  this.receiptData[i].ordersstate = "未处理";
						  break;
						case 2:
						  this.receiptData[i].ordersstate = "付款成功";
						  break;
						case 3:
						  this.receiptData[i].ordersstate = "正在配货";
						  break;
						case 4:
						  this.receiptData[i].ordersstate = "已经发货";
						  break;
						case 5:
						  this.receiptData[i].ordersstate = "收货确认";
						  break;
						case 6:
						  this.receiptData[i].ordersstate = "确认作废";
						  break;
						case 7:
						  this.receiptData[i].ordersstate = "异常订单";
						  break;
						case 8:
						  this.receiptData[i].ordersstate = "修改订单";
						  break;
						case 9:
						  this.receiptData[i].ordersstate = "已评价";
						  break;
						}
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
                let radioCon =''
                let sTime = this.value1 === '' ? '' : this.formatter(this.value1)
                let eTime = this.value2 === '' ? '' : this.formatter(this.value2)
              if(this.radio2 === 1) {
                    radioCon = '未完成'
                }else if(this.radio2 === 2) {
                    radioCon = '已完成'
                }
				const dataReceipt = this.get = 0 ? await getOrderAll(this.currentPage) : await queryOrders(this.input,radioCon,sTime,eTime,this.currentPage)
				if(dataReceipt.data.code === '1111'){
					this.receiptData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
				} else {
					this.receiptData = []
				}
				for(var i = 0;i<this.receiptData.length;i++){
						switch(this.receiptData[i].ordersstate){
						case 0:
						  this.receiptData[i].ordersstate = "待处理";
						  break;
						case 1:
						  this.receiptData[i].ordersstate = "未处理";
						  break;
						case 2:
						  this.receiptData[i].ordersstate = "付款成功";
						  break;
						case 3:
						  this.receiptData[i].ordersstate = "正在配货";
						  break;
						case 4:
						  this.receiptData[i].ordersstate = "已经发货";
						  break;
						case 5:
						  this.receiptData[i].ordersstate = "收货确认";
						  break;
						case 6:
						  this.receiptData[i].ordersstate = "确认作废";
						  break;
						case 7:
						  this.receiptData[i].ordersstate = "异常订单";
						  break;
						case 8:
						  this.receiptData[i].ordersstate = "修改订单";
						  break;
						case 9:
						  this.receiptData[i].ordersstate = "已评价";
						  break;
						}
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
