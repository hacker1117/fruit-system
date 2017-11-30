<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
        <el-dialog title="绑定APP后台商品" v-model="dialogFormVisibleGood">
        <el-form :model="form">
            <el-form-item label="APP后台商品" :label-width="formLabelWidth">
				<el-autocomplete
				v-model="form.appGoodsIndex"
				:fetch-suggestions="querySearchAsync"
				@select="confirmGood"
				placeholder="请输入名称模糊搜索"
				></el-autocomplete>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirmBind">确 定</el-button>
        </div>
        </el-dialog>
		<el-row style="margin-top: 20px;">
            <el-col :span="2" style="text-align:right;">商品编码：</el-col>
			<el-col :span="4"><el-input v-model="procode" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">商品名称：</el-col>
			<el-col :span="4"><el-input v-model="pname" siez="mini" placeholder="请输入内容"></el-input></el-col>
		</el-row>
		<el-row>
			<el-col :span="24"><el-button style="float: right;" @click="handleSearch" type="primary">查询</el-button></el-col>
		</el-row>
		<el-row style="margin-top: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px;">
			<el-col :span="24">
				<el-button @click="dialogFormVisible = true" >新增货品</el-button>
			</el-col>
		</el-row>
        <el-dialog title="新增货品" v-model="dialogFormVisible">
        <el-form :model="form1">
			<el-form-item label="标品" :label-width="formLabelWidth">
            	<el-radio-group v-model="form1.isStandard">
					<el-radio :label="0">否</el-radio>
					<el-radio :label="1">是</el-radio>
				</el-radio-group>
            </el-form-item>
			<el-form-item label="商品编码" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form1.proid" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="商品名称" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form1.pname" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="规格" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form1.prostandered" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="单位" :label-width="formLabelWidth" v-if="this.form1.isStandard === 1">
            	<el-select v-model="form1.pronuite" placeholder="请选择计量单位">
	                <el-option label="个" value="个"></el-option>
	                <el-option label="瓶" value="瓶"></el-option>
	                <el-option label="份" value="份"></el-option>
	                <el-option label="袋" value="袋"></el-option>
	            </el-select>
            </el-form-item>
			<el-form-item label="商品属性" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form1.commodityattribute" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="商品分类" :label-width="formLabelWidth">
            	<el-select v-model="form1.protype" placeholder="请选择分类">
		            <el-option v-for="classif in classification" :key="classif.id" :label="classif.categoryname" :value="classif.categorycode"></el-option>
		        </el-select>
            </el-form-item>
			<!--<el-form-item label="厂家" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form1.factories" auto-complete="off"></el-input>
            </el-form-item>-->
			<el-form-item label="品牌" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form1.brand" auto-complete="off"></el-input>
            </el-form-item>
			<!--<el-form-item label="供应商编码" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form1.supplierid" auto-complete="off"></el-input>
            </el-form-item>-->
			<el-form-item label="供应商" :label-width="formLabelWidth">
				<el-select v-model="form1.supplierid" placeholder="请选择供应商">
					<el-option v-for="(item,index) in batchData" :key="item.id" :label="item.sname" :value="item.supplierid"></el-option>
				</el-select>
            </el-form-item>
			<el-form-item label="参考进价" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form1.referenceinprice" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="创建人" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="adminInfo.uname" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
			<el-form-item label="保质期时间" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form1.modifyman" auto-complete="off">
            		<template slot="append">天</template>
            	</el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </div>
        </el-dialog>
            <el-dialog title="修改货品" v-model="dialogFormVisible2">
                <el-form :model="form2">
                    <el-form-item label="商品名称" :label-width="formLabelWidth">
                        <el-input style="width: 195px" v-model="form2.pname" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="规格" :label-width="formLabelWidth">
                        <el-input style="width: 195px" v-model="form2.prostandered" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品属性" :label-width="formLabelWidth">
                        <el-input style="width: 195px" v-model="form2.commodityattribute" auto-complete="off"></el-input>
                    </el-form-item>
					<el-form-item label="商品分类" :label-width="formLabelWidth">
		            	<el-select v-model="form2.protype" placeholder="请选择分类">
				            <el-option v-for="classif2 in classification" :key="classif2.id" :label="classif2.categoryname" :value="classif2.categoryname"></el-option>
				        </el-select>
		            </el-form-item>
                    <!--<el-form-item label="厂家" :label-width="formLabelWidth">
                        <el-input style="width: 195px" v-model="form2.factories" auto-complete="off"></el-input>
                    </el-form-item>-->
                    <el-form-item label="品牌" :label-width="formLabelWidth">
                        <el-input style="width: 195px" v-model="form2.brand" auto-complete="off"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="供应商编码" :label-width="formLabelWidth">
                        <el-input style="width: 195px" v-model="form2.supplierid" auto-complete="off"></el-input>
                    </el-form-item>-->
					<el-form-item label="供应商" :label-width="formLabelWidth">
						<el-select v-model="form2.supplierid" placeholder="请选择供应商">
							<el-option v-for="(item,index) in batchData" :key="item.id" :label="item.sname" :value="item.supplierid"></el-option>
						</el-select>
		            </el-form-item>
                    <el-form-item label="参考进价" :label-width="formLabelWidth">
                        <el-input style="width: 195px" v-model="form2.referenceinprice" auto-complete="off"></el-input>
                    </el-form-item>
					<el-form-item label="保质期时间" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form2.modifyman" auto-complete="off">
		            		<template slot="append">天</template>
		            	</el-input>
		            </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmEditOld">确 定</el-button>
                </div>
            </el-dialog>
		<el-table
			:data="receiptData"
			stripe
			style="width: 100%;text-align:left;">
			<el-table-column
			prop="proid" width="120px"
			label="商品编码">
			</el-table-column>
			<el-table-column
			prop="pname" width="120px"
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="sku" width="120px"
			label="SKU">
			</el-table-column>
			<el-table-column
			prop="prostandered" width="120px"
			label="规格">
			</el-table-column>
			<el-table-column
			prop="commodityattribute" width="120px"
			label="商品属性">
			</el-table-column>
			<el-table-column
			prop="factories" width="120px"
			label="厂家">
			</el-table-column>
			<el-table-column
			prop="brand" width="120px"
			label="品牌">
			</el-table-column>
			</el-table-column>
			<el-table-column
			prop="supplierid" width="120px"
			label="供应商编码">
			</el-table-column>
			<el-table-column
			prop="referenceinprice" width="120px"
			label="参考进价">
			</el-table-column>
			<el-table-column
			prop="createman" width="120px"
			label="创建人">
			</el-table-column>
			<el-table-column fixed="right"
			label="操作" width="120px">
			<template scope="scope">
				<el-button
				size="small"
				@click="handleEdit(scope.$index, scope.row)">绑定商品</el-button>
                <el-button
                    size="small"
                    @click="handleEditOld(scope.$index, scope.row)">修改商品</el-button>
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
    import {getGoodsAll, queryGoodsList, addGoods, appGoodsList, bindAppGoods, updateGoods, getclassification, querySnameByTSupplierorder_a} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				value1: '',
				value2: '',
				input: '',
				count: 0,
				get: 0,
				city: {},
				receiptData: [],
				pname: '',
				proid: '',
				prostandered: '',
				procode: '',
				helpcode: '',
				commodityattribute: '',
				factories: '',
				brand: '',
				form:{
					appGoodsIndex:'',
				},
				form1:{
					isStandard: 0,
					proid: "",
					pname: "",
					prostandered: "",
					pronuite: "",
					commodityattribute: "",
					protype: "",
					factories: "",
					brand: "",
					supplierid: "",
					referenceinprice: "",
					createman: "",
					modifyman: "",
				},
				form2:{
					proid: "",
					pname: "",
					prostandered: "",
					commodityattribute: "",
					protype: "",
					factories: "",
					brand: "",
					supplierid: "",
					referenceinprice: "",
					modifyman: "",
				},
				appBindId:'',
				formLabelWidth: '120px',
				dialogFormVisible: false,
				dialogFormVisibleGood: false,
                dialogFormVisible2: false,
				appGoodsList:[],
				confirmIndex: '',
				currentPage: 1,
				classification: [],
				batchData: [],
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
					const dataReceipt = await getGoodsAll(this.currentPage)
					console.log('re: ',dataReceipt.data.data)
					this.receiptData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
					const classi = await getclassification()
					this.classification = classi.data.data
					const Sname = await querySnameByTSupplierorder_a()
					this.batchData = Sname.data.data
					const appGoodsInfo = await appGoodsList(1)
					this.appGoodsList = appGoodsInfo.data.resultData.productList
					console.log(this.appGoodsList)
    			}catch(err){
    				console.log(err)
    			}
    		},
			handleEdit(index,row) {
				this.dialogFormVisibleGood = true
				this.appBindId = row.proid
			},
			async handleSearch(){
				this.get = 1
				this.count = 0
				const resData = await queryGoodsList(this.pname, this.procode)
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
			async confirmAdd(){
				console.log(this.form)
                const goodsAdd = await addGoods(this.form1.isStandard,this.form1.proid, this.form1.pname, this.form1.prostandered, this.form1.pronuite, this.form1.commodityattribute, this.form1.protype, this.form1.factories, this.form1.brand, this.form1.supplierid, this.form1.referenceinprice, this.adminInfo.uname, this.form1.modifyman)
                if(goodsAdd.data.code === '1111') {
                    this.$message('添加货品成功!')
                    this.form1.isStandard = 0
					this.form1.proid = ""
					this.form1.pname = ""
					this.form1.prostandered = ""
					this.form1.pronuite = ""
					this.form1.commodityattribute = ""
					this.form1.protype = ""
					this.form1.brand = ""
					this.form1.supplierid = ""
					this.form1.referenceinprice = ""
					this.form1.modifyman = ""
                    this.dialogFormVisible = false
                    this.initData()
                } else {
                    this.$message(goodsAdd.data.message)
                }
			},
            async confirmEditOld(){
                console.log(this.form)
                const goodsAdd = await updateGoods(this.form2.proid,this.form2.pname,this.form2.prostandered,this.form2.commodityattribute,this.form2.protype,this.form2.brand,this.form2.supplierid,this.form2.referenceinprice,this.form2.modifyman)
                if(goodsAdd.data.code === '1111') {
                    this.$message('修改货品成功!')
                    this.form2.proid = ""
                	this.form2.pname = ""
					this.form2.prostandered = ""
					this.form2.commodityattribute = ""
					this.form2.protype = ""
					this.form2.factories = ""
					this.form2.brand = ""
					this.form2.supplierid = ""
					this.form2.referenceinprice = ""
					this.form2.modifyman = ""
                    this.dialogFormVisible2 = false
                    this.initData()
                } else {
                    this.$message(goodsAdd.data.message)
                }
            },
            handleEditOld(index, row) {
                this.dialogFormVisible2 = true
//              this.form2 = row
				console.log(row.modifyman)
				this.form2.proid = row.proid
                this.form2.pname = row.pname
				this.form2.prostandered = row.prostandered
				this.form2.commodityattribute = row.commodityattribute
				this.form2.protype = row.storagetype
				this.form2.factories = row.factories
				this.form2.brand = row.brand
				this.form2.sname = row.sname
				this.form2.supplierid = row.supplierid
				this.form2.referenceinprice = row.referenceinprice
				this.form2.modifyman = row.modifyman
            },
			async confirmBind(){
				console.log(this.appGoodsList)
				console.log(this.confirmIndex)
				const bindInfo = await bindAppGoods(this.appGoodsList[this.confirmIndex].productId, this.appGoodsList[this.confirmIndex].sku, this.appBindId)
				if(bindInfo.data.code === '1111'){
					this.$message('绑定成功')
					this.form.appGoodsIndex=""
					this.dialogFormVisibleGood =false
					this.initData()
				}else {
					this.$message(bindInfo.data.message)
				}
			},
			async cancel(){
				this.dialogFormVisibleGood =false
				this.form.appGoodsIndex=""
			},
			async querySearchAsync(queryString, cb) {
				let results=[]
				if(queryString !== '') {
					const result = await appGoodsList(1,queryString)
					results = result.data.resultData.productList
					this.appGoodsList = result.data.resultData.productList
					for(let i=0;i<results.length;i++){
						results[i].value = results[i].productFullName
					}
				}
				clearTimeout(this.timeout)
				this.timeout = setTimeout(() => {
					cb(results);
				}, 3000 * Math.random());
			},
			confirmGood() {
				for(let i = 0; i<this.appGoodsList.length; i++){
					if(this.form.appGoodsIndex == this.appGoodsList[i].productFullName) {
						this.confirmIndex = i
					}
				}
			},
			async handleCurrentChange(num){
				this.currentPage = num
				const dataReceipt = this.get === 0 ? await getGoodsAll(this.currentPage) : await queryGoodsList(this.pname, this.procode,this.currentPage)
				if(dataReceipt.data.code === '1111'){
					this.receiptData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
				}else {
					this.receiptData = []
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
