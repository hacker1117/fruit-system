<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
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
                <el-table-column
                label="操作">
                <template scope="scope">
                    <el-button
                    size="mini"
                    @click="handleAdd(scope.$index, scope.row)">增加</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getCategoryAll, getCategoryChild, deleteCategory, getVirtualRepoAll} from '@/api/getData'
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
                currentClass: ''
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
                    const countData = await getVirtualRepoAll(1,10);
                    this.tableData = countData.data.data.list
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
            },
            handleAdd() {

            },
            handleEdit() {

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
