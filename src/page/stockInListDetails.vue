<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
        <el-row style="margin-top: 20px;">
			<el-col :span="8">
				单据编号：&nbsp;{{receiptData[0].orderid}}
			</el-col>
            <el-col :span="8">
				单据日期：&nbsp;{{receiptData[0].ordertime}}
			</el-col>
            <el-col :span="8">
				默认仓库：&nbsp;{{receiptData[0].defaultrepository}}
			</el-col>
		</el-row>
        <el-row>
			<el-col :span="8">
				采购员：&nbsp;{{receiptData[0].buyhuman}}
			</el-col>
            <el-col :span="8">
				采购类型：&nbsp;{{receiptData[0].buytype}}
			</el-col>
            <el-col :span="8">
				采购部门：&nbsp;{{receiptData[0].buydepartment}}
			</el-col>
		</el-row>
        <el-row>
			<el-col :span="8">
				发运方式：&nbsp;{{receiptData[0].sendtype}}
			</el-col>
		</el-row>
		<el-table 
			:data="receiptData"
			stripe
			style="width: 840px;text-align:left; margin-top: 20px;">
			<el-table-column
			prop="goodsname" width="120px"
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="storagecode" width="120px"
			label="商品编码">
			</el-table-column>
			<el-table-column
			prop="storagetype" width="120px"
			label="商品分类">
			</el-table-column>
			<el-table-column
			prop="prostandered" width="120px"
			label="规格型号">
			</el-table-column>
			<el-table-column
			prop="prounite" width="120px"
			label="单位">
			</el-table-column>
			<el-table-column
			prop="repositories" width="120px"
			label="仓库">
			</el-table-column>
			<el-table-column
			prop="pronumber" width="120px"
			label="数量">
			</el-table-column>
		</el-table>
		<el-row style="margin-top:20px;">
			<el-col :span="24">
				<el-button style="float:right;" @click="handleBack" type="primary">返回</el-button>
			</el-col>
		</el-row>
		</div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {getStockInListDetails} from '@/api/getData'
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
                headData:{}
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
                    const dataReceiptDetails = await getStockInListDetails(this.id)
                    console.log('re: ',dataReceiptDetails.data.data)
                    this.receiptData.push(dataReceiptDetails.data.data)
    			}catch(err){
    				console.log(err);
    			}
            },
            handleBack(){
                this.$destroy()
                this.$router.push('/stockInList')
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
