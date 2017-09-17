<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-table
			:data="receiptData"
			stripe
			style="text-align:left;margin-top:20px;">
			<el-table-column
			prop="proname" 
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="procode" 
			label="商品编码">
			</el-table-column>
			<el-table-column
			prop="protype" 
			label="商品类别">
			</el-table-column>
			<el-table-column
			prop="prostandard" 
			label="规格型号">
			</el-table-column>
			<el-table-column
			prop="prounite" 
			label="单位">
			</el-table-column>
			<el-table-column
			prop="ordercode" 
			label="B库采购需求编号">
			</el-table-column>
            <el-table-column
			prop="procount" 
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
    import {getAddPurchase, queryStockInList, getStockOutaDetails, makeStockOut} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				value1: '',
				value2: '',
				input: '',
				city: {},
                receiptData: [],
                repoList: [],
                form:{
                    respositysource: ''
				},
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
					const repos = await getStockOutaDetails(this.id)
					this.receiptData = repos.data.data
    			}catch(err){
    				console.log(err);
    			}
    		},
			handleEdit(index,row) {
				console.log(index,row)
				this.$destroy()
				this.$router.push('/stockInListDetails/'+ row.orderid)
			},
			async handleSearch(){
				// let sTime = this.formatter(this.value1)
				// let eTime = this.formatter(this.value2)
				// console.log(sTime)
				// console.log(eTime)
				// console.log(this.input)
				// const resData = await queryStockIn(this.input,sTime,eTime,1,10)
				// this.receiptData = resData.data.data.list
				// console.log(resData.data)
			},
			formatter(date){
				console.log(date.getMonth())
				let res = ''
				res += date.getFullYear()+ '-' + (date.getMonth() + 1) + '-' +date.getDate()
				return res
			},
			async chooseRepo() {
				const dataReceipt = await getAddPurchase(this.form.respositysource)
				if(dataReceipt.data.code === '1111'){
					this.receiptData = dataReceipt.data.data
					this.$message('查询未生单信息成功')
				}else {
					this.$message(dataReceipt.data.message)
					this.receiptData = []
				}
			},
			async addStockOut(){
				const addInfo = await makeStockOut(this.form.respositysource)
				if(addInfo.data.code === '1111'){
					this.$message('出库成功')
				}else {
					this.$message(addInfo.data.message)
				}
			},
			handleBack(){
                this.$destroy()
                this.$router.push('/stockOutA')
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
