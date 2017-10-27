<template>
	<div>
	    <head-top></head-top>
	    <div class="fruit-content">
			<el-row style="margin-top: 20px;">
	            <el-col :span="3" style="text-align:right;">开始时间：</el-col>
				<el-col :span="4">
					<el-date-picker
				      v-model="startTime"
				      type="datetime"
				      placeholder="选择日期时间">
				    </el-date-picker>
				</el-col>
				<el-col :span="3" style="text-align:right;">结束时间：</el-col>
				<el-col :span="4">
					<el-date-picker
				      v-model="endTime"
				      type="datetime"
				      placeholder="选择日期时间">
				    </el-date-picker>
				</el-col>
			</el-row>
			<el-row style="margin-top: 20px;">
				<el-col :span="24">
	                <el-button style="float: right;" @click="empty" type="primary">清空</el-button>
	                <el-button style="float: right; margin-right:10px;" @click="handleSearch" type="primary">查询</el-button>
	                <el-button style="float: left;" @click="handleAdd" type="primary">新增</el-button>
	            </el-col>
			</el-row>
	        <div class="table_container">
	            <el-table
	                :data="tableData"
	                highlight-current-row
	                style="width: 100%">
	                <el-table-column
	                  type="index"
	                  width="80"
	                  label="序号">
	                </el-table-column>
	               <el-table-column
	                  property="checkid"
	                  label="单据编号">
	                </el-table-column>
	               <el-table-column
	                  property="checkdate"
	                  label="盘点日期">
	               </el-table-column>
	               <el-table-column
	                  property="state"
	                  label="盘点状态">
	               </el-table-column>
	                <el-table-column
					label="操作">
						<template scope="scope">
						<el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
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
    import {getInventory_b, getInventoryChild_b} from '@/api/getData'
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
				form: {
					repocode: '',
					reponame: '',
					id: '',
					isDefault: '',
					repostate: '',
					isDelete: '',
				},
				startTime:'',
				endTime:'',
				get: 0,
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
                    const countData = await getInventory_b(1,10);
                    console.log(countData.data)
                    this.tableData = countData.data.data.list
                    this.count = countData.data.data.total
                    for(let i = 0;i<this.tableData.length;i++){
                    	console.log(i)
                    	console.log(this.tableData[i].lossCount)
                    	console.log(this.tableData[i].overageCount)
                        this.tableData[i].state = this.tableData[i].lossCount != 0||this.tableData[i].overageCount != 0 ? '有盈亏' : '无盈亏'
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
			async handleSearch(){
				this.get = 1
				this.count = 0
				let times1 = this.startTime === '' ? '' : this.formatter(this.startTime)
				let times2 = this.endTime === '' ? '' : this.formatter(this.endTime)
				const resData = await getInventoryChild_b(times1,times2)
				console.log(resData.data)
				if(resData.data.code === '1111'){
					this.tableData = resData.data.data.list
					this.count = resData.data.data.total
				} else {
					this.$message(resData.data.message)
					this.tableData =""
					this.count = 0
				}
			},
			async empty(){
				this.checkdate=""
			},
			handleEdit(index,row) {
				console.log(index, row)
				this.$destroy()
				this.$router.push('/InventoryDetails_b/'+ row.checkid)
			},
            handleAdd() {
				this.$destroy()
				this.$router.push('/InventoryAdded_b')
            },
			formatter(date){
				console.log(date.getMonth())
				let res = ''
				res += date.getFullYear()+ '-' + (date.getMonth() + 1) + '-' +date.getDate() +' '+date.getHours() + ':' +date.getMinutes() + ':' +date.getSeconds()
				return res
			},
			async handleCurrentChange(num){
				console.log(this.get)
				this.currentPage = num
				let times1 = this.startTime === '' ? '' : this.formatter(this.startTime)
				let times2 = this.endTime === '' ? '' : this.formatter(this.endTime)
				const dataReceipt = this.get = 0 ? await getInventory_b(this.currentPage) : await getInventoryChild_b(times1,times2, this.currentPage)
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
    .table_container{
        padding: 20px;
    }
    .el-col {
		border-radius: 4px;
		height: 36px;
		line-height: 36px;
		font-size: 14px;
	}
	.fruit-content {
		padding: 0 4%;
	}
</style>
