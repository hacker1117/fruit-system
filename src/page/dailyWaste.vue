<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top: 20px;">
            <el-col :span="2" style="text-align:right;">商品编号：</el-col>
			<el-col :span="4"><el-input v-model="productcode" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">商品名称：</el-col>
			<el-col :span="4"><el-input v-model="pname" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="3" style="text-align:right;">损耗商品编码：</el-col>
			<el-col :span="4"><el-input v-model="wasteproductcode" siez="mini" placeholder="请输入内容"></el-input></el-col>
        </el-row>
		<el-row>
            <el-col :span="2" style="text-align:right;">报损时间：</el-col>
			<el-col :span="4">
				<el-date-picker
				v-model="timeofreport"
				type="date"
				format="yyyy-MM-dd"
				placeholder="选择日期">
				</el-date-picker>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
                <el-button style="float: right; margin-left:10px;" @click="handleSearch" type="primary">查询</el-button>
                <el-button style="float: left;" @click="dialogFormVisible = true">新增</el-button>
            </el-col>
		</el-row>
        <el-dialog title="新增日常损耗" v-model="dialogFormVisible">
        <el-form :model="form">
			<el-form-item label="商品名称" :label-width="formLabelWidth">
            	<!--<el-input style="width: 195px" v-model="form.pname" auto-complete="off"></el-input>-->
            	 <el-autocomplete
				v-model="form.pname"
				:fetch-suggestions="querySearchAsync"
				placeholder="请输入名称模糊搜索"
				@select="handleAddChild"
				></el-autocomplete>
            </el-form-item>
			<el-form-item label="商品编号" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.productcode" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
			<el-form-item label="规格" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.procuctstanderd" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
			<el-form-item label="单位" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.productunite" auto-complete="off" :disabled="true"></el-input>
           </el-form-item>
            <el-form-item label="损耗类别" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.wastetype" auto-complete="off" :disabled="true"></el-input>
                <!--<el-select v-model="form.wastetype" placeholder="请选择损耗类别">
                    <el-option v-for="repos in virtualRepoList" :key="repos.id" :label="repos.reponame" :value="repos.reponame"></el-option>
                </el-select>-->
            </el-form-item>
			<el-form-item label="备注" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.remarkable" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="损耗数量" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.wasteweight" auto-complete="off"><template slot="append">{{this.pronuite}}</template></el-input>
         </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </div>
        </el-dialog>
		<el-table
			:data="receiptData"
			stripe
			style="width: 100%;text-align:left;">
			<el-table-column
			prop="ordernumber"
			label="订单号">
			</el-table-column>
			<el-table-column
			prop="productcode"
			label="商品编号">
			</el-table-column>
			<el-table-column
			prop="pname"
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="productunite"
			label="单位">
			</el-table-column>
			<el-table-column
			prop="wasteproductcode"
			label="损耗商品编码">
			</el-table-column>
			<el-table-column
			prop="wasteweight"
			label="数量">
			</el-table-column>
			<el-table-column
			prop="wastetype"
			label="损耗类别">
			</el-table-column>
			<el-table-column
			prop="remarkable"
			label="其他">
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
    import {getDailyLossList, queryDailyLossList,addTransportWaste, getProList} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				value1: '',
				value2: '',
				input: '',
				productcode: '',
				pname: '',
				wasteproductcode: '',
				dialogFormVisible: false,
				formLabelWidth: '120px',
				createhuman: '',
				timeofreport: '',
				city: {},
				form: {
					pname: '',
					wastetype: '日常损耗',
				},
				receiptData: [],
				currentPage: 1,
				count: 0,
				get: 0,
				confirmIndex: '',
				goodsList:[],
				pronuite: '',
				virtualRepoList: [],
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
					const dataReceipt = await getDailyLossList()
					console.log('re: ',dataReceipt.data.data)
					this.receiptData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
    			}catch(err){
    				console.log(err);
    			}
    		},
			handleEdit(index,row) {
				console.log(index,row)
				this.$destroy()
				this.$router.push('/transportWasteDetails/'+ row.orderid)
			},
			async handleSearch(){
				this.get = 1
				this.count = 0
				let sTime = this.timeofreport === '' ? '' : this.formatter(this.timeofreport)
				const resData = await queryDailyLossList(this.productcode,this.pname,this.wasteproductcode,this.createhuman,sTime)
				if(resData.data.code === '1111'){
					this.receiptData = resData.data.data.list
					this.count = resData.data.data.total
				}else {
					this.$message(resData.data.message)
					this.receiptData = []
					this.count = 0
				}
			},
			async confirmAdd() {
				console.log(this.form)
                const supplierAdd = await addTransportWaste(this.form.pname,this.form.productcode,this.form.procuctstanderd,this.form.productunite,this.form.wastetype,this.form.remarkable,this.form.wasteweight)
                if(supplierAdd.data.code === '1111') {
                    this.$message('新增日常损耗成功!')
                    this.form.pname = ""
					this.form.wastetype = ""
					this.form.remarkable = ""
					this.form.wasteweight = ""
                    this.dialogFormVisible = false
                    this.initData()
                } else {
                    this.$message(supplierAdd.data.message)
                }
			},
			handleAddChild(){
				for(let i = 0; i<this.goodsList.length; i++){
					if(this.form.pname == this.goodsList[i].pname) {
						this.confirmIndex = i
						this.form.productcode=this.goodsList[i].proid
						this.form.procuctstanderd=this.goodsList[i].prostandered
						this.form.productunite=this.goodsList[i].pronuite
						this.pronuite=this.goodsList[i].pronuite
					}
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
			formatter(date){
				console.log(date.getMonth())
				let res = ''
				res += date.getFullYear()+ '-' + (date.getMonth() + 1) + '-' +date.getDate()
				return res
			},
			async handleCurrentChange(num){
				this.currentPage = num
				let sTime = this.timeofreport === '' ? '' : this.formatter(this.timeofreport)
				const dataReceipt = this.get === 0 ? await getDailyLossList(this.currentPage) : await queryDailyLossList(this.productcode,this.pname,this.wasteproductcode,this.createhuman,sTime,this.currentPage)
				if(dataReceipt.data.code === '1111'){
					console.log(1111)
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
