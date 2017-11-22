<template>
	<div>
	    <head-top></head-top>
	    <div class="fruit-content">
			<el-row style="margin-top: 20px;">
	            <el-col :span="3" style="text-align:right;">调入仓库：</el-col>
				<el-col :span="4">
	                <el-select v-model="form.inrepocde" placeholder="请选择调入仓库">
		                <el-option v-for="classif in classification" :key="classif.id" :label="classif.repocode" :value="classif.repocode"></el-option>
		            </el-select>
				</el-col>
			</el-row>
			<el-row style="margin-top: 20px;">
				<el-col :span="24">
	                <el-button style="float: right;" @click="empty" type="primary">清空</el-button>
	                <el-button style="float: right; margin-right:10px;" @click="handleSearch" type="primary">查询</el-button>
	                <el-button style="float: left;" @click="handleAdd" type="primary">新增调拨单</el-button>
	            </el-col>
			</el-row>
	        <div class="table_container">
	            <el-table
	                :data="tableData"
	                stripe
	                highlight-current-row
	                style="width: 100%">
	               <el-table-column
	                  property="time"
	                  label="调拨日期">
	                </el-table-column>
	               <el-table-column
	                  property="allocateid"
	                  label="调拨单号">
	               </el-table-column>
	               <el-table-column
	                  property="outstate "
	                  label="出库状态">
	               </el-table-column>
	               <el-table-column
	                  property="outreponame"
	                  label="调入仓库">
	               </el-table-column>
	               <el-table-column
	                  property="switchtype"
	                  label="调拨类型">
	               </el-table-column>
	                <el-table-column
					label="操作">
						<template scope="scope">
						<el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row)">调拨单详情</el-button>
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
    import {getallocation_b, getInventoryChild_b} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
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
					isDelete: '',
				},
				startTime:'',
				endTime:'',
				get: 0,
				ordercode:'',
				classification: [],
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
                    const countData = await getallocation_b(1,10);
                    console.log(countData.data)
                    this.tableData = countData.data.data.list
                    this.count = countData.data.data.total
//                  console.log(this.tableData)
//                  for(let i = 0;i<this.tableData.length;i++){
//                  	console.log(i)
//                  	console.log(this.tableData[i].losscount)
//                  	console.log(this.tableData[i].overagecount)
//                      this.tableData[i].state = this.tableData[i].losscount === 0||this.tableData[i].overagecount === 0 ? '有盈亏' : '无盈亏'
//                      this.tableData[i].sta = this.tableData[i].checkdate === null? "未盘点" : "已盘点"
//                      console.log("i"+this.tableData[i].losscount)
//                      console.log("i"+this.tableData[i].overagecount)
//                  }
					//调入仓库
					const classi = await getWarehouse_b()
					this.classification = classi.data.data
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
				this.startTime=""
				this.endTime=""
			},
			handleEdit(index,row) {
				console.log(index, row)
				this.$destroy()
				this.$router.push('/allotmentSheetDetails_b/'+ row.allocateid)
			},
            handleAdd() {
				this.$destroy()
				this.$router.push('/allotmentSheetAdded_b')
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
				const dataReceipt = this.get === 0 ? await getInventory_b(this.currentPage) : await getInventoryChild_b(times1,times2, this.currentPage)
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
