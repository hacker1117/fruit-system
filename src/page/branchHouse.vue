<template>
    <div class="fillcontain">
        <head-top></head-top>
		<el-row style="margin: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px;">
			<el-col :span="24">
				<el-button @click="dialogFormVisible = true" >新增分库</el-button>
			</el-col>
		</el-row>
        <el-dialog title="新增分库" v-model="dialogFormVisible">
        <el-form :model="form">
			<el-form-item label="仓库编码" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.repocode" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="仓库名称" :label-width="formLabelWidth">
            	<el-input style="width: 195px" v-model="form.reponame" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="所属区域id" :label-width="formLabelWidth">
            	<!--<el-input style="width: 195px" v-model="form.id" auto-complete="off"></el-input>-->
            	<el-select v-model="form.id" placeholder="请选择所属区域id">
                    <el-option v-for="repo in repoList" :key="repo" :label="repo" :value="repo"></el-option>
                </el-select>
           </el-form-item>
           <el-form-item label="是否默认仓库" :label-width="formLabelWidth">
            	<el-radio-group v-model="form.isDefault">
					<el-radio :label="0">否</el-radio>
					<el-radio :label="1">是</el-radio>
				</el-radio-group>
           </el-form-item>
           <el-form-item label="状态" :label-width="formLabelWidth">
            	<el-radio-group v-model="form.repostate">
					<el-radio :label="0">启用</el-radio>
					<el-radio :label="1">禁用</el-radio>
				</el-radio-group>
           </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </div>
        </el-dialog>
        <div class="table_container">
            <el-table
                :data="tableData"
                stripe
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  property="reponame"
                  label="仓库名称">
                </el-table-column>
               <el-table-column
                  property="repocode"
                  label="仓库编码">
               </el-table-column>
                <el-table-column
				label="操作">
					<template scope="scope">
						<el-button
						size="mini"
						@click="confirmDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="5"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getRepoBranch, getCategoryChild, deleteCategory, IncreasePool,deleteLibrary, getregion} from '@/api/getData'
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
				formLabelWidth: '120px',
				form: {
					repocode: '',
					reponame: '',
					id: '',
					isDefault: '',
					repostate: '',
				},
				repoList: [],
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
                    const countData = await getRepoBranch(1,10);
                    console.log(countData.data)
                    this.tableData = countData.data.data.list
                    this.count = countData.data.data.total
                    for(let i = 0;i<this.tableData.length;i++){
                        this.tableData[i].isDefault = this.tableData[i].isDefault == 0 ? '否' : '是'
                    }
                    const repos = await getregion()
					this.repoList = repos.data.data
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
			async confirmAdd(){
				const addInfo = await IncreasePool(this.form.repocode, this.form.reponame, this.form.id, this.form.isDefault, this.form.repostate)
				if(addInfo.data.code === '1111'){
					this.$message('新增分库成功')
					this.dialogFormVisible = false
					this.initData()
				}else {
					this.$message(addInfo.data.message)
				}
			},
            async handleChoose(row) {
                console.log(row)
                const classData = await getCategoryChild(row.categorycode)
                if(classData.data.code === '1111'){
                    this.childData = classData.data.data.list
                }else {
                    this.childData = []
                }
                this.currentClass = row.categoryname
            },
			confirmDelete(index,row) {
				this.$confirm('此操作将删除该分库, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.handleDelete(index,row)
//					this.$message({
//						type: 'success',
//						message: '删除成功!'
//					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			async handleDelete(index,row) {
				const isDeleted = await deleteLibrary(row.repocode)
				console.log(isDeleted.data)
				if(isDeleted.data.code === '1111') {
					this.initData()
				}else {
					this.$message(isDeleted.data.message)
					this.receiptData = []
					this.count = 0
				}
			},
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
            },
            async getUsers(){
                const Users = await getUserList({offset: this.offset, limit: this.limit});
                this.tableData = [];
                Users.forEach(item => {
                    const tableData = {};
                    tableData.registe_time = item.registe_time;
                    tableData.city = item.city;
                    this.tableData.push(tableData);
                })
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
