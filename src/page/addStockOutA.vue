<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px;">
			<el-col :span="24">
				<el-button :disabled="toggle" @click="addStockOut">确认出库</el-button>
			</el-col>
		</el-row>
		<el-row style="margin-top: 20px;">
            <el-col :span="2" style="text-align:left;">去向：</el-col>
			<el-col :span="4">
                <el-select v-model="form.respositysource" @change="chooseRepo" placeholder="请选择仓库">
                    <el-option v-for="repo in repoList" :key="repo.id" :label="repo.reponame" :value="repo.reponame"></el-option>
                </el-select>
            </el-col>
            <el-button style="float: right;" @click="unable" type="primary">无法出库商品</el-button></el-col>
		</el-row>
		<el-table
			:data="receiptData"
			stripe
			style="text-align:left;">
			<el-table-column
			prop="pname"
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="productcode"
			label="商品编码">
			</el-table-column>
			<el-table-column
			prop="producttype"
			label="商品类别">
			</el-table-column>
			<el-table-column
			prop="productionstandard"
			label="规格型号">
			</el-table-column>
			<el-table-column
			prop="buyunite"
			label="单位">
			</el-table-column>
			<el-table-column
			prop="orderno"
			label="B库采购需求编号">
			</el-table-column>
            <el-table-column
			prop="buynumber"
			label="数量">
			</el-table-column>
            <el-table-column
			prop="infactbuynumber"
			label="当前库存量">
			</el-table-column>
			<el-table-column fixed="right"
				v-if="toggle1"
				label="操作" width="120px">
				<template scope="scope">
					<el-button
					size="small"
					@click="handleEdit(scope.$index, scope.row)">审批修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="Pagination" style="text-align: left;margin-top: 10px;font-size: 14px;">共 {{count}} 条</div>
		</div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {getAddPurchase, queryStockInList, getRepoAll, makeStockOut, getunable, gethandleEdit} from '@/api/getData'
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
				currentPage: 1,
				count: 0,
				toggle: true,
				toggle1: false,
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
					const repos = await getRepoAll()
					this.repoList = repos.data.data
//					this.count = repos.data.data.length
    			}catch(err){
    				console.log(err);
    			}
    		},
			async handleEdit(index,row) {
				console.log(index,row)
//				console.log(row.orderno)
//				console.log(row.productcode)
				const dataReceipt = await gethandleEdit(row.orderno,row.productcode)
				if(dataReceipt.data.code === '1111'){
					this.$message(dataReceipt.data.message)
				}else {
					this.$message(dataReceipt.data.message)
				}
			},
			async unable(){
				this.toggle= true
				this.toggle1 = true
				console.log(this.form.respositysource)
				const dataReceipt = await getunable(this.form.respositysource)
				if(dataReceipt.data.code === '1111'){
					this.receiptData = dataReceipt.data.data
					this.count = dataReceipt.data.data.length
					for(let i = 0;i<this.receiptData.length;i++){
						this.receiptData[i].state = "未发起审批"
					}
				}else {
					this.$message(dataReceipt.data.message)
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
			async chooseRepo() {
				this.toggle1 = false
				const dataReceipt = await getAddPurchase(this.form.respositysource)
				if(dataReceipt.data.code === '1111'){
					this.receiptData = dataReceipt.data.data
					this.count = dataReceipt.data.data.length
					this.$message('查询未生单信息成功')
					this.toggle= false
				}else {
					this.$message(dataReceipt.data.message)
					this.receiptData = []
					this.count = 0
				}
			},
			async addStockOut(){
				const addInfo = await makeStockOut(this.form.respositysource)
				if(addInfo.data.code === '1111'){
					this.$message('出库成功')
					this.receiptData = []
					this.count = 0
				}else {
					this.$message(addInfo.data.message)
				}
			},
			async handleCurrentChange(num){
				this.currentPage = num
				const dataReceipt =await getAddPurchase(this.form.respositysource,this.currentPage)
				if(dataReceipt.data.code === '1111'){
					this.receiptData = dataReceipt.data.data
					this.count = dataReceipt.data.data.length
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
</style>
