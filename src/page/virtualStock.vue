<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
		<el-row style="margin-top: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px;">
			<el-col :span="24">
				<el-button @click="handleAdd" >新增虚拟库</el-button>
			</el-col>
		</el-row>
            <el-table @row-click="handleChoose"
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column @click="handleChoose"
                  property="repocode"
                  label="仓库编码">
                </el-table-column>
                <el-table-column @click="handleChoose"
                  property="protype"
                  label="货品类别">
                </el-table-column>
                <el-table-column @click="handleChoose"
                  property="reponame"
                  label="仓库名称">
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
    import {getCategoryAll, getCategoryChild, deleteCategory, getVirtualRepoAll, insertVirtualRepo} from '@/api/getData'
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
            async handleChoose(row) {
                console.log('row------', row)
                const classData = await getCategoryChild(row.categorycode)
                if(classData.data.code === '1111'){
                    this.childData = classData.data.data.list
                }else {
                    this.childData = []
                }
                this.currentClass = row.categoryname
            },
            handleAdd() {
                this.dialogFormVisible = true
            },
            handleEdit() {

            },
            async confirmAdd(reponame, protype) {
                var _this = this
                const res = insertVirtualRepo(reponame, protype)
                if(res.data.code === '0000'){
                    this.form.error = '添加订单失败，请重试'
                }
                else if(res.data.code === '1111') {
                    this.form.error = '添加订单成功'
                }else {
                    this.form.error = '添加订单失败，请重试'
                }
                setTimeout(() => {
                    _this.dialogFormVisible = false
                }, 1000)
            },
            handleDelete() {

            },
            handleAddChild() {

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
			async handleCurrentChange(num){
				this.currentPage = num
				const countData = await getVirtualRepoAll(this.currentPage)
				this.countData = countData.data.data.list
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
