<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px;">
			<el-col :span="24">
				<el-button @click="dialogFormVisible = true" >新增采购单</el-button>
			</el-col>
		</el-row>
        <el-dialog title="新增采购单" v-model="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="商品名称" :label-width="formLabelWidth">
				<el-autocomplete
				v-model="form.goodsName"
				:fetch-suggestions="querySearchAsync"
				placeholder="请输入名称模糊搜索"
				@select="handleAddChild"
				></el-autocomplete>
           </el-form-item>
			<el-form-item label="商品编码" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.proid" auto-complete="off" :disabled="true"></el-input>
           </el-form-item>
			<el-form-item label="申请人" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="adminInfo.uname" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
			<el-form-item label="规格" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.prostandered" auto-complete="off" :disabled="true"></el-input>
           </el-form-item>
			<el-form-item label="单位" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.pronuite" auto-complete="off" :disabled="true"></el-input>
           </el-form-item>
			<el-form-item label="采购量" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.buynumber" auto-complete="off"><template slot="append">{{this.pronuite}}</template></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </div>
        </el-dialog>
        <el-dialog title="修改采购数量" v-model="dialogFormVisible1">
	        <el-form :model="form1">
				<el-form-item label="订单编号" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form1.orderno" auto-complete="off" :disabled="true"></el-input>
	          </el-form-item>
				<el-form-item label="商品编码" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form1.productcode" auto-complete="off" :disabled="true"></el-input>
	          </el-form-item>
				<el-form-item label="商品名称" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form1.pname" auto-complete="off" :disabled="true"></el-input>
	          </el-form-item>
				<el-form-item label="最大采购量" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form1.advisebuynumber" auto-complete="off" :disabled="true"></el-input>
	          </el-form-item>
				<el-form-item label="修改后数量" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form1.buynumber" auto-complete="off"></el-input>
	          </el-form-item>
	        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="modifyPurchasing">确 定</el-button>
        </div>
        </el-dialog>
		<el-row style="margin-top: 20px;">
            <el-col :span="3" style="text-align:right;">订单编号：</el-col>
			<el-col :span="4"><el-input v-model="orderno" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="3" style="text-align:right;">单据日期：</el-col>
			<el-col :span="4">
				<el-date-picker
				v-model="createtime"
				type="date"
				format="yyyy-MM-dd"
				placeholder="选择日期">
				</el-date-picker>
			</el-col>
            <el-col :span="3" style="text-align:right;">采购部门：</el-col>
			<el-col :span="4"><el-input v-model="buydepartmentid" siez="mini" placeholder="请输入内容"></el-input></el-col>
		</el-row>
		<el-row style="margin-top: 20px;">
            <el-col :span="3" style="text-align:right;">仓库来源：</el-col>
			<el-col :span="4"><el-input v-model="respositysource" siez="mini" placeholder="请输入内容"></el-input></el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-button style="float: left;" @click="defaultPurchase ">默认采购单</el-button>
				<el-button style="float: left;" @click="examination">待修改采购单</el-button>
				<el-button style="float: right;" @click="handleSearch" type="primary">查询</el-button>
			</el-col>
		</el-row>
		<el-table
			:data="receiptData"
			stripe
			style="width: 100%;text-align:left;">
			<el-table-column
			prop="orderno"
			label="订单编号">
			</el-table-column>
			<el-table-column
			prop="respositysource"
			label="仓库来源">
			</el-table-column>
			<el-table-column
			prop="pname"
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="productcode"
			label="商品编码">
			</el-table-column>
			<el-table-column
			prop="buynumber"
			label="采购量">
			</el-table-column>
			<el-table-column
			v-if="toggle"
			prop="advisebuynumber"
			label="最大采购量">
			</el-table-column>
			<el-table-column
			prop="buydepartmentid"
			label="申请部门">
			</el-table-column>
			<el-table-column
			prop="buyer"
			label="申请人">
			</el-table-column>
			<el-table-column
			prop="createtime"
			label="创建时间">
			</el-table-column>
			<el-table-column fixed="right"
				v-if="toggle"
				label="操作" width="120px">
				<template scope="scope">
					<el-button
					size="small"
					@click="handleEdit(scope.$index, scope.row)">修改采购量</el-button>
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
    import {mapActions, mapState} from 'vuex'
    import {getPuschaseOrderB, queryStockInList, addPurchaseOrderB, getProList, getRepoAll, getPendingModification, getmodifyPurchasing_b} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				value1: '',
				value2: '',
				input: '',
				city: {},
				receiptData: [],
				form: {
					goodsName: '',
					proid: '',
					prostandered: '',
					pronuite: '',
					buynumber: '',
				},
				form1: {
					productcode: '',
					pname: '',
					advisebuynumber: '',
					buynumber: '',
				},
				dialogFormVisible: false,
				dialogFormVisible1: false,
				formLabelWidth: '120px',
				goodsList:[],
				repoList:[],
				confirmIndex: '',
				currentPage: 1,
				count: 0,
				get: 0,
				createtime: '',
				orderno: '',
				respositysource: '',
				buydepartmentid: '',
				pronuite: '',
				toggle: false,
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		this.initData();
    	},
    	computed: {
    		...mapState(['adminInfo']),
    	},
        beforeRouteLeave (to, from, next) {
            this.$destroy()
            next()
        },
    	methods: {
    		async initData(){
    			try{
					let sTime =this.createtime === '' ? '' : this.formatter(this.createtime)
					const dataReceipt = await getPuschaseOrderB(this.orderno,sTime,this.buydepartmentid,this.respositysource)
					if(dataReceipt.data.code === '1111'){
						this.receiptData = dataReceipt.data.data.list
						this.count = dataReceipt.data.data.total
					}
					const result = await getProList('')
					if(result.data.code === '1111'){
						this.goodsList = result.data.data
					}
					const repos = await getRepoAll()
					if(repos.data.code === '1111'){
						this.repoList = repos.data.data
					}
    			}catch(err){
    				console.log(err);
    			}
    		},
    		async defaultPurchase(){
    			this.get = 0
    			this.toggle = false
    			this.initData()
    		},
    		async examination(){
    			this.get = 2
    			this.toggle = true
    			const resData = await getPendingModification()
				if(resData.data.code === '1111'){
					this.receiptData = resData.data.data.list
					this.count = resData.data.data.total
				} else {
					this.$message(resData.data.message)
					this.receiptData = []
					this.count = 0
				}
    		},
    		async modifyPurchasing(){
    			const resData = await getmodifyPurchasing_b(this.form1.orderno, this.form1.productcode, this.form1.buynumber)
				if(resData.data.code === '1111'){
					this.$message(resData.data.message)
					this.dialogFormVisible1 = false
					this.examination()
				} else {
					this.$message(resData.data.message)
				}
    		},
			handleEdit(index,row) {
//				console.log(index,row)
				this.dialogFormVisible1 = true
				this.form1.orderno = row.orderno
				this.form1.productcode = row.productcode
				this.form1.pname = row.pname
				this.form1.advisebuynumber = row.advisebuynumber
				this.form1.buynumber = row.advisebuynumber
			},
			async handleSearch(){
				this.get = 1
				let sTime =this.createtime === '' ? '' : this.formatter(this.createtime)
				const resData = await getPuschaseOrderB(this.orderno,sTime,this.buydepartmentid,this.respositysource)
				if(resData.data.code === '1111'){
					this.receiptData = resData.data.data.list
					this.count = resData.data.data.total
				} else {
					this.$message(resData.data.message)
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
			async confirmAdd(){
//				console.log(1)
//				console.log(this.form.goodsName)
//				console.log(this.form.proid)
//				console.log(this.form.buynumber)
//				console.log(this.goodsList[this.confirmIndex].protype)
//				console.log(this.goodsList[this.confirmIndex].pronuite)
//				console.log(this.goodsList[this.confirmIndex].supplierid)
//				console.log(2)
				const addInfo = await addPurchaseOrderB(this.form.goodsName, this.form.proid, this.form.buynumber, this.goodsList[this.confirmIndex].protype, this.goodsList[this.confirmIndex].pronuite,this.goodsList[this.confirmIndex].supplierid)
				if(addInfo.data.code === '1111'){
					this.$message('添加采购单成功')
					this.form.goodsName = ""
					this.form.proid = ""
					this.form.prostandered = ""
					this.form.pronuite = ""
					this.form.buynumber = ""
					this.dialogFormVisible = false
					this.initData()
				}else {
					this.$message(addInfo.data.message)
				}
			},
			async querySearchAsync(queryString, cb) {
				let results=[]
				console.log(this.goodsList)
				const result = await getProList(queryString)
				if(result.data.code === '1111'){
					results = result.data.data
					this.goodsList = result.data.data
					for(let i=0;i<results.length;i++){
						results[i].value=results[i].pname
					}
				}
				clearTimeout(this.timeout)
				this.timeout = setTimeout(() => {
					cb(results);
				}, 3000 * Math.random());
			},
			handleAddChild(){
				for(let i = 0; i<this.goodsList.length; i++){
					if(this.form.goodsName == this.goodsList[i].pname) {
						this.confirmIndex = i
						this.form.prostandered=this.goodsList[i].prostandered
						this.form.pronuite=this.goodsList[i].pronuite
						this.form.proid=this.goodsList[i].proid
						this.pronuite=this.goodsList[i].pronuite
					}
				}
			},
			async handleCurrentChange(num){
				let sTime =this.createtime === '' ? '' : this.formatter(this.createtime)
				this.currentPage = num
				console.log(this.currentPage)
//				const dataReceipt = this.get === 0 ? await getPuschaseOrderB(this.orderno,sTime,this.buydepartmentid,this.respositysource,this.currentPage) : await getPuschaseOrderB(this.orderno,sTime,this.buydepartmentid,this.respositysource,this.currentPage)
				let dataReceipt = {}
				if(get === 0){
					dataReceipt = await getPuschaseOrderB(this.orderno,sTime,this.buydepartmentid,this.respositysource,this.currentPage)
				}else if(get === 1){
					dataReceipt = await getPuschaseOrderB(this.orderno,sTime,this.buydepartmentid,this.respositysource,this.currentPage)
				}else if(get === 2){
					dataReceipt = await getPendingModification(this.currentPage)
				}
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
</style>
