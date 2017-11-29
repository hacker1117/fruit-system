<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top: 20px;">
            <el-col :span="2" style="text-align:right;">商品名称：</el-col>
			<el-col :span="4">
				<el-select v-model="form.productindex" placeholder="请选择商品名称" @change="handleSearch">
                    <el-option v-for="(goods,index) in goodsList" :key="goods.id" :label="goods.pname" :value="index"></el-option>
                </el-select>
			</el-col>
			<el-button style="float: right;" @click="handleSearch" type="primary">查询</el-button>
		</el-row>
		<el-table
			:data="receiptData"
			stripe
			style="width: 100%;text-align:left;">
			<el-table-column
			prop="pname" width="120px"
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="productcode" width="120px"
			label="商品编码">
			</el-table-column>
			<el-table-column
			prop="respositysource" width="120px"
			label="仓库来源">
			</el-table-column>
			<el-table-column
			prop="productionstandard" width="120px"
			label="规格">
			</el-table-column>
			<el-table-column
			prop="buydepartmentid" width="120px"
			label="采购部门">
			</el-table-column>
			<el-table-column
			prop="buyunite" width="120px"
			label="单位">
			</el-table-column>
			</el-table-column>
			<el-table-column
			prop="buynumber" width="120px"
			label="采购数量">
			</el-table-column>
			<el-table-column
			prop="aexistamount" width="120px"
			label="A库库存">
			</el-table-column>
			<el-table-column
			prop="advisebuynumber" width="120px"
			label="建议采购量">
			</el-table-column>
		</el-table>
		<el-row style="margin-top:20px;">
			<el-col :span="24" >
				<el-button
				size="small"
				:disabled="isDisabled"
				@click="handleEdit()">生成采购单</el-button>
			</el-col>
		</el-row>
		<el-row style="margin-top:40px; ">
		  <el-col :span="24"><h2>未生单商品列表</h2></el-col>
		</el-row>
		<el-table
			:data="notCreatedData"
			stripe
			style="margin-top:20px; width: 100%;text-align:left;">
			<el-table-column
			prop="pname" width="120px"
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="productcode" width="120px"
			label="商品编码">
			</el-table-column>
			<el-table-column
			prop="respositysource" width="120px"
			label="仓库来源">
			</el-table-column>
			<el-table-column
			prop="productionstandard" width="120px"
			label="规格">
			</el-table-column>
			<el-table-column
			prop="buydepartmentid" width="120px"
			label="采购部门">
			</el-table-column>
			<el-table-column
			prop="buyunite" width="120px"
			label="单位">
			</el-table-column>
			</el-table-column>
			<el-table-column
			prop="buynumber"
			label="采购数量">
			</el-table-column>
		</el-table>
		</div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {getPurchaseSumList, getPurchaseSumListByName, makePurchaseOrder, getPurchaseSumGoods} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				value1: '',
				value2: '',
				input: '',
				city: {},
				receiptData: [],
				notCreatedData:[],
				pname: [],
				goodsList: [],
				form: {
					productindex:''
				},
				isDisabled:true
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
					const dataReceipt = await getPurchaseSumList()
					console.log('re: ',dataReceipt.data.data)
					if(dataReceipt.data.code === '1111'){
						this.notCreatedData = dataReceipt.data.data.list
					} else {
						this.notCreatedData = []
					}
					const goodsList = await getPurchaseSumGoods()
					if(goodsList.data.code === '1111'){
						this.goodsList = goodsList.data.data
					}else {
						this.goodsList = []
					}
    			}catch(err){
    				console.log(err);
    			}
    		},
			async handleEdit() {
				let row = this.receiptData[this.receiptData.length-1]
				console.log(row.producttype)
				const makeInfo = await makePurchaseOrder(this.goodsList[this.form.productindex].pname, row.productcode, row.supplierid, row.aexistamount, row.advisebuynumber, row.producttype)
				if(makeInfo.data.code === '1111'){
					this.$message('生成采购单成功')
					this.isDisabled = true
					this.receiptData = []
					this.initData()
				}else {
					this.$message(makeInfo.data.message)
				}
			},
			async handleSearch(){
				const purchaseReceipt = await getPurchaseSumListByName(this.goodsList[this.form.productindex].productcode)
				console.log('re: ',purchaseReceipt.data.data)
				if(purchaseReceipt.data.code === '1111'){
					this.receiptData = purchaseReceipt.data.data
					this.isDisabled = false
				}else {
					this.$message(purchaseReceipt.data.message)
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
