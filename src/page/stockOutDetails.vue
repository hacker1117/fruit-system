<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
        <el-row style="margin-top: 20px;">
			<el-col :span="8">
				出库单号：&nbsp;{{headData.outputrepositorycode}}
			</el-col>
            <el-col :span="8">
				出库时间：&nbsp;{{headData.outdate}}
			</el-col>
            <el-col :span="8">
				收货人名称：&nbsp;{{headData.consignee}}
			</el-col>
		</el-row>
        <el-row>
			<el-col :span="8">
				订单编号：&nbsp;{{headData.ordersno}}
			</el-col>
            <el-col :span="8">
				验收单号：&nbsp;{{headData.acceptanceformcode}}
			</el-col>
            <el-col :span="8">
				客户ID：&nbsp;{{headData.customerid}}
			</el-col>
		</el-row>
        <el-row>
			<el-col :span="8">
				当前库存编号：&nbsp;{{headData.repocode}}
			</el-col>
            <el-col :span="8">
				详细地址：&nbsp;{{headData.address}}
			</el-col>
            <el-col :span="8">
				所属区域：&nbsp;
			</el-col>
		</el-row>
        <el-row>
			<el-col :span="8">
				出库合计商品数量：&nbsp;{{headData.totalproducts}}
			</el-col>
            <el-col :span="8">
				订单生成时间：&nbsp;{{headData.createtime}}
			</el-col>
            <el-col :span="8">
				批次：&nbsp;{{headData.batchcount}}
			</el-col>
		</el-row>
        <el-row>
			<el-col :span="8">
				订单附言：&nbsp;{{headData.comments}}
			</el-col>
		</el-row>
		<el-table 
			:data="receiptData"
			stripe
			style="width: 840px;text-align:left; margin-top: 20px;">
			<el-table-column
			prop="handlingordercode" width="120px"
			label="加工单号">
			</el-table-column>
			<el-table-column
			prop="productcode" width="120px"
			label="商品编号">
			</el-table-column>
			<el-table-column
			prop="proname" width="120px"
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="prostandard" width="120px"
			label="规格">
			</el-table-column>
			<el-table-column
			prop="prounite" width="120px"
			label="单位">
			</el-table-column>
			<el-table-column
			prop="usecount" width="120px"
			label="出库数量">
			</el-table-column>
			<el-table-column
			prop="outdate" width="120px"
			label="出库时间">
			</el-table-column>
		</el-table>
		<el-row style="margin-top:20px;">
			<el-col :span="24">
				<a :href="toPrint"><el-button style="float:right; margin-left:20px;" type="primary">预览打印</el-button></a>
				<el-button style="float:right;" @click="handleBack" type="primary">返回</el-button>
			</el-col>
		</el-row>
		</div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {getStockOutDetailsHead, getStockOutDetailsDetail} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				radio2: 3,
				value1: '',
				value2: '',
				input: '',
				city: {},
                receiptData: [],
                id: this.$route.params.id,
				headData:{},
				toPrint:'http://47.95.12.49:9001/print/z_print.html?' + this.$route.params.id
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
					const dataReceipt = await getStockOutDetailsHead(this.id)
                    console.log('re: ',dataReceipt.data.data)
                    this.headData = dataReceipt.data.data
                    const dataReceiptDetails = await getStockOutDetailsDetail(this.id)
                    console.log('re: ',dataReceiptDetails.data.data)
                    this.receiptData = dataReceiptDetails.data.data
    			}catch(err){
    				console.log(err);
    			}
            },
            handleBack(){
                this.$destroy()
                this.$router.push('/stockOut')
			},
			handlePrint(){
				this.$router.go('https://www.baidu.com')
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
