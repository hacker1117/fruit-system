<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
		<el-row style="margin-top: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px;">
			<el-col :span="24">
				<el-button @click="handleAdd" >新增虚拟库</el-button>
			</el-col>
		</el-row>
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  property="repocode"
                  label="仓库编码">
                </el-table-column>
                <el-table-column
                  property="protype"
                  label="货品类别">
                </el-table-column>
                <el-table-column
                  property="reponame"
                  label="仓库名称">
                </el-table-column>
				<el-table-column
				label="操作" width="120px">
				<template scope="scope">
					<el-button
					size="small"
					@click="deletehandle(scope.$index, scope.row)">删除</el-button>
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
            <el-dialog title="新增虚拟库" v-model="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="仓库名称" :label-width="formLabelWidth">
                    <el-input style="width: 195px" v-model="form.reponame" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="货品类别" :label-width="formLabelWidth">
                    <el-input style="width: 195px" v-model="form.protype" auto-complete="off"></el-input>
                </el-form-item>
                <span v-show='form.error'>{{form.error}}</span>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAdd(form.reponame, form.protype)">确 定</el-button>
            </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {deletevirtualLibrary_a, getCategoryChild, deleteCategory, getVirtualRepoAll, insertVirtualRepo} from '@/api/getData'
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
                formLabelWidth: '120px',
                form: {
                    reponame: '',
                    protype: '',
                    isDefault: false,
                    error: ''
                },
                dialogFormVisible: false
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
                    const countData = await getVirtualRepoAll(1,10);
                    countData.data.data.list.forEach(list => {
                        list.is_default = list.isDefault ? '是' : '不是'
                    })
                    this.tableData = countData.data.data.list
					this.count = countData.data.data.total
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleAdd() {
                this.dialogFormVisible = true
            },
            async confirmAdd(reponame, protype) {
                const res =await insertVirtualRepo(reponame, protype)
                if(res.data.code === '1111'){
					this.$message(res.data.message)
					this.dialogFormVisible = false
					this.initData()
				}else {
					this.$message(res.data.message)
				}
            },
			deletehandle(index,row) {
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
				const isDeleted = await deletevirtualLibrary_a(row.repocode)
				console.log(isDeleted.data)
				if(isDeleted.data.code === '1111') {
					this.initData()
					this.currentPage = 1
				}
			},
            async getUsers(){
                const Users = await getUserList({offset: this.offset, limit: this.limit});
                this.tableData = [];
                Users.forEach(item => {
                    const tableData = {};
                    tableData.username = item.username;
                    tableData.registe_time = item.registe_time;
                    tableData.city = item.city;
                    this.tableData.push(tableData);
                })
            },
			async handleCurrentChange(num){
				this.currentPage = num
				const countData = await getVirtualRepoAll(this.currentPage)
				if(countData.data.code === '1111'){
					this.tableData = countData.data.data.list
					this.count = countData.data.data.total
				}else {
					this.tableData = []
					this.count = 0
				}
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
