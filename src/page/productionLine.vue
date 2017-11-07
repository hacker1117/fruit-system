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
		            	<el-input style="width: 195px" v-model="form.packid" auto-complete="off"></el-input>
		            </el-form-item>
					<el-form-item label="生产线名称" :label-width="formLabelWidth">
		            	<el-input style="width: 195px" v-model="form.packagename" auto-complete="off"></el-input>
		            </el-form-item>
					<el-form-item label="坑位数量" :label-width="formLabelWidth">
		            	<el-input-number style="width: 195px" v-model="form.prostandard" :step="2" :min="0" :max="100"></el-input-number>
		           </el-form-item>
					<el-form-item label="优先级（1-10）" :label-width="formLabelWidth">
		            	<el-select v-model="pack" placeholder="请选择商品分类">
							<el-option v-for="(item,index) in 10" :key="item" :label="item" :value="item"></el-option>
						</el-select>
		            </el-form-item>
					<el-form-item label="是否可用" :label-width="formLabelWidth">
		            	<el-select v-model="goodstype" placeholder="请选择商品分类">
							<el-option value="可用">可用</el-option>
							<el-option value="不可用">不可用</el-option>
						</el-select>
		           </el-form-item>
					<el-form-item label="最大承载订单数" :label-width="formLabelWidth">
		            	<el-input-number style="width: 195px" v-model="form.prosta" :step="100" :min="0" :max="10000"></el-input-number>
		           </el-form-item>
		        </el-form>
		        <div slot="footer" class="dialog-footer">
		            <el-button @click="dialogFormVisible = false">取 消</el-button>
		            <el-button type="primary" @click="categoryAdd">确 定</el-button>
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
	                  label="生产线ID">
	                </el-table-column>
	               <el-table-column
	                  width="180"
	                  property="packagename"
	                  label="所属仓库">
	                </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="prostandard"
	                  label="生产线名称">
	               </el-table-column>
	               <el-table-column
	                  width="180"
	                  property="packcount"
	                  label="坑位数">
	               </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="prounite"
	                  label="优先级别">
	               </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="prounite"
	                  label="是否可用">
	               </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="prounite"
	                  label="最大承载订单数">
	               </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="prounite"
	                  label="最后操作日期">
	               </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="prounite"
	                  label="当前坑位号">
	               </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="prounite"
	                  label="当前批次号">
	               </el-table-column>
	               <el-table-column
	                  width="120"
	                  property="prounite"
	                  label="当前承载订单数">
	               </el-table-column>
	                <el-table-column
					label="操作">
						<template scope="scope">
						<el-button
						size="mini"
						@click="category(scope.row)">修改</el-button>
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
				formLabelWidth: '120px',
				form: {
					prosta: '',
					packid: '',
					packagename: '',
					prostandard: '',
					packcount: '',
					prounite: '',
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
                    this.$message('添加生产线成功!')
                    this.dialogFormVisible = false
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
