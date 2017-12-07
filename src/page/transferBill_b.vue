<template>
	<div>
	    <head-top></head-top>
	    <div class="fruit-content">
			<el-row style="margin-top: 20px;">
	            <el-col :span="3" style="text-align:right;">调出仓库：</el-col>
				<el-col :span="4">
	                <el-select v-model="pname" placeholder="请选择调出仓库">
		                <el-option v-for="classif in classification" :key="classif.id" :label="classif.reponame" :value="classif.reponame"></el-option>
		            </el-select>
				</el-col>
	            <el-button style="float: right;" @click="empty" type="primary">清空</el-button>
	            <el-button style="float: right; margin-right:10px;" @click="handleSearch" type="primary">查询</el-button>
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
	               <!--<el-table-column
	                  property="outstate"
	                  label="出库状态">
	               </el-table-column>-->
	               <el-table-column
	                  property="outreponame"
	                  label="调出仓库">
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
    import {getransferBill_b, getByOutPname_b,getWarehouse_b} from '@/api/getData'
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
				pname:'',
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
                    const countData = await getransferBill_b(1,10);
                    console.log(countData.data)
                    this.tableData = countData.data.data.list
                    this.count = countData.data.data.total
//                  console.log(this.tableData)
                    for(let i = 0;i<this.tableData.length;i++){
                    	if(this.tableData[i].switchtype === 1){
                    		this.tableData[i].switchtype = "缺货调拨"
                    	}else if(this.tableData[i].switchtype === 2){
                    		this.tableData[i].switchtype = "促销调拨"
                    	}else if(this.tableData[i].switchtype === 3){
                    		this.tableData[i].switchtype = "转大宗出库"
                    	}
                    }
					//调出仓库
					const classi = await getWarehouse_b()
					this.classification = classi.data.data
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
			async handleSearch(){
				this.get = 1
				this.count = 0
				const resData = await getByOutPname_b(this.pname)
				console.log(resData.data)
				if(resData.data.code === '1111'){
					this.tableData = resData.data.data.list
					this.count = resData.data.data.total
                    for(let i = 0;i<this.tableData.length;i++){
                    	if(this.tableData[i].switchtype === 1){
                    		this.tableData[i].switchtype = "缺货调拨"
                    	}else if(this.tableData[i].switchtype === 2){
                    		this.tableData[i].switchtype = "促销调拨"
                    	}else if(this.tableData[i].switchtype === 3){
                    		this.tableData[i].switchtype = "转大宗出库"
                    	}
                    }
				} else {
					this.$message(resData.data.message)
					this.tableData = []
					this.count = 0
				}
			},
			async empty(){
				this.pname=""
			},
			handleEdit(index,row) {
				console.log(index, row)
				this.$destroy()
				this.$router.push('/transferBillDetails_b/'+ row.allocateid)
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
				const dataReceipt = this.get === 0 ? await getransferBill_b(this.currentPage) : await getByOutPname_b(this.pname, this.currentPage)
				if(dataReceipt.data.code === '1111'){
					this.tableData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
                    for(let i = 0;i<this.tableData.length;i++){
                    	if(this.tableData[i].switchtype === 1){
                    		this.tableData[i].switchtype = "缺货调拨"
                    	}else if(this.tableData[i].switchtype === 2){
                    		this.tableData[i].switchtype = "促销调拨"
                    	}else if(this.tableData[i].switchtype === 3){
                    		this.tableData[i].switchtype = "转大宗出库"
                    	}
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
