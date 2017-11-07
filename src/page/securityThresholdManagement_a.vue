<template>
	<div>
	    <head-top></head-top>
	    <div class="fruit-content">
			<el-row style="margin-top: 20px;">
				<el-col :span="3" style="text-align:right;">A库：</el-col>
				<el-col :span="4">
					<el-select v-model="repocode" placeholder="请选择仓库">
						<el-option v-for="item in batchData" :key="item.id" :label="item.reponame" :value="item.repocode"></el-option>
					</el-select>
				</el-col>
				<el-col :span="3" style="text-align:right;">B库：</el-col>
				<el-col :span="4">
					<el-select v-model="repocode" placeholder="请选择仓库">
						<el-option v-for="item in batchData" :key="item.id" :label="item.reponame" :value="item.repocode"></el-option>
					</el-select>
				</el-col>
				<el-col :span="3" style="text-align:right;">商品名称：</el-col>
				<el-col :span="4"><el-input v-model="storgeaid" siez="mini" placeholder="请输入内容"></el-input></el-col>
			</el-row>
			<el-row style="margin-top: 20px;">
				<el-col :span="24">
	                <el-button style="float: right;" @click="empty" type="primary">清空</el-button>
	                <el-button style="float: right; margin-right:10px;" @click="handleSearch" type="primary">查询</el-button>
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
	                  label="商品编码">
	                </el-table-column>
	               <el-table-column
	                  property="checkdate"
	                  label="商品名称">
	               </el-table-column>
	               <el-table-column
	                  property="checkdate"
	                  label="所属仓库">
	               </el-table-column>
	               <el-table-column
	                  property="checkdate"
	                  label="商品分类">
	               </el-table-column>
	               <el-table-column
	                  property="checkdate"
	                  label="规格型号">
	               </el-table-column>
	               <el-table-column
	                  property="checkdate"
	                  label="单位">
	               </el-table-column>
	               <el-table-column
	                  property="checkdate"
	                  label="库存单位现存量">
	               </el-table-column>
	               <el-table-column
	                  label="库存上限提醒">
	                  <template scope="scope">
				        <li style="color: red">{{ scope.row.checkdate }}</li>
				      </template>
	               </el-table-column>
	               <el-table-column
	                  label="库存下限提醒">
	                  <template scope="scope">
				        <li style="color: red">{{ scope.row.checkdate }}</li>
				      </template>
	               </el-table-column>
	               <el-table-column
	                  label="安全阈值提醒">
	                  <template scope="scope">
				        <li style="color: red">{{ scope.row.checkdate }}</li>
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
    import {mapActions, mapState} from 'vuex'
    import {getInventory_a, getInventoryChild_a, getclassification_a} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
				count: 0,
                currentPage: 1,
				get: 0,
				batchData:[],
				repocode:'',
				storgeaid:'',
				checkdate:'',
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
    	computed: {
    		...mapState(['adminInfo']),
    	},
        methods: {
            async initData(){
                try{
                    const countData = await getInventory_a(1,10);
                    console.log(countData.data)
                    this.tableData = countData.data.data.list
                    this.count = countData.data.data.total
//                  //获取仓库
//					this.repocode = this.adminInfo.repositoryid//默认仓库
					const dataBatch = await getclassification_a()
					if(dataBatch.data.code === '1111'){
						this.batchData = dataBatch.data.data.list
					}else {
						console.log('获取商品分类出错')
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
				const resData = await getInventoryChild_a(times1,times2,this.repocode)
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
				this.repocode = ""
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
				const dataReceipt = this.get === 0 ? await getInventory_a(this.currentPage) : await getInventoryChild_a(times1,times2, this.repocode, this.currentPage)
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
