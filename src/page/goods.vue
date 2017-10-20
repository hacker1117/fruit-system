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
        <el-form :model="form">
			<el-form-item label="商品编码" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.proid" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="商品名称" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.pname" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="规格" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.prostandered" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="商品属性" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.commodityattribute" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="厂家" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.factories" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="品牌" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.brand" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="供应商编码" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.supplierid" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="参考进价" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.referenceinprice" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="创建人" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.createman" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </div>
        </el-dialog>
            <el-dialog title="编辑货品" v-model="dialogFormVisible2">
                <el-form :model="form">
                    <el-form-item label="商品名称" :label-width="formLabelWidth">
                        <el-input style="width: 195px" v-model="form2.pname" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="规格" :label-width="formLabelWidth">
                        <el-input style="width: 195px" v-model="form2.prostandered" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品属性" :label-width="formLabelWidth">
                        <el-input style="width: 195px" v-model="form2.commodityattribute" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="厂家" :label-width="formLabelWidth">
                        <el-input style="width: 195px" v-model="form2.factories" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌" :label-width="formLabelWidth">
                        <el-input style="width: 195px" v-model="form2.brand" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="供应商编码" :label-width="formLabelWidth">
                        <el-input style="width: 195px" v-model="form2.supplierid" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="参考进价" :label-width="formLabelWidth">
                        <el-input style="width: 195px" v-model="form2.referenceinprice" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
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
				@size-change="handleSizeChange"
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
    import {getGoodsAll, queryGoodsList, addGoods, appGoodsList, bindAppGoods, updateGoods} from '@/api/getData'
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
				barcode: '',
				placeoforigin: '',
				form:{
					appGoodsIndex:''
				},
                form2:{},
				appBindId:'',
				formLabelWidth: '120px',
				dialogFormVisible: false,
				dialogFormVisibleGood: false,
                dialogFormVisible2: false,
				appGoodsList:[],
				confirmIndex: '',
				currentPage: 1
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
					const dataReceipt = await getGoodsAll(this.currentPage)
					console.log('re: ',dataReceipt.data.data)
					this.receiptData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
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
                const goodsAdd = await addGoods(this.form.proid,this.form.pname,this.form.prostandered,this.form.commodityattribute,this.form.factories,this.form.brand,this.form.supplierid,this.form.referenceinprice,this.form.createman)
                if(goodsAdd.data.code === '1111') {
                    this.$message('添加货品成功!')
                    this.dialogFormVisible = false
                    this.initData()
                } else {
                    this.$message(goodsAdd.data.message)
                }
			},
            async confirmEditOld(){
                console.log(this.form)
                const goodsAdd = await updateGoods(this.form2.proid,this.form2.pname,this.form2.prostandered,this.form2.commodityattribute,this.form2.factories,this.form2.brand,this.form2.supplierid,this.form2.referenceinprice)
                if(goodsAdd.data.code === '1111') {
                    this.$message('修改货品成功!')
                    this.dialogFormVisible2 = false
                    this.initData()
                } else {
                    this.$message(goodsAdd.data.message)
                }
            },
            handleEditOld(index, row) {
                this.dialogFormVisible2 = true
                this.form2 = row
            },
			async confirmBind(){
				console.log(this.appGoodsList)
				console.log(this.confirmIndex)
				const bindInfo = await bindAppGoods(this.appGoodsList[this.confirmIndex].productId, this.appGoodsList[this.confirmIndex].sku, this.appBindId)
				if(bindInfo.data.code === '1111'){
					this.$message('绑定成功')
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
				const dataReceipt = this.get = 0 ? await getGoodsAll(this.currentPage) : await queryGoodsList(this.pname, this.procode,this.currentPage)
				if(dataReceipt.data.code === '1111'){
					this.receiptData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
				}else {
					this.receiptData = []
				}
			},
			handleSizeChange() {

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
