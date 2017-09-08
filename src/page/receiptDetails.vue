<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-table 
			:data="receiptData"
			stripe
			style="width: 100%;text-align:left; margin-top: 20px;">
			<el-table-column
			prop="orderdetailid" width="120px"
			label="订单明细ID">
			</el-table-column>
			<el-table-column
			prop="productid" width="120px"
			label="商品ID">
			</el-table-column>
			<el-table-column
			prop="productfullname" width="120px"
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="ordersid" width="120px"
			label="订单ID">
			</el-table-column>
			<el-table-column
			prop="ordersno" width="120px"
			label="订单号">
			</el-table-column>
			<el-table-column
			prop="memberprice" width="120px"
			label="成交价格">
			</el-table-column>
			<el-table-column
			prop="count" width="120px"
			label="数量">
			</el-table-column>
			<el-table-column
			prop="buytype" width="120px"
			label="购买类型">
			</el-table-column>
			<el-table-column
			prop="productcode" width="120px"
			label="商品编号">
			</el-table-column>
			<el-table-column
			prop="brandid" width="120px"
			label="商品品牌ID">
			</el-table-column>
			<el-table-column
			prop="shopinfoid" width="120px"
			label="店铺ID">
			</el-table-column>
			<el-table-column
			prop="customerid" width="120px"
			label="购买人ID">
			</el-table-column>
			<el-table-column
			prop="stockupdate" width="120px"
			label="预计出货日">
			</el-table-column>
			<el-table-column
			prop="sku" width="120px"
			label="SKU订货号">
			</el-table-column>
            <el-table-column
			prop="discount" width="120px"
			label="折扣比例">
			</el-table-column>
			<el-table-column
			prop="createtime" width="120px"
			label="订单生效时间">
			</el-table-column>
		</el-table>
		<el-row style="margin-top:20px;">
			<el-col :span="24" style="padding-left:94.5%; padding-right:0;">
				<el-button @click="handleBack" type="primary">返回</el-button>
			</el-col>
		</el-row>
		</div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {getOrderDetails} from '@/api/getData'
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
                id: this.$route.params.id
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
					const dataReceipt = await getOrderDetails(this.id)
					console.log('re: ',dataReceipt.data.data)
					this.receiptData = dataReceipt.data.data.list
    			}catch(err){
    				console.log(err);
    			}
            },
            handleBack(){
                this.$destroy()
                this.$router.push('/receiptCount')
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
