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
	                <el-button style="float: left;" @click="noInventory">未盘点</el-button>
	                <el-button style="float: left;" @click="stayInventory">待确认盘点</el-button>
	            </el-col>
			</el-row>
	        <div class="table_container">
	            <el-table
	                :data="tableData"
	                stripe
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
	                  property="result1"
	                  label="盘点状态">
	               </el-table-column>
	               <el-table-column
	                  property="result2"
	                  label="盘点结果">
	               </el-table-column>
	                <el-table-column
					label="操作">
						<template scope="scope">
						<el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
						<el-button
						size="mini"
						@click="CheckInventory(scope.$index, scope.row)" type="primary" v-if="toggle">确认盘点</el-button>
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
    import {getInventory_b, getInventoryChild_b, queryTInspectByParam_b, getsqueryStateAndInseptAndOne_b, getchangeStateAndInseptTwo_b} from '@/api/getData'
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
				state:'未盘点',
				toggle: false,
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
                    this.tableData = countData.data.data.list
                    this.count = countData.data.data.total
                    for(let i = 0;i<this.tableData.length;i++){
                        this.tableData[i].sta = this.tableData[i].isCreate === 0? "未盘点" : "已盘点"
                    }
					this.toggle = false
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
			async handleSearch(){
				this.get = 1
				this.count = 0
				this.toggle = false
				let times1 = this.startTime === '' ? '' : this.formatter(this.startTime)
				let times2 = this.endTime === '' ? '' : this.formatter(this.endTime)
				const resData = await getInventoryChild_b(times1,times2)
				if(resData.data.code === '1111'){
					this.tableData = resData.data.data.list
					this.count = resData.data.data.total
                    for(let i = 0;i<this.tableData.length;i++){
                        this.tableData[i].sta = this.tableData[i].isCreate === 0? "未盘点" : "已盘点"
                    }
				} else {
					this.$message(resData.data.message)
					this.tableData = []
					this.count = 0
				}
			},
            async noInventory(){
				this.get = 2
				this.count = 0
				this.toggle = false
            	const resData = await queryTInspectByParam_b(this.state)
				if(resData.data.code === '1111'){
					this.tableData = resData.data.data.list
					this.count = resData.data.data.total
                    for(let i = 0;i<this.tableData.length;i++){
                        this.tableData[i].sta = this.tableData[i].isCreate === 0? "未盘点" : "已盘点"
                    }
				} else {
					this.$message(resData.data.message)
					this.tableData = []
					this.count = 0
				}
            },
            async stayInventory(){
				this.get = 3
				this.count = 0
            	const resData = await getsqueryStateAndInseptAndOne_b()
				if(resData.data.code === '1111'){
					this.tableData = resData.data.data.list
					this.count = resData.data.data.total
					this.toggle = true
				} else {
					this.$message(resData.data.message)
					this.tableData = []
					this.count = 0
				}
            },
			async empty(){
				this.startTime=""
				this.endTime=""
			},
			handleEdit(index,row) {
				console.log(index, row)
				this.$destroy()
				this.$router.push('/InventoryDetails_b/'+ row.checkid)
			},
			async CheckInventory(index,row){
				const resData = await getchangeStateAndInseptTwo_b(row.checkid)
                if(resData.data.code === '1111'){
					this.$message(resData.data.message)
					this.initData()
				} else {
					this.$message(resData.data.message)
				}
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
				let dataReceipt = {}
				if(this.get === 0){
					dataReceipt = await getInventory_b(this.currentPage)
				}else if(this.get === 1){
					dataReceipt = await getInventoryChild_b(times1,times2, this.currentPage)
				}else if(this.get === 2){
					dataReceipt = await queryTInspectByParam_b(this.state,this.currentPage)
				}else if(this.get === 3){
					dataReceipt = await getsqueryStateAndInseptAndOne_b(this.currentPage)
				}
				if(dataReceipt.data.code === '1111'){
					this.tableData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
                    for(let i = 0;i<this.tableData.length;i++){
                        this.tableData[i].sta = this.tableData[i].isCreate === 0? "未盘点" : "已盘点"
                    }
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
