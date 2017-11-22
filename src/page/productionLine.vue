<template>
	<div>
	    <head-top></head-top>
	    <div class="fruit-content">
			<el-row style="margin-top: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px;">
				<el-col :span="24">
					<el-button @click="dialogFormVisible = true" >新增生产线</el-button>
				</el-col>
			</el-row>
	        <el-dialog title="新增生产线" v-model="dialogFormVisible">
		        <el-form :model="form">
					<el-form-item label="仓库编码" :label-width="formLabelWidth">
		            	<el-select v-model="form.repcode" placeholder="请选择仓库">
		                    <el-option v-for="supplier in supplierList" :key="supplier.id" :label="supplier.repocode" :value="supplier.repocode"></el-option>
		                </el-select>
		            </el-form-item>
					<el-form-item label="生产线名称" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form.pipeline" auto-complete="off"></el-input>
		            </el-form-item>
					<el-form-item label="坑位数量" :label-width="formLabelWidth">
		            	<el-input-number style="width: 195px" v-model="form.holenum" :step="2" :min="0" :max="100"></el-input-number>
		           </el-form-item>
					<el-form-item label="优先级（1-10）" :label-width="formLabelWidth">
		            	<el-select v-model="form.prioritylevel" placeholder="请选择商品分类">
							<el-option v-for="(item,index) in 10" :key="item" :label="item" :value="item"></el-option>
						</el-select>
		            </el-form-item>
					<el-form-item label="是否可用" :label-width="formLabelWidth">
		            	<el-select v-model="form.isenable" placeholder="请选择商品分类">
							<el-option :value="1">可用</el-option>
							<el-option :value="0">不可用</el-option>
						</el-select>
		           </el-form-item>
					<el-form-item label="最大承载订单数" :label-width="formLabelWidth">
		            	<el-input-number style="width: 195px" v-model="form.maxnum" :step="100" :min="0" :max="10000"></el-input-number>
		           </el-form-item>
		        </el-form>
		        <div slot="footer" class="dialog-footer">
		            <el-button @click="dialogFormVisible = false">取 消</el-button>
		            <el-button type="primary" @click="productionAdd">确 定</el-button>
		        </div>
       		</el-dialog>
	        <el-dialog title="修改生产线" v-model="dialogFormVisible1">
		        <el-form :model="form1">
					<el-form-item label="生产线ID" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form1.id" auto-complete="off" :disabled="true"></el-input>
		            </el-form-item>
					<el-form-item label="仓库编码" :label-width="formLabelWidth">
		            	<el-select v-model="form1.repcode" placeholder="请选择仓库">
		                    <el-option v-for="supplier in supplierList" :key="supplier.id" :label="supplier.repocode" :value="supplier.repocode"></el-option>
		                </el-select>
		            </el-form-item>
					<el-form-item label="生产线名称" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form1.pipeline" auto-complete="off"></el-input>
		            </el-form-item>
					<el-form-item label="坑位数量" :label-width="formLabelWidth">
		            	<el-input-number style="width: 195px" v-model="form1.holenum" :step="2" :min="0" :max="100"></el-input-number>
		           </el-form-item>
					<el-form-item label="优先级（1-10）" :label-width="formLabelWidth">
		            	<el-select v-model="form1.prioritylevel" placeholder="请选择商品分类">
							<el-option v-for="(item,index) in 10" :key="item" :label="item" :value="item"></el-option>
						</el-select>
		            </el-form-item>
					<el-form-item label="是否可用" :label-width="formLabelWidth">
		            	<el-select v-model="form1.isenable" placeholder="请选择商品分类">
							<el-option :value="1">可用</el-option>
							<el-option :value="0">不可用</el-option>
						</el-select>
		           </el-form-item>
					<el-form-item label="最大承载订单数" :label-width="formLabelWidth">
		            	<el-input-number style="width: 195px" v-model="form1.maxnum" :step="100" :min="0" :max="10000"></el-input-number>
		           </el-form-item>
		        </el-form>
		        <div slot="footer" class="dialog-footer">
		            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
		            <el-button type="primary" @click="modify">确 定</el-button>
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
	                  property="id"
	                  label="生产线ID">
	                </el-table-column>
	               <el-table-column
	                  width="180"
	                  property="repcode"
	                  label="所属仓库">
	                </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="pipeline"
	                  label="生产线名称">
	               </el-table-column>
	               <el-table-column
	                  width="180"
	                  property="holenum"
	                  label="坑位数">
	               </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="prioritylevel"
	                  label="优先级别">
	               </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="isenable"
	                  label="是否可用">
	               </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="maxnum"
	                  label="最大承载订单数">
	               </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="operatedate"
	                  label="最后操作日期">
	               </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="streamcount"
	                  label="当前坑位号">
	               </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="batch"
	                  label="当前批次号">
	               </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="ordercount"
	                  label="当前承载订单数">
	               </el-table-column>
	                <el-table-column fixed="right" width="120"
					label="操作">
						<template scope="scope">
						<el-button
						size="mini"
						@click="category(scope.$index, scope.row)">修改</el-button>
						<el-button
						size="mini"
						@click="ProductionDelete(scope.$index, scope.row)">删除</el-button>
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
    import {getProduction,addProduction,modifyProduction,DeleteProduction,getWarehouse} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                batchData: [],
                goodstype: "",
                pack: "",
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
				formLabelWidth: '120px',
				form:{
					repcode: '',
					pipeline: '',
					holenum: '',
					prioritylevel: '',
					isenable: '',
					maxnum: '',
				},
				form1:{
					id: '',
					repcode: '',
					pipeline: '',
					holenum: '',
					prioritylevel: '',
					isenable: '',
					maxnum: '',
				},
				checkdate: '',
				supplierList: [],
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
                    const countData = await getProduction(1,10);
                    console.log(countData.data)
                    this.tableData = countData.data.data.list
                    this.count = countData.data.data.total
					const classi = await getWarehouse()
					this.supplierList = classi.data.data
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
			async productionAdd(){
				console.log(this.form)
				console.log(this.form.repcode)
                const goodsAdd = await addProduction(this.form.repcode,this.form.pipeline,this.form.holenum,this.form.prioritylevel,this.form.isenable,this.form.maxnum)
                if(goodsAdd.data.code === '1111') {
                    this.$message(goodsAdd.data.message)
					this.form.repcode = ""
					this.form.pipeline = ""
					this.form.holenum = ""
					this.form.prioritylevel = ""
					this.form.isenable = ""
					this.form.maxnum = ""
                    this.dialogFormVisible = false
                    this.initData()
                } else {
                    this.$message(goodsAdd.data.message)
                }
			},
			async modify(){
				console.log(this.form)
				console.log(this.form.repcode)
                const goodsAdd = await modifyProduction(this.form1.id,this.form1.repcode,this.form1.pipeline,this.form1.holenum,this.form1.prioritylevel,this.form1.isenable,this.form1.maxnum)
                if(goodsAdd.data.code === '1111') {
                    this.$message(goodsAdd.data.message)
                    this.dialogFormVisible1 = false
                    this.initData()
                } else {
                    this.$message(goodsAdd.data.message)
                }
			},
			async category(index,row){
				this.dialogFormVisible1 = true
				console.log(index)
				console.log(row)
				this.form1 = row
//this.form1.id = row.id
//this.form1.repcode = row.repcode
//this.form1.pipeline = row.pipeline
//this.form1.holenum = row.holenum
//this.form1.prioritylevel = row.prioritylevel
//this.form1.isenable = row.isenable
//this.form1.maxnum = row.maxnum
			},
			async ProductionDelete(index,row) {
				this.$confirm('此操作将删除该生产线, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.categoryDelete(index,row)
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
			async categoryDelete(index,row){
				console.log(row.id)
                const goodsAdd = await DeleteProduction(row.id)
                if(goodsAdd.data.code === '1111') {
                    this.$message(goodsAdd.data.message)
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
