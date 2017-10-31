<template>
	<div>
	    <head-top></head-top>
	    <div class="fruit-content">
		<el-row style="margin: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px;">
			<el-col :span="24">
				<el-button @click="" >导出EXCEL</el-button>
			</el-col>
		</el-row>
        <el-dialog title="新增采购单" v-model="dialogFormVisible">
	        <el-form :model="form">
				<el-form-item label="实际数量" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form.infactcount" auto-complete="off"></el-input>
	            </el-form-item>
	        </el-form>
	        <div slot="footer" class="dialog-footer">
	            <el-button @click="dialogFormVisible = false">取 消</el-button>
	            <el-button type="primary" @click="confirmAdd">确 定</el-button>
	        </div>
        </el-dialog>
		<el-row style="margin-top: 20px;">
            <el-col :span="3" style="text-align:right;">商品名称：</el-col>
            <el-col :span="4"><el-input v-model="proname" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="3" style="text-align:right;">商品分类：</el-col>
			<el-col :span="4">
				<el-select v-model="goodstype" placeholder="请选择商品分类">
					<el-option v-for="(item,index) in batchData" :key="item.id" :label="item" :value="item"></el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24" style="margin-top: 20px;">
				<el-button style="float: right;" @click="handleSearch" type="primary">查询</el-button>
				<el-button style="float: left;" @click="Inventory" type="primary">确认盘点</el-button>
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
	                  property="pname"
	                  label="商品名称">
	                </el-table-column>
	               <el-table-column
	                  property="proid"
	                  label="商品编码">
	               </el-table-column>
	               <el-table-column
	                  property="prounite"
	                  label="单位">
	               </el-table-column>
	               <el-table-column
	                  property="accountcount"
	                  label="系统数量">
	               </el-table-column>
	               <el-table-column
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
	               </el-table-column>
	                <el-table-column
					label="操作">
						<template scope="scope">
						<el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row)">修改实际数量</el-button>
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
    import {getinventoryadd_b, getclassification_b, queryInventoryAdded_b, getinventoryPreservation_b} from '@/api/getData'
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
					infactcount: '',
				},
				procode: '',
				proname: '',
				goodstype:'',
				batchData:[],
				startTime:'',
				endTime:'',
				pname:'',
				get: 0,
				ind: '',
				Success: 0,
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
                    const countData = await getinventoryadd_b(1,10);
                    console.log(countData.data)
                    this.tableData = countData.data.data.list
                    this.count = countData.data.data.total
                    //获取分类
					const dataBatch = await getclassification_b()
					if(dataBatch.data.code === '1111'){
						this.batchData = dataBatch.data.data
					}else {
						this.$message(resData.data.message)
					}
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
			async handleSearch(){
				this.get = 1
				this.count = 0
				const resData = await queryInventoryAdded_b(this.proname, this.goodstype)
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
				this.procode=""
			},
			async Inventory(){
				console.log(this.tableData)
				console.log(this.tableData.length)
				console.log(this.tableData[0])
				for(let i = 0; i<this.tableData.length; i++){
					const resData = await getinventoryPreservation_b(this.tableData[i].accountcount,this.tableData[i].categorycode,this.tableData[i].categoryname,this.tableData[i].checkdate,this.tableData[i].checkdtailid,this.tableData[i].checkid,this.tableData[i].infactcount,this.tableData[i].losscount,this.tableData[i].overagecount,this.tableData[i].pname,this.tableData[i].proid,this.tableData[i].prostandard,this.tableData[i].prounite,this.tableData[i].repocode,this.tableData[i].reponame,this.tableData[i].username)
					if(resData.data.code === '1111'){
						console.log("this.tableData"+[i]+"成功")
						this.Success+=1
					}else {
						console.log("this.tableData"+[i]+"失败")
					}
				}
				if(this.Success = '10'){
					this.$message('盘点成功!')
					this.Success = 0
				}else {
					this.$message('盘点失败!')
				}
			},
			handleEdit(index,row) {
				this.dialogFormVisible = true
				this.form.infactcount =row.infactcount
				this.ind=index
			},
			async confirmAdd(){
				this.tableData[this.ind].infactcount=this.form.infactcount
				this.dialogFormVisible = false
			},
            handleAdd() {
				this.$destroy()
				this.$router.push('/Inventory_b')
            },
			async handleCurrentChange(num){
				console.log(this.get)
				this.currentPage = num
				const dataReceipt = this.get === 0 ? await getinventoryadd_b(this.currentPage) : await queryInventoryAdded_b(this.proname, this.goodstype, this.currentPage)
				if(dataReceipt.data.code === '1111'){
					this.tableData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
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
