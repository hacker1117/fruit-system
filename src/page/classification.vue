<template>
    <div class="fillcontain">
        <head-top></head-top>
		<el-row style="margin-top: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px; margin-left:2%">
			<el-col :span="24">
				<el-button @click="handleAdd" >新增父类</el-button>
			</el-col>
		</el-row>
        <el-dialog title="新增父类" v-model="dialogFormVisible">
        <el-form :model="form">
			<el-form-item label="分类名称" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.categoryname" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </div>
        </el-dialog>
        <el-dialog title="新增子类" v-model="dialogFormVisibleChild">
        <el-form :model="form">
			<el-form-item label="分类名称" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.childcategoryname" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleChild = false">取 消</el-button>
            <el-button type="primary" @click="confirmAddChild">确 定</el-button>
        </div>
        </el-dialog>
        <div class="table_container">
            <el-table @row-click="handleChoose"
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column @click="handleChoose"
                  property="categorycode"
                  label="分类ID">
                </el-table-column>
                <el-table-column @click="handleChoose"
                  property="categoryname"
                  label="分类名称">
                </el-table-column>
                <el-table-column
                label="操作">
                <template scope="scope">
                    <el-button
                    size="mini"
                    @click="handleAdd(scope.$index, scope.row)">增加</el-button>
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button
                    size="mini"
                    @click="confirmDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button
                    size="mini"
                    @click="handleAddChild(scope.$index, scope.row)">添加二级分类</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="5"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
            <el-row style="margin-top: 20px;margin-bottom: 20px;">
                <el-col :span="24">
                    <h1>当前分类:{{currentClass}}</h1>
                </el-col>
            </el-row>
            <el-table
                :data="childData"
                highlight-current-row
                style="width: 100%;margin-top:20px;">
                <el-table-column
                  type="index"
                  label="序号">
                </el-table-column>
                <el-table-column
                  property="categorycode"
                  label="分类ID">
                </el-table-column>
                <el-table-column
                  property="categoryname"
                  label="分类名称">
                </el-table-column>
                <el-table-column
                  property="parentcategoryname"
                  label="归属分类">
                </el-table-column>
                <el-table-column
                label="操作">
                <template scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEditChild(scope.$index, scope.row)">修改</el-button>
                    <el-button
                    size="mini"
                    @click="confirmDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
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
    import {getCategoryAll, getCategoryChild, deleteCategory, addFatherCate, addChildCate} from '@/api/getData'
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
                currentClassId: '',
                form: {},
                dialogFormVisible: false,
                formLabelWidth: '120px',
                dialogFormVisibleChild: false
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
                    const countData = await getCategoryAll(1,10);
                    console.log(countData.data)
                    this.tableData = countData.data.data.list
                    this.count = countData.data.data.total
                }catch(err){
                    console.log('获取数据失败', err);
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
                this.currentClassId = row.categorycode
            },
            handleAdd() {
                this.dialogFormVisible = true
            },
            handleEdit() {

            },
            confirmDelete(index,row) {
                this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
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
                const isDeleted = await deleteCategory(row.categorycode)
                if(isDeleted) {
                    this.initData()
                }
            },
            handleAddChild() {
                this.dialogFormVisibleChild = true
            },
            handleEditChild() {

            },
            handleEditChild() {

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
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
                    tableData.username = item.username;
                    tableData.registe_time = item.registe_time;
                    tableData.city = item.city;
                    this.tableData.push(tableData);
                })
            },
            async confirmAdd(){
                const addData = await addFatherCate(this.form.categoryname)
                if(addData.data.code === '1111'){
                    this.$message('添加父级组成功')
                    this.initData()
                }else {
                    this.$message(addData.data.message)
                    this.dialogFormVisible = true
                }
            },
            async confirmAddChild(){
                const addData = await addChildCate(this.form.childcategoryname,this.currentClass,this.currentClassId)
                if(addData.data.code === '1111'){
                    this.$message('添加子类组成功')
                    this.initData()
                }else {
                    this.$message(addData.data.message)
                    this.dialogFormVisibleChild = false
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
