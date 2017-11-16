<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
	        <el-dialog title="完善采购信息" v-model="dialogFormVisible">
	        <el-form :model="form">
				<el-form-item label="单据号" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form.ordercode" auto-complete="off" :disabled="true"></el-input>
	            </el-form-item>
				<el-form-item label="商品名称" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form.storagename" auto-complete="off" :disabled="true"></el-input>
	            </el-form-item>
				<el-form-item label="采购员" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="adminInfo.uname" auto-complete="off" :disabled="true"></el-input>
	            </el-form-item>
	            <el-form-item label="采购部门" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form.buydepartment" auto-complete="off" :disabled="true"></el-input>
	            </el-form-item>
				<el-form-item label="供应商" :label-width="formLabelWidth">
	               <el-select v-model="form.supplierid" placeholder="请选择供应商">
	                    <el-option v-for="supplier in supplierList" :key="supplier.id" :label="supplier.sname" :value="supplier.supplierid"></el-option>
	                </el-select>
	           </el-form-item>
				<el-form-item label="采购费用" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form.buyfare" auto-complete="off"></el-input> RMB/￥
	            </el-form-item>
				<el-form-item label="采购金额" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form.moneyamount" auto-complete="off"></el-input> RMB/￥
	            </el-form-item>
				<el-form-item label="折让金额" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form.allowance" auto-complete="off"></el-input> RMB/￥
	            </el-form-item>
	        </el-form>
	        <div slot="footer" class="dialog-footer">
	            <el-button @click="dialogFormVisible = false">取 消</el-button>
	            <el-button type="primary" @click="confirmAdd">确 定</el-button>
	        </div>
	        </el-dialog>
			<el-row style="margin-top: 20px;">
				<el-col :span="24">
					<el-button style="float: left;" @click="nocomplete">未完成</el-button>
					<el-button style="float: left;" @click="staycomplete">完成待入库</el-button>
					<el-button style="float: left;" @click="warehousing">已入库</el-button>
				</el-col>
			</el-row>
			<el-row style="margin-top: 20px;" v-if="toggle1">
	            <el-col :span="3" style="text-align:right;">创建日期：</el-col>
				<el-col :span="4">
					<el-date-picker
					v-model="creattime"
					type="date"
					format="yyyy-MM-dd"
					placeholder="选择日期">
					</el-date-picker>
				</el-col>
	            <el-col :span="3" style="text-align:right;">单据号：</el-col>
				<el-col :span="4"><el-input v-model="ordercode" siez="mini" placeholder="请输入内容"></el-input></el-col>
	            <el-col :span="3" style="text-align:right;">供应商：</el-col>
				<el-col :span="4"><el-input v-model="supplierid" siez="mini" placeholder="请输入内容"></el-input></el-col>
					<el-button style="float: right;" @click="handleSearch" type="primary">查询</el-button>
			</el-row>
			<el-row style="margin-top: 20px;" v-if="toggle">
	            <el-col :span="3" style="text-align:right;">商品名称：</el-col>
				<el-col :span="4">
					<el-autocomplete
					v-model="storagename"
					:fetch-suggestions="querySearchAsync"
					placeholder="请输入名称模糊搜索"
					></el-autocomplete>
				</el-col>
	            <el-col :span="3" style="text-align:right;">商品分类：</el-col>
				<el-col :span="4">
					<el-select v-model="storagetype" placeholder="请选择分类">
		                <el-option v-for="classif in classification" :key="classif.id" :label="classif.categoryname" :value="classif.categoryname"></el-option>
		            </el-select>
				</el-col>
				<el-button style="float: left;margin-left: 20px;" @click="querycommodity" type="primary">查询</el-button></el-col>
				<el-button style="float: left;margin-left: 20px;" @click="empty" type="primary">清空</el-button></el-col>
				<el-button style="float: right;" @click="exportEXCEL" type="primary">导出EXCEL</el-button></el-col>
			</el-row>
			<el-table
				:data="receiptData"
				stripe
				style="width: 100%;text-align:left;">
				<el-table-column
				prop="ordercode" width="120px"
				label="单据号">
				</el-table-column>
				<el-table-column
				prop="storagename" width="120px"
				label="商品名称">
				</el-table-column>
				<el-table-column
				prop="advisenumber" width="120px"
				label="建议采购量">
				</el-table-column>
				<el-table-column
				prop="createtime" width="120px"
				label="创建时间">
				</el-table-column>
				<el-table-column
				prop="supplierid" width="120px"
				label="供应商">
				</el-table-column>
				<el-table-column
				prop="buydepartment" width="120px"
				label="采购部门">
				</el-table-column>
				<el-table-column
				prop="salesmanname" width="120px"
				label="采购员">
				</el-table-column>
				<el-table-column
				prop="buyfare" width="120px"
				label="采购费用">
				</el-table-column>
				</el-table-column>
				<el-table-column
				prop="moneyamount" width="120px"
				label="采购金额">
				</el-table-column>
				<el-table-column fixed="right"
				v-if="toggle"
				label="操作" width="120px">
				<template scope="scope">
					<el-button
					size="small"
					@click="handleEdit(scope.$index, scope.row)">完善采购单信息</el-button>
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
    import {getPurchaseOrderAll, querystay, queryPurchaseOrderList, getSupplierAll, makePurchase,getclassification,getProList, getcommodity, getexport} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				value1: '',
				value2: '',
				input: '',
				toggle: true,
				toggle1: false,
				city: {},
				receiptData: [],
				salesmanname: '',
				creattime: '',
				ordercode: '',
				form:{
					supplierid: '',
					buydepartment: '采购部',
					salesmanname: '',
					buyfare: '',
					moneyamount: '',
					allowance: ''
				},
				form1:{
					pname: '',
				},
				supplierid: '',
				dialogFormVisible: false,
				dialogFormVisible1: false,
				formLabelWidth: '120px',
				supplierList: [],
				classification: [],
				currentPage: 1,
				count: 0,
				get: 0,
				ind: "",
				goodsName: '',
				storagename: '',
				storagetype: '',
				wind: 0,
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
					const dataReceipt = await getPurchaseOrderAll(this.currentPage, 10)
					console.log('re: ',dataReceipt.data.data)
					if(dataReceipt.data.code === '1111'){
						this.receiptData = dataReceipt.data.data.list
						this.count = dataReceipt.data.data.total
						for(let i = 0;i<this.receiptData.length;i++){
                       	 this.receiptData[i].advisenumber = this.receiptData[i].advisenumber+this.receiptData[i].prounite
                    	}
					}else{
						this.receiptData = []
						this.count = 0
					}
					const result = await getProList('')
					if(result.data.code === '1111'){
						this.goodsList = result.data.data
					}
					const suppliers = await getSupplierAll()
					this.supplierList = suppliers.data.data.list
					const classi = await getclassification()
					this.classification = classi.data.data
    			}catch(err){
    				console.log(err)
    			}
    		},
			handleEdit(index,row) {
				this.dialogFormVisible = true
				this.ind = index
				this.form.supplierid = row.supplierid
				this.form.ordercode = row.ordercode
				this.form.storagename = row.storagename
			},
			async querycommodity(){
				this.get = 3
				this.count = 0
				const resData = await getcommodity(this.storagename,this.storagetype)
				if(resData.data.code === '1111'){
					this.receiptData = resData.data.data.list
					this.count = resData.data.data.total
				} else {
					this.$message(resData.data.message)
					this.receiptData =""
					this.count = 0
				}
			},
			async empty(){
				this.storagename = ""
				this.storagetype = ""
			},
			async exportEXCEL(){
//				 window.open('http://47.95.12.49:8084/echuxianshengshop1/purchaseordera/exportExcel')
				const resData = await getexport(this.storagename,this.storagetype)
				if(resData.data.code === '1111'){
					this.$message(resData.data.message)
					this.wind = 1
//					console.log(this.wind)
				} else {
					this.$message(resData.data.message)
				}
//				if(wind === 1){
					window.open('http://47.95.12.49:8084/echuxianshengshop1/purchaseordera/exportExcel')
//				}
			},
			async warehousing(){
				this.get = 1
				this.count = 0
				this.toggle= false
				this.toggle1= true
				const resData = await queryPurchaseOrderList()
				if(resData.data.code === '1111'){
					this.receiptData = resData.data.data.list
					this.count = resData.data.data.total
					for(let i = 0;i<this.receiptData.length;i++){
                       	 this.receiptData[i].advisenumber = this.receiptData[i].advisenumber+this.receiptData[i].prounite
                    	}
				} else {
					this.$message(resData.data.message)
					this.receiptData =""
					this.count = 0
				}
			},
			async nocomplete(){
				this.get = 0
				this.toggle= true
				this.toggle1= false
				const dataReceipt = await getPurchaseOrderAll(1, 10)
				console.log('re: ',dataReceipt.data.data)
				if(dataReceipt.data.code === '1111'){
					this.receiptData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
					for(let i = 0;i<this.receiptData.length;i++){
                       	 this.receiptData[i].advisenumber = this.receiptData[i].advisenumber+this.receiptData[i].prounite
                    	}
				}else{
					this.receiptData = []
					this.count = 0
				}
			},
			async staycomplete(){
				this.get = 2
				this.count = 0
				this.toggle= false
				this.toggle1= false
				const resData2 = await querystay(1, 10)
				if(resData2.data.code === '1111'){
					this.receiptData = resData2.data.data.list
					this.count = resData2.data.data.total
					for(let i = 0;i<this.receiptData.length;i++){
                       	 this.receiptData[i].advisenumber = this.receiptData[i].advisenumber+this.receiptData[i].prounite
                    	}
				} else {
					this.$message(resData2.data.message)
					this.receiptData =""
					this.count = 0
				}
			},
			async handleSearch(){
				this.get = 1
				this.count = 0
				let cTime = this.creattime === '' ? '' : this.formatter(this.creattime)
				const resData = await queryPurchaseOrderList(this.salesmanname, cTime, this.ordercode, this.supplierid,1,10)
				if(resData.data.code === '1111'){
					this.receiptData = resData.data.data.list
					this.count = resData.data.data.total
					this.toggle= false
					for(let i = 0;i<this.receiptData.length;i++){
                       	 this.receiptData[i].advisenumber = this.receiptData[i].advisenumber+this.receiptData[i].prounite
                    	}
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
			async confirmAdd(){
				const addInfo = await makePurchase(this.receiptData[this.ind].ordercode, this.form.supplierid, this.adminInfo.uname, this.form.buydepartment,this.form.buyfare, this.form.moneyamount, this.form.allowance)
				if(addInfo.data.code === '1111'){
					this.$message('完善采购单信息成功')
					this.form.supplierid = ""
					this.form.buyfare = ""
					this.form.moneyamount = ""
					this.form.allowance = ""
					this.dialogFormVisible = false
					this.initData()
				}else {
					this.$message(addInfo.data.message)
				}
			},
			async querySearchAsync(queryString, cb) {
				let results=[]
//				console.log(this.goodsList)
				const result = await getProList(queryString)
				if(result.data.code === '1111'){
					results = result.data.data
//					this.goodsList = result.data.data
					for(let i=0;i<results.length;i++){
						results[i].value=results[i].pname
					}
				}
				clearTimeout(this.timeout)
				this.timeout = setTimeout(() => {
					cb(results);
				}, 3000 * Math.random());
			},
			async handleCurrentChange(num) {
				console.log(this.get)
				this.currentPage = num
				let cTime = this.creattime === '' ? '' : this.formatter(this.creattime)
				let dataReceipt = {}
				if(this.get === 0){
					dataReceipt = await getPurchaseOrderAll(this.currentPage)
				}else if(this.get === 1){
					dataReceipt = await queryPurchaseOrderList(this.salesmanname, cTime, this.ordercode, this.supplierid,this.currentPage)
				}else if(this.get === 2){
					dataReceipt = await querystay(this.currentPage)
				}else if(this.get === 3){
					dataReceipt = await getcommodity(this.storagename,this.storagetype,this.currentPage)
				}
				if(dataReceipt.data.code === '1111'){
					this.receiptData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
					for(let i = 0;i<this.receiptData.length;i++){
                       	 this.receiptData[i].advisenumber = this.receiptData[i].advisenumber+this.receiptData[i].prounite
                    	}
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
