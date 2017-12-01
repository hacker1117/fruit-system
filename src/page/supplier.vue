<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top: 20px;">
            <el-col :span="2" style="text-align:right;">供应商类别：</el-col>
			<el-col :span="4"><el-input v-model="supplytype" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">供应商名称：</el-col>
			<el-col :span="4"><el-input v-model="sname" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">联系人电话：</el-col>
			<el-col :span="4"><el-input v-model="mantelephone" siez="mini" placeholder="请输入内容"></el-input></el-col>
		</el-row>

		<el-row>
			<el-col :span="24"><el-button style="float: right;" @click="handleSearch" type="primary">查询</el-button></el-col>
		</el-row>
		<el-row style="margin-top: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px;">
			<el-col :span="24">
				<el-button @click="dialogFormVisible = true" >新增供应商</el-button>
			</el-col>
		</el-row>
        <el-dialog title="新增供应商" v-model="dialogFormVisible">
        <el-form :model="form">
			<el-form-item label="供应商编码" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.supplierid" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="供应商名称" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.sname" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="公司性质" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.supplytype" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="供应商地址" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.cmpanyaddress" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="供应商级别" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.ranks" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="联系人姓名" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.linkman" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="联系人电话" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.mantelephone" auto-complete="off" placeholder="请输入数字"></el-input>
            </el-form-item>
			<el-form-item label="联系人手机号" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.mobiletelephone" auto-complete="off" placeholder="请输入数字"></el-input>
            </el-form-item>
			<el-form-item label="税率" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.taxrate" auto-complete="off" placeholder="请输入数字">
            		<template slot="append">%</template>
            	</el-input>
            </el-form-item>
			<el-form-item label="税号" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.taxratenum" auto-complete="off" placeholder="请输入数字"></el-input>
            </el-form-item>
			<el-form-item label="创建人" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="adminInfo.uname" auto-complete="off" :disabled="true"></el-input>
           </el-form-item>
			<el-form-item label="备注" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.remarkable" auto-complete="off"></el-input>
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
			prop="state" width="120px"
			label="供应商状态">
			</el-table-column>
			<el-table-column
			prop="supplierid" width="120px"
			label="单位编码">
			</el-table-column>
			<el-table-column
			prop="sname" width="120px"
			label="单位名称">
			</el-table-column>
			<el-table-column
			prop="supplytype" width="120px"
			label="公司性质">
			</el-table-column>
			<el-table-column
			prop="cmpanyaddress" width="120px"
			label="供应商地址">
			</el-table-column>
			<el-table-column
			prop="ranks" width="120px"
			label="供应商级别">
			</el-table-column>
			<el-table-column
			prop="linkman" width="120px"
			label="联系人姓名">
			</el-table-column>
			</el-table-column>
			<el-table-column
			prop="mantelephone" width="120px"
			label="联系人电话">
			</el-table-column>
			<el-table-column
			prop="mobiletelephone" width="120px"
			label="联系人手机号">
			</el-table-column>
			<el-table-column
			prop="taxrate" width="120px"
			label="税率%">
			</el-table-column>
			<el-table-column
			prop="taxratenum" width="120px"
			label="税号">
			</el-table-column>
			<el-table-column
			label="操作" fixed="right" width="120px">
                <template scope="scope">
                    <el-button
                    size="mini"
                    @click="disable(scope.$index, scope.row)">禁用</el-button>
                    <el-button
                    size="mini"
                    @click="enable(scope.$index, scope.row)">启用</el-button>
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
    import {getSupplierAll, querySupplierList, addSupplier,transmitDisable,transmitEnable} from '@/api/getData'
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
					supplierid: '',
					sname: '',
					supplytype: '',
					cmpanyaddress: '',
					ranks: '',
					linkman: '',
					mantelephone: '',
					mobiletelephone: '',
					taxrate: '',
					createman: '',
					createtime: '',
					remarkable: '',
				},
				formLabelWidth: '120px',
				dialogFormVisible: false,
				supplytype: '',
				sname: '',
				mantelephone: '',
				currentPage: 1,
				count: 0,
				get: 0,
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
					const dataReceipt = await getSupplierAll(this.currentPage)
					console.log('re: ',dataReceipt.data.data)
					this.receiptData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
					for(let i = 0;i<this.receiptData.length;i++){
                       	 this.receiptData[i].state = this.receiptData[i].isDelete=== 0 ? "启用" : "禁用"
                    	}
    			}catch(err){
    				console.log(err);
    			}
    		},
			handleEdit(index,row) {
				console.log(index,row)
				this.$destroy()
				this.$router.push('/supplierDetails/'+ row.supplierid)
			},
			async disable(index,row) {
//				console.log(index,row)
				console.log(row.supplierid)
				const resData = await transmitDisable(row.supplierid)
				if(resData.data.code === '1111'){
					this.$message(resData.data.message)
					this.initData()
				} else {
					this.$message(resData.data.message)
					this.receiptData = []
					this.count = 0
				}
			},
			async enable(index,row) {
//				console.log(index,row)
				console.log(row.supplierid)
				const resData = await transmitEnable(row.supplierid)
				if(resData.data.code === '1111'){
					this.$message(resData.data.message)
					this.initData()
				} else {
					this.$message(resData.data.message)
					this.receiptData = []
					this.count = 0
				}
			},
			async handleSearch(){
				this.get = 1
				this.count = 0
				const resData = await querySupplierList(this.supplytype,this.sname,this.mantelephone)
				if(resData.data.code === '1111'){
					this.receiptData = resData.data.data.list
					this.count = resData.data.data.total
					for(let i = 0;i<this.receiptData.length;i++){
                       	 this.receiptData[i].state = this.receiptData[i].isDelete=== 0 ? "启用" : "禁用"
                    	}
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
			async confirmAdd() {
				console.log(this.form.supplierid)
				if(this.form.supplierid === ""){
					this.$message('供应商编码不能为空!')
				}else{
					if(this.form.sname === ""){
						this.$message('供应商名称不能为空!')
					}else{
						if(this.form.supplytype === ""){
							this.$message('公司性质不能为空!')
						}else{
							if(this.form.cmpanyaddress === ""){
								this.$message('供应商地址不能为空!')
							}else{
								if(this.form.ranks === ""){
									this.$message('供应商级别不能为空!')
								}else{
									if(this.form.linkman === ""){
										this.$message('联系人姓名不能为空!')
									}else{
										if(this.form.mantelephone === ""){
											this.$message('联系人电话不能为空!')
										}else{
											if(this.form.mobiletelephone === ""){
												this.$message('联系人手机号不能为空!')
											}else{
												if(this.form.taxrate === ""){
													this.$message('税率不能为空!')
												}else{
													if(this.form.taxratenum === ""){
														this.$message('税号不能为空!')
													}else{
														if(this.form.remarkable === ""){
															this.$message('备注不能为空!')
														}else{
															this.form.createman = this.adminInfo.uname
											                const supplierAdd = await addSupplier(this.form.supplierid,this.form.sname,this.form.supplytype,this.form.cmpanyaddress,this.form.ranks,this.form.linkman,this.form.mantelephone,this.form.mobiletelephone,this.form.taxrate,this.form.createman,this.form.createtime,this.form.remarkable,this.form.taxratenum)
											                if(supplierAdd.data.code === '1111') {
											                    this.$message('添加供应商成功!')
																this.form.supplierid = ""
																this.form.sname = ""
																this.form.supplytype = ""
																this.form.cmpanyaddress = ""
																this.form.ranks = ""
																this.form.linkman = ""
																this.form.mantelephone = ""
																this.form.mobiletelephone = ""
																this.form.taxrate = ""
																this.form.createman = ""
																this.form.createtime = ""
																this.form.remarkable = ""
											                    this.dialogFormVisible = false
											                    this.initData()
											                } else {
											                    this.$message(supplierAdd.data.message)
											                }
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			async handleCurrentChange(num){
				this.currentPage = num
				const dataReceipt = this.get === 0 ? await getSupplierAll(this.currentPage) : await querySupplierList(this.supplytype,this.sname,this.mantelephone,this.currentPage)
				if(dataReceipt.data.code === '1111'){
					this.receiptData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
					for(let i = 0;i<this.receiptData.length;i++){
                       	 this.receiptData[i].state = this.receiptData[i].isDelete=== 0 ? "启用" : "禁用"
                    	}
				}else {
					this.receiptData = []
					this.count = ""
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
