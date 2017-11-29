<template>
	<div>
	    <head-top></head-top>
	    <div class="fruit-content">
        <el-dialog title="添加" v-model="dialogFormVisible1">
	        <el-row>
	            <el-col :span="4" style="text-align:right;">商品名称：</el-col>
	            <el-col :span="7"><el-input v-model="proname" siez="mini" placeholder="请输入内容"></el-input></el-col>
	            <el-col :span="4" style="text-align:right;">商品分类：</el-col>
				<el-col :span="7">
					<el-select v-model="goodstype" placeholder="请选择商品分类">
						<el-option v-for="(item,index) in batchData" :key="item.id" :label="item" :value="item"></el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24" style="margin-top: 20px;">
					<el-button style="float: right;margin-left: 20px;" @click="empty" type="primary">清空</el-button>
					<el-button style="float: right;" @click="handleSearch" type="primary">查询</el-button>
				</el-col>
			</el-row>
			<el-table
		            ref="multipleTable"
					:data="tableData"
					stripe
		            @selection-change="handleSelectionChange"
					style="margin-top:20px;text-align:left;">
		            <el-table-column
		            type="selection"
		            width="55">
		            </el-table-column>
		            <el-table-column
	                  type="index"
	                  width="80"
	                  label="序号">
	                </el-table-column>
	               <el-table-column
	                  property="proname"
	                  label="商品名称">
	                </el-table-column>
	               <el-table-column
	                  property="repocode"
	                  label="商品编码">
	               </el-table-column>
	               <el-table-column
	                  property="positioncode"
	                  label="单位">
	               </el-table-column>
				</el-table>
	            <div class="Pagination" style="text-align: left;margin-top: 10px;">
	                <el-pagination
	                  @current-change="handleCurrentChange"
	                  :current-page="currentPage"
	                  :page-size="10"
	                  layout="total, prev, pager, next"
	                  :total="count1">
	                </el-pagination>
	            </div>
	        <div slot="footer" class="dialog-footer">
	            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
	            <el-button type="primary" @click="handle">确 定</el-button>
	        </div>
       </el-dialog>
		<el-row>
			<el-col :span="24" style="margin-top: 20px;">
				<el-button style="float: right;" @click="Inventory" type="primary">待盘点</el-button>
				<el-button style="float: left;" @click="dialogFormVisible1 = true" type="primary">添加</el-button>
			</el-col>
		</el-row>
	        <div class="table_container">
	        	<el-table
	                :data="tableData1"
	                stripe
	                highlight-current-row
	                style="width: 100%">
	                <el-table-column
	                  type="index"
	                  width="80"
	                  label="序号">
	                </el-table-column>
	               <el-table-column
	                  property="proname"
	                  label="商品名称">
	                </el-table-column>
	               <el-table-column
	                  property="repocode"
	                  label="商品编码">
	               </el-table-column>
	               <el-table-column
	                  property="currentexist"
	                  label="系统数量">
	               </el-table-column>
	               <el-table-column
	                  property="positioncode"
	                  label="单位">
	               </el-table-column>
	               <el-table-column
	                  property="prostandard"
	                  label="规格">
	               </el-table-column>
	               <!--<el-table-column
	                  property="infactcount"
	                  label="实际数量">
	               </el-table-column>
	               <el-table-column
	                  property="losscount"
	                  label="盘亏数量">
	               </el-table-column>
	               <el-table-column
	                  property="overagecount"
	                  label="盘盈数量">
	               </el-table-column>-->
	            </el-table>
	            <div class="Pagination" style="text-align: left;margin-top: 10px;"> 共 {{this.count}} 条</div>
	        </div>
	    </div>
	</div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getinventoryadd_a, getclassification_a, queryInventoryAdded_a, getinventoryPreservation_a} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                tableData1: [],
                currentRow: null,
                offset: 0,
                limit: 5,
                count: 0,
                count1: 0,
                currentPage: 1,
                childData:[],
                currentClass: '',
				dialogFormVisible: false,
				dialogFormVisible1: false,
				formLabelWidth: '120px',
				form: {
					infactcount: '',
				},
				procode: '',
				proname: '',
				goodstype:'',
				batchData:[],
				startTime:'',
				endTime:'',
				pname:'',
				ind: '',
                multipleSelection: [],
                repocode: '',
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
                    const countData = await getinventoryadd_a();
                    console.log(countData.data)
                    this.tableData = countData.data.data.list
                    this.count1 = countData.data.data.total
                    //获取分类
					const dataBatch = await getclassification_a()
					if(dataBatch.data.code === '1111'){
						this.batchData = dataBatch.data.data
					}else {
						this.$message(resData.data.message)
					}
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
                console.log(val)
            },
            async handle() {
				this.tableData1 = this.multipleSelection.concat(this.tableData1);
                 console.log(this.tableData1)
                this.dialogFormVisible1 = false
                this.count =this.tableData1.length
            },
			async handleSearch(){
				this.get = 1
				this.count = 0
				const resData = await queryInventoryAdded_a(this.proname, this.goodstype)
				console.log(resData.data)
				if(resData.data.code === '1111'){
					this.tableData = resData.data.data.list
					this.count1 = resData.data.data.total
				} else {
					this.$message(resData.data.message)
					this.tableData = []
					this.count1 = 0
				}
			},
			async empty(){
				this.proname=""
				this.goodstype=""
			},
			async Inventory(){
				console.log(this.tableData1)
				for(let i = 0; i<this.tableData1.length; i++){
					this.repocode += this.tableData1[i].repocode+","
				}
				const resData = await getinventoryPreservation_a(this.repocode)
				if(resData.data.code === '1111'){
					this.$message(resData.data.message)
					this.tableData1 = []
					this.count = 0
					this.initData()
				}else {
					this.$message(resData.data.message)
				}
			},
			async handleCurrentChange(num){
				console.log(this.get)
				this.currentPage = num
				const dataReceipt = this.get === 0 ? await getinventoryadd_a(this.currentPage) : await queryInventoryAdded_b(this.proname, this.goodstype, this.currentPage)
				if(dataReceipt.data.code === '1111'){
					this.tableData = dataReceipt.data.data.list
					this.count1 = dataReceipt.data.data.total
				}else {
					this.tableData = []
					this.count1 = 0
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
