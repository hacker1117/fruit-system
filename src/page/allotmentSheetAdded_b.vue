<template>
	<div>
	    <head-top></head-top>
	    <div class="fruit-content">
	        <el-dialog title="新增调拨单商品" v-model="dialogFormVisible">
		        <el-form :model="form">
		        	<el-form-item label="商品名称" :label-width="formLabelWidth">
						<el-autocomplete
						v-model="form.pname"
						:fetch-suggestions="querySearchAsync"
						placeholder="请输入名称模糊搜索"
						@select="handleAddChild"
						></el-autocomplete>
		        	</el-form-item>
					<el-form-item label="商品编码" :label-width="formLabelWidth">
		                <el-input style="width: 195px" v-model="form.proid" auto-complete="off" :disabled="true"></el-input>
		        	</el-form-item>
					<el-form-item label="规格型号" :label-width="formLabelWidth">
		                <el-input style="width: 195px" v-model="form.prostandard" auto-complete="off" :disabled="true"></el-input>
		        	</el-form-item>
					<el-form-item label="单位" :label-width="formLabelWidth">
		                <el-input style="width: 195px" v-model="form.ponunite" auto-complete="off" :disabled="true"></el-input>
		        	</el-form-item>
					<el-form-item label="调入仓库" :label-width="formLabelWidth">
		                <el-select v-model="form.inrepocde" placeholder="请选择调入仓库" :disabled="toggle1">
			                <el-option v-for="classif in classification" :key="classif.id" :label="classif.reponame" :value="classif.repocode"></el-option>
			            </el-select>
		        	</el-form-item>
					<el-form-item label="调拨类型" :label-width="formLabelWidth">
						<el-select v-model="form.switchtype" placeholder="请选择调拨类型" @change="handleSearch" :disabled="toggle1">
			                <el-option label="缺货调拨" value="1"></el-option>
			                <el-option label="促销调拨" value="2"></el-option>
			                <el-option label="转大宗出库" value="3"></el-option>
			            </el-select>
		           </el-form-item>
					<el-form-item label="数量" :label-width="formLabelWidth">
		                <el-input style="width: 195px" v-model="form.allocatecount" auto-complete="off"><template slot="append">{{this.pronuite}}</template></el-input>
		            </el-form-item>
		            <el-row style="margin-bottom: 20px;" v-if="toggle">
						<el-col :span="24"><div style="font-size: 16px;color: #48576a;text-align: center;">调入调拨商品</div></el-col>
					</el-row>
		        	<el-form-item label="商品名称" :label-width="formLabelWidth" v-if="toggle">
						<!--<el-autocomplete
						v-model="form.productname"
						:fetch-suggestions="querySearchAsync2"
						placeholder="请输入名称模糊搜索"
						@select="handleAddChild2"
						></el-autocomplete>-->
						<el-select v-model="form.productname" placeholder="请选择商品名称" @change="handleSearch2">
			                <el-option v-for="classif2 in classification2" :key="classif2.proid" :label="classif2.pname" :value="classif2.proid"></el-option>
			            </el-select>
		        	</el-form-item>
					<el-form-item label="商品编码" :label-width="formLabelWidth" v-if="toggle">
		                <el-input style="width: 195px" v-model="form.inproid" auto-complete="off" :disabled="true"></el-input>
		        	</el-form-item>
					<el-form-item label="规格型号" :label-width="formLabelWidth" v-if="toggle">
		                <el-input style="width: 195px" v-model="form.productprostandard" auto-complete="off" :disabled="true"></el-input>
		        	</el-form-item>
					<el-form-item label="单位" :label-width="formLabelWidth" v-if="toggle">
		                <el-input style="width: 195px" v-model="form.productponunite" auto-complete="off" :disabled="true"></el-input>
		        	</el-form-item>
		        </el-form>
		        <div slot="footer" class="dialog-footer">
		            <el-button @click="dialogFormVisible = false">取 消</el-button>
		            <el-button type="primary" @click="addAllocate">确 定</el-button>
		        </div>
	        </el-dialog>
			<el-row style="margin-top: 20px;">
				<el-col :span="24">
	                <el-button style="float: right;" @click="Preservation" type="primary">生成调拨单</el-button>
	                <el-button style="float: left;" @click="allocation">新增调拨单商品</el-button>
	            </el-col>
			</el-row>
	        <div class="table_container">
	            <el-table
	                :data="tableData"
	                stripe
	                highlight-current-row
	                style="width: 100%">
	               <el-table-column
	                  property="proid"
	                  label="商品编码">
	               </el-table-column>
	               <el-table-column
	                  property="pname"
	                  label="商品名称">
	                </el-table-column>
	               <el-table-column
	                  property="allocatecount"
	                  label="数量">
	               </el-table-column>
	               <el-table-column
	                  property="ponunite"
	                  label="单位">
	               </el-table-column>
	               <el-table-column
	                  property="prostandard"
	                  label="规格型号">
	               </el-table-column>
	               <el-table-column
	                  property="inreponame"
	                  label="调入仓库">
	               </el-table-column>
					<el-table-column fixed="right"
					label="操作" width="120px">
					<template scope="scope">
						<el-button
						size="small"
						@click="deletes(scope.$index, scope.row)">删除</el-button>
					</template>
					</el-table-column>
	            </el-table>
	            <div class="Pagination" style="text-align: left;margin-top: 10px;">
	            	共 {{this.count}} 条
	            	<el-button style="float: right;" @click="Return" type="primary">返回</el-button>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getaddAllocate_b, getaddAllocate2_b, getWarehouse_b, queryWarehouse_b, getProList3, getProList2, getInventoryChild_b,getupdateTswitch_b, getdeleteOne_b} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                tableData1: [],
                count: 0,
                currentPage: 1,
				dialogFormVisible: false,
				formLabelWidth: '120px',
				form: {
					pname: '',
					proid: '',
					prostandard: '',
					ponunite: '',
					inrepocde: '',
					switchtype: '',
					allocatecount: '',
					productname: '',
					inproid: '',
					productprostandard: '',
					productponunite: '',
				},
				startTime:'',
				endTime:'',
				get: 0,
				ordercode:'',
				pronuite: '',
				classification: [],
				classification2: [],
		        inreponame: '',
		        Warehouse: [],
		        list: [],
		        lists: '',
				toggle: false,
				toggle1: false,
				outproid: '',
        		allocateCount: '',
        		proid: '',
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        beforeRouteLeave (to, from, next) {
            this.$destroy()
            next()
        },
        methods: {
            async initData(){
                try{
                    //调入仓库
					const classi = await getWarehouse_b()
					this.classification = classi.data.data
					this.Warehouse = classi.data.data
					console.log(this.Warehouse)
                	const countData = await queryWarehouse_b()
                	if(countData.data.code === '1111'){
						console.log(countData.data.data)
						this.tableData = countData.data.data
						this.count = countData.data.data.length
					} else {
						this.$message(resData.data.message)
						this.tableData = []
						this.count = 0
					}
                	this.toggle1 = false
                }catch(err){
                    console.log('获取数据失败', err);
                    this.tableData = []
					this.count = 0
                }
           },
           async handleSearch2(){
           	for(let i = 0; i<this.classification2.length; i++){
					if(this.form.productname == this.classification2[i].proid) {
						this.form.inproid = this.classification2[i].proid
						this.form.productprostandard = this.classification2[i].prostandered
						this.form.productponunite = this.classification2[i].pronuite
					}
				}
           },
        	async addAllocate(){
        		for(let i = 0; i<this.classification2.length; i++){
					if(this.form.inrepocde == this.classification2[i].repocode) {
						this.inreponame = this.classification2[i].reponame
					}
				}
        		let dataReceipt = {}
        		if(this.form.switchtype == 1 || this.form.switchtype == 3){
        			dataReceipt = await getaddAllocate_b(this.form.pname, this.form.proid, this.form.prostandard, this.form.ponunite, this.form.inrepocde, this.form.switchtype, this.form.allocatecount, this.inreponame)
        		}else if(this.form.switchtype == 2){
        			this.outproid = this.form.proid
        			this.allocateCount = this.form.allocatecount
        			dataReceipt = await getaddAllocate2_b(this.outproid, this.form.inrepocde, this.form.switchtype, this.allocateCount, this.form.inproid)
        		}
//      		const resData = await getaddAllocate_b(this.form.pname, this.form.proid, this.form.prostandard, this.form.ponunite, this.form.inrepocde, this.form.switchtype, this.form.allocatecount, this.inreponame)
				console.log(dataReceipt.data)
				if(dataReceipt.data.code === '1111'){
					this.$message(dataReceipt.data.message)
					this.form.pname = ""
					this.form.proid = ""
					this.form.prostandard = ""
					this.form.ponunite = ""
					this.form.inreponame = ""
					this.form.switchtype = ""
					this.form.inrepocde = ""
					this.form.allocatecount = ""
					this.form.inreponame = ""
					this.form.productname = ""
					this.form.inproid = ""
					this.form.productprostandard = ""
					this.form.productponunite = ""
					this.dialogFormVisible = false
					this.initData()
				} else {
					this.$message(dataReceipt.data.message)
				}
        	},
			async deletes(index,row) {
				const resDatas = await getdeleteOne_b(row.allocatedetailid)
				if(resDatas.data.code === '1111'){
					this.$message(resDatas.data.message)
					this.initData()
				} else {
					this.$message(resData.data.message)
				}
			 },
			async Preservation(){//post
				console.log(this.tableData)
				for(let i=0;i<this.tableData.length;i++){
//					this.lists += "list["+[i]+"].proid="+this.tableData[i].proid+"&"+"list["+[i]+"].pname="+this.tableData[i].pname+"&"+"list["+[i]+"].allocatecount="+this.tableData[i].allocatecount+"&"+"list["+[i]+"].ponunite="+this.tableData[i].ponunite+"&"+"list["+[i]+"].prostandard="+this.tableData[i].prostandard+"&"+"list["+[i]+"].inreponame="+this.tableData[i].inreponame+"&"
					this.lists += this.tableData[i].allocatedetailid+","
					console.log(this.lists)
				}
				console.log(this.tableData1)
				const resData = await getupdateTswitch_b(this.lists)
				if(resData.data.code === '1111'){
					this.$message(resData.data.message)
					this.initData()
				} else {
					this.$message(resData.data.message)
				}
			},
			async allocation(){
					this.form.pname = ""
					this.form.proid = ""
					this.form.prostandard = ""
					this.form.ponunite = ""
					this.form.inreponame = ""
					this.form.switchtype = ""
					this.form.inrepocde = ""
					this.form.allocatecount = ""
					this.form.inreponame = ""
					this.form.productname = ""
					this.form.inproid = ""
					this.form.productprostandard = ""
					this.form.productponunite = ""
				this.dialogFormVisible = true
				console.log(this.tableData.length)
				if(this.tableData.length !== 0){
					this.form.inrepocde = this.tableData[0].inrepocde
					this.form.switchtype = this.tableData[0].switchtype
					this.toggle1 = true
				}else{
					this.toggle = false
					this.toggle1 = false
				}
			},
			async handleSearch(){
				console.log(this.form.switchtype)
				if(this.form.switchtype == 2){
					this.toggle = true
					const result2 = await getProList2(this.form.pname,this.form.proid)
					if(result2.data.code === '1111'){
						this.classification2 = result2.data.data
					}
					console.log(this.classification2)
					console.log(this.classification2.length)
					console.log(this.classification2.pname)
				}else{
					this.toggle = false
				}
			},
            async Return() {
				this.$destroy()
				this.$router.push('/allotmentSheet_b')
            },
			async querySearchAsync(queryString, cb) {
				let results=[]
				console.log(this.goodsList)
				const result = await getProList3(queryString)
				if(result.data.code === '1111'){
					results = result.data.data
					this.goodsList = result.data.data
					for(let i=0;i<results.length;i++){
						results[i].value=results[i].proname
					}
				}
				clearTimeout(this.timeout)
				this.timeout = setTimeout(() => {
					cb(results);
				}, 3000 * Math.random());
			},
			handleAddChild(){
				for(let i = 0; i<this.goodsList.length; i++){
					if(this.form.pname == this.goodsList[i].proname) {
						this.confirmIndex = i
						this.form.proid=this.goodsList[i].repocode
						this.form.prostandard=this.goodsList[i].prostandard
						this.form.ponunite=this.goodsList[i].prounite
						this.pronuite=this.goodsList[i].prounite
					}
				}
				this.handleSearch()
			}
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
    .el-col {
		border-radius: 4px;
		height: 36px;
		line-height: 36px;
		font-size: 14px;
	}
	.fruit-content {
		padding: 0 4%;
	}
</style>
