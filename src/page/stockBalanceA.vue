<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top: 20px;">
            <el-col :span="3" style="text-align:right;">商品编码：</el-col>
			<el-col :span="4"><el-input v-model="repocode" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="3" style="text-align:right;">商品名称：</el-col>
			<el-col :span="4"><el-input v-model="proname" siez="mini" placeholder="请输入内容"></el-input></el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-button style="float: left;" @click="whole">全部库存</el-button>
				<el-button style="float: left;" @click="greater">库存大于零</el-button>
				<el-button style="float: right;" @click="handleSearch" type="primary">查询</el-button>
			</el-col>
		</el-row>
		<el-table
			:data="receiptData"
			stripe
			style="text-align:left;">
			<el-table-column
			prop="repocode"
			label="商品编码">
			</el-table-column>
			<el-table-column
			prop="proname"
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="goodstype"
			label="商品分类">
			</el-table-column>
			<el-table-column
			prop="prostandard"
			label="规格型号">
			</el-table-column>
			<el-table-column
			prop="currentexist"
			label="库存单位现存量">
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
    import {getStockBalanceaAll, queryStockInList, queryBalanceB,queryGreater_a} from '@/api/getData'
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
				repocode: '',
				proname: '',
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
					const dataReceipt = await getStockBalanceaAll()
					console.log('re: ',dataReceipt.data.data)
					if(dataReceipt.data.code === '1111'){
						this.receiptData = dataReceipt.data.data.list
						this.count = dataReceipt.data.data.total
					}
    			}catch(err){
    				console.log(err);
    			}
    		},
			handleEdit(index,row) {
				console.log(index,row)
				this.$destroy()
				this.$router.push('/stockInListDetails/'+ row.orderid)
			},
			async whole(){
				this.get = 1
				this.count = 0
				const resData = await queryBalanceB()
				console.log(resData.data)
				if(resData.data.code === '1111'){
					this.receiptData = resData.data.data.list
					this.count = resData.data.data.total
				} else {
					this.$message(resData.data.message)
					this.receiptData =""
					this.count = 0
				}
			},
			async greater(){
				this.get = 2
				this.count = 0
				const resData = await queryGreater_a()
				console.log(resData.data)
				if(resData.data.code === '1111'){
					this.receiptData = resData.data.data.list
					this.count = resData.data.data.total
				} else {
					this.$message(resData.data.message)
					this.receiptData =""
					this.count = 0
				}
			},
			async handleSearch(){
				this.get = 1
				this.count = 0
				const resData = await queryBalanceB(this.repocode,this.proname)
				console.log(resData.data)
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
				let dataReceipt = {}
				if(this.get === 0){
					dataReceipt = await getStockBalanceaAll(this.currentPage)
				}else if(this.get === 1){
					dataReceipt = await queryBalanceB(this.repocode,this.proname,this.currentPage)
				}else if(this.get === 2){
					dataReceipt = await queryGreater_a(this.currentPage)
				}
				if(dataReceipt.data.code === '1111'){
					this.receiptData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
				}else {
					this.receiptData = []
					this.receiptData =""
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
</style>
