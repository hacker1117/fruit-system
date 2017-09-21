<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-row style="margin-top: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px; margin-left:2%;">
			<el-col :span="24">
				<el-button @click="dialogFormVisible = true" >新增一级组</el-button>
			</el-col>
		</el-row>
        <el-dialog title="新增一级组" v-model="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select v-model="form.roleid" placeholder="请选择角色">
                    <el-option label="分拣员" value="role001"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="组名称" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </div>
        </el-dialog>
        <el-dialog title="新增二级组" v-model="dialogFormVisibleChild">
        <el-form :model="form">
            <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select v-model="form.roleid" placeholder="请选择角色">
                    <el-option label="分拣员" value="role001"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分类" :label-width="formLabelWidth">
                <el-select v-model="form.categorycode" placeholder="请选择分类">
                    <el-option v-for="(cate,index) in cateList" :key="cate.id" :label="cate.categoryname" :value="cate.categorycode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="组名称" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.childname" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleChild = false">取 消</el-button>
            <el-button type="primary" @click="confirmChildAdd">确 定</el-button>
        </div>
        </el-dialog>
        <el-dialog title="选择人员" ref="dialog" v-model="dialogFormVisibleGroup">
		<el-table
            ref="multipleTable"
			:data="receiptData"
			stripe
            @selection-change="handleSelectionChange"
			style="margin-top:20px;text-align:left; width:50%;">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
			<el-table-column
			prop="uname"
			label="人员名称">
			</el-table-column>
		</el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleGroup = false">取 消</el-button>
            <el-button type="primary" @click="confirmChildGroup">确 定</el-button>
        </div>
        </el-dialog>
        <div class="table_container">
            <el-table @row-click="handleChoose"
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column @click="handleChoose"
                  property="saleid"
                  label="组ID">
                </el-table-column>
                <el-table-column @click="handleChoose"
                  property="salegroupname"
                  label="组名">
                </el-table-column>
                <el-table-column
                label="操作">
                <template scope="scope">
                    <el-button
                    size="mini"
                    @click="handleAdd(scope.$index, scope.row)">增加下级组</el-button>
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">删除</el-button>
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
                  property="saleid"
                  label="下级组ID">
                </el-table-column>
                <el-table-column
                  property="salegroupname"
                  label="下级组名称">
                </el-table-column>
                <el-table-column
                label="操作">
                <template scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEditChild(scope.$index, scope.row)">选择人员</el-button>
                    <el-button
                    size="mini"
                    @click="handleDeleteChild(scope.$index, scope.row)">删除</el-button>
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
    import {getGroupAll, getChildGroupAll, addGroup, addChildGroup, getCateAll, getGroupUser, queryUserList, bindUser} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                receiptData: [],
                currentRow: null,
                offset: 0,
                limit: 5,
                count: 0,
                currentPage: 1,
                childData:[],
                currentClass: '',
                dialogFormVisible: false,
                dialogFormVisibleChild: false,
                dialogFormVisibleGroup: false,
                cateList:[],
                fid: '',
                saleid: '',
                form:{
                    roleid: '',
                    categorycode: ''
                },
                formLabelWidth: '120px',
                multipleSelection: [],
                idArray:[]
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const countData = await getGroupAll();
                    console.log(countData.data)
                    this.tableData = countData.data.data.list
                }catch(err){
                    console.log('获取数据失败', err);
                }
                const cateData = await getCateAll();
                console.log(cateData.data)
                this.cateList = cateData.data.data
            },
            async handleChoose(row) {
                console.log(row)
                const classData = await getChildGroupAll(row.saleid)
                if(classData.data.code === '1111'){
                    this.childData = classData.data.data
                }else {
                    this.childData = []
                }
                this.currentClass = row.salegroupname
            },
            handleAdd(index,row) {
                this.fid = row.saleid
                this.dialogFormVisibleChild = true
            },
            async confirmChildAdd() {
                const groupInfo = await addChildGroup(this.form.childname,this.fid,this.form.roleid,this.form.categorycode)
                if(groupInfo.data.code === '1111') {
                    this.$message('添加一级组成功')
                    this.dialogFormVisibleChild = false
                    this.initData()
                }else {
                    this.$message(groupInfo.data.message)
                }
            },
            handleEdit() {

            },
            handleDelete() {

            },
            handleAddChild() {

            },
            async handleEditChild(index,row) {
                this.dialogFormVisibleGroup = true
                const dataReceipt = await queryUserList()
                this.receiptData = dataReceipt.data.data.list
                const userViews = await getGroupUser(row.saleid)
                this.saleid = row.saleid
                for(let i = 0;i < this.receiptData.length; i++){
                    for(let j = 0;j < userViews.data.data.length; j++){
                        if(this.receiptData[i].pagecode === userViews.data.data[j].pagecode){
                            console.log('table', this.$refs)
                            this.$refs.multipleTable.toggleRowSelection(this.receiptData[i])
                            console.log(i,j)
                        }
                    }
                }
                this.salegroupname = row.saleid
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
                console.log(val)
            },
            toggleSelection(rows) {
                if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
                } else {
                this.$refs.multipleTable.clearSelection();
                }
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
            async confirmAdd() {
                const groupInfo = await addGroup(this.form.roleid,this.form.name)
                if(groupInfo.data.code === '1111') {
                    this.$message('添加一级组成功')
                    this.dialogFormVisible = false
                    this.initData()
                }else {
                    this.$message(groupInfo.data.message)
                }
            },
            async confirmChildGroup() {
                for(let i=0;i<this.multipleSelection.length;i++){
                    this.idArray.push(this.multipleSelection[i].uid)
                }
                const bindInfo = await bindUser(this.saleid,this.idArray.join())
                if(bindInfo.data.code === '1111'){
                    this.$message('绑定成功')
                    this.dialogFormVisibleGroup = false
                } else {
                    this.$message(bindInfo.data.message)
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
