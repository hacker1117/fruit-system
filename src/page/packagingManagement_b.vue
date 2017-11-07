<template>
	<div>
	    <head-top></head-top>
	    <div class="fruit-content">
			<el-row style="margin-top: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px;">
				<el-col :span="24">
					<el-button @click="dialogFormVisible = true" >新增品类</el-button>
				</el-col>
			</el-row>
	        <el-dialog title="新增品类" v-model="dialogFormVisible">
		        <el-form :model="form">
					<el-form-item label="商品编码" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form.packid" auto-complete="off"></el-input>
		            </el-form-item>
					<el-form-item label="商品名称" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form.packagename" auto-complete="off"></el-input>
		            </el-form-item>
					<el-form-item label="规格型号" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form.prostandard" auto-complete="off"></el-input>
		           </el-form-item>
					<el-form-item label="数量" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form.packcount" auto-complete="off"></el-input>
		            </el-form-item>
					<el-form-item label="单位" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form.prounite" auto-complete="off"></el-input>
		           </el-form-item>
		        </el-form>
		        <div slot="footer" class="dialog-footer">
		            <el-button @click="dialogFormVisible = false">取 消</el-button>
		            <el-button type="primary" @click="categoryAdd">确 定</el-button>
		        </div>
       		</el-dialog>
	        <el-dialog title="修改品类" v-model="dialogFormVisible1">
		        <el-form :model="form1">
					<el-form-item label="商品编码" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form1.packid" auto-complete="off" :disabled="true"></el-input>
		            </el-form-item>
					<el-form-item label="商品名称" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form1.packagename" auto-complete="off"></el-input>
		            </el-form-item>
					<el-form-item label="规格型号" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form1.prostandard" auto-complete="off"></el-input>
		          </el-form-item>
					<el-form-item label="单位" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form1.prounite" auto-complete="off"></el-input>
		           </el-form-item>
		        </el-form>
		        <div slot="footer" class="dialog-footer">
		            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
		            <el-button type="primary" @click="categoryModify">确 定</el-button>
		        </div>
       		</el-dialog>
	        <el-dialog title="增加品类数量" v-model="dialogFormVisible2">
		        <el-form :model="form2">
					<el-form-item label="商品编码" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form2.packid" auto-complete="off" :disabled="true"></el-input>
		            </el-form-item>
					<el-form-item label="现存数量" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form2.packcount" auto-complete="off" :disabled="true"></el-input>
		            </el-form-item>
					<el-form-item label="增加数量" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form2.addcount" auto-complete="off"></el-input>
		            </el-form-item>
		        </el-form>
		        <div slot="footer" class="dialog-footer">
		            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
		            <el-button type="primary" @click="addNumber">确 定</el-button>
		        </div>
       		</el-dialog>
	        <el-dialog title="扣减品类数量" v-model="dialogFormVisible3">
		        <el-form :model="form3">
					<el-form-item label="商品编码" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form3.packid" auto-complete="off" :disabled="true"></el-input>
		            </el-form-item>
					<el-form-item label="现存数量" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form3.packCount" auto-complete="off" :disabled="true"></el-input>
		            </el-form-item>
		            <el-form-item label="扣减数量" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form3.useCount" auto-complete="off"></el-input>
		            </el-form-item>
		        </el-form>
		        <div slot="footer" class="dialog-footer">
		            <el-button @click="dialogFormVisible3 = false">取 消</el-button>
		            <el-button type="primary" @click="deductionNumber">确 定</el-button>
		        </div>
       		</el-dialog>
	        <div class="table_container">
	            <el-table
	                :data="tableData"
	                stripe
	                highlight-current-row
	                style="width: 100%">
	                <el-table-column
	                  width="180"
	                  property="packid"
	                  label="商品编码">
	                </el-table-column>
	               <el-table-column
	                  width="180"
	                  property="packagename"
	                  label="商品名称">
	                </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="prostandard"
	                  label="规格型号">
	               </el-table-column>
	               <el-table-column
	                  width="180"
	                  property="packcount"
	                  label="数量">
	               </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="prounite"
	                  label="单位">
	               </el-table-column>
	                <el-table-column
					label="操作">
						<template scope="scope">
						<el-button
						size="mini"
						@click="category(scope.row)">修改</el-button>
						<el-button
						size="mini"
						@click="add(scope.row)">增加</el-button>
						<el-button
						size="mini"
						@click="deduction(scope.row)">扣减</el-button>
						<el-button
						size="mini"
						@click="categoryDelete(scope.$index, scope.row)">删除</el-button>
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
	</div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getPacking_b,addcategory_b,deleteCategory_b,modifycategory_b,numberdeduction_b,numberadd_b} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 5,
                count: 0,
                currentPage: 1,
                childData:[],
                currentClass: '',
                count: 0,
                currentPage: 1,
				dialogFormVisible: false,
				dialogFormVisible1: false,
				dialogFormVisible2: false,
				dialogFormVisible3: false,
				formLabelWidth: '120px',
				form: {
					packid: '',
					packagename: '',
					prostandard: '',
					packcount: '',
					prounite: '',
				},
				form1: {
					packid: '',
					packagename: '',
					prostandard: '',
					packcount: '',
					prounite: '',
				},
				form2: {
					packid: '',
					packcount: '',
					addcount: '',
				},
				form3: {
					packid: '',
					packCount: '',
					useCount: '',
				},
				checkdate: '',
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
                    const countData = await getPacking_b(1,10);
                    console.log(countData.data)
                    this.tableData = countData.data.data.list
                    this.count = countData.data.data.total
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
			async categoryAdd(){
				console.log(this.form)
                const goodsAdd = await addcategory_b(this.form.packid,this.form.packagename,this.form.prostandard,this.form.packcount,this.form.prounite)
                if(goodsAdd.data.code === '1111') {
                    this.$message('添加品类成功!')
                    this.dialogFormVisible = false
                    this.initData()
                } else {
                    this.$message(goodsAdd.data.message)
                }
			},
			categoryDelete(index,row) {
				console.log(index)
				console.log(row)
				this.$confirm('此操作将删除该品类, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.handleDelete(index,row)
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			async handleDelete(index,row) {
				console.log(index)
				console.log(row)
				const isDeleted = await deleteCategory_b(row.packid)
				console.log(isDeleted.data)
				if(isDeleted.data.code === '1111') {
					this.initData()
				}
			},
			async category(row){
				console.log(row)
				console.log(row.packid)
				this.dialogFormVisible1 = true
                this.form1=row
			},
			async categoryModify(){
				console.log(this.form1)
                const goodsAdd = await modifycategory_b(this.form1.packid,this.form1.packagename,this.form1.prostandard,this.form1.packcount,this.form1.prounite)
                if(goodsAdd.data.code === '1111') {
                    this.$message('修改品类成功!')
                    this.dialogFormVisible1 = false
                    this.initData()
                } else {
                    this.$message(goodsAdd.data.message)
                }
			},
			async deduction(row){
				console.log(row)
				console.log(row.packid)
				this.dialogFormVisible3 = true
                this.form3=row
                this.form3.packCount=row.packcount
			},
			async deductionNumber(){
				console.log(this.form3)
                const goodsAdd = await numberdeduction_b(this.form3.packid,this.form3.packCount,this.form3.useCount)
                if(goodsAdd.data.code === '1111') {
                    this.$message('扣减品类数量成功!')
                    this.dialogFormVisible3 = false
                    this.initData()
                } else {
                    this.$message(goodsAdd.data.message)
                }
			},
			async add(row){
				console.log(row)
				console.log(row.packid)
				this.dialogFormVisible2 = true
                this.form2=row
			},
			async addNumber(){
				console.log(this.form2)
                const goodsAdd = await numberadd_b(this.form2.packid,this.form2.packcount,this.form2.addcount)
                if(goodsAdd.data.code === '1111') {
                    this.$message('增加品类数量成功!')
                    this.dialogFormVisible2 = false
                    this.initData()
                } else {
                    this.$message(goodsAdd.data.message)
                }
			},
			async handleCurrentChange(num){
				this.currentPage = num
				const dataReceipt = await getPacking_b(this.currentPage)
				if(dataReceipt.data.code === '1111'){
					this.tableData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
				}else {
					this.tableData = []
				}
			}
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .el-col {
		border-radius: 4px;
		height: 36px;
		line-height: 36px;
		font-size: 14px;
	}
	.fruit-content {
		padding: 0 4%;
	}
	.cell{
		text-align: center;
	}
</style>
