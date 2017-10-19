<template>
    <div class="fillcontain">
        <head-top></head-top>
		<el-row style="margin-top: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px;">
			<el-col :span="24">
				<el-button @click="dialogFormVisible = true" style="margin-left: 2%;" >新增用户</el-button>
			</el-col>
		</el-row>
        <el-dialog title="新增用户" v-model="dialogFormVisible" >
        <el-form :model="form">
            <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select v-model="form.roleindex" placeholder="请选择角色">
                    <el-option v-for="(role,index) in roleList" :key="role.id" :label="role.rolename" :value="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.uname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="登录名" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.account" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属仓库" :label-width="formLabelWidth">
                <el-select v-model="form.repocode" placeholder="请选择区域">
                    <el-option v-for="(repo,index) in repoList" :key="repo.id" :label="repo.reponame" :value="repo.repocode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input type="password" style="width: 195px" v-model="form.upassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth">
                <el-input type="password" style="width: 195px" v-model="form.repassword" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </div>
        </el-dialog>
        <div class="table_container">
            <el-table @row-click="handleChoose"
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column @click="handleChoose"
                  property="uid"
                  label="编号">
                </el-table-column>
                <el-table-column @click="handleChoose"
                  property="uname"
                  label="姓名">
                </el-table-column>
                <el-table-column @click="handleChoose"
                  property="account"
                  label="账号">
                </el-table-column>
                <el-table-column @click="handleChoose"
                  property="urole"
                  label="职位">
                </el-table-column>
                <el-table-column
                label="操作">
                <template scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button
                    size="mini"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    import headTop from '../components/headTop'
    import {queryUserList, getRoleAll, addUserInfo, getRepoAll} from '@/api/getData'
    import md5 from 'md5'
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
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form:{
                    roleindex:'',
                    account: '',
                    uname: '',
                    upassword: '',
                    repocode: ''
                },
                roleList: [],
                repoList: [],
                currentPage: 1
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
                    const countData = await queryUserList(this.currentPage);
                    console.log(countData.data)
                    this.tableData = countData.data.data.list
                    this.count = countData.data.data.total
                }catch(err){
                    console.log('获取数据失败', err);
                }
                const roleList = await getRoleAll()
                if(roleList.data.code === '1111') {
                    this.roleList = roleList.data.data
                } else {
                    this.$message(roleList.data.message)
                }
                const repoList = await getRepoAll()
                if(repoList.data.code === '1111') {
                    this.repoList = repoList.data.data
                } else {
                    this.$message(repoList.data.message)
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
            handleAdd() {

            },
            handleEdit(index, row) {
                this.$destroy()
				this.$router.push('/personDetails/' + row.uid)
            },
            handleDelete() {

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            async handleCurrentChange(val) {
                this.currentPage = val;
                const countData = await queryUserList(this.currentPage);
                console.log(countData.data)
                this.tableData = countData.data.data.list
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
            async addUser() {
                this.dialogFormVisible = true
            },
            async confirmAdd() {
                console.log(this.form)
                const userAdd = await addUserInfo(this.roleList[this.form.roleindex].roleid, this.roleList[this.form.roleindex].rolename, this.form.account, this.form.repocode, this.form.uname, md5(this.form.upassword))
                if(userAdd.data.code === '1111') {
                    this.$message('添加用户成功!')
                    this.dialogFormVisible = false
                    this.initData()
                } else {
                    this.$message(userAdd.data.message)
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
