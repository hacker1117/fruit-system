<template>
	<div>
	    <head-top></head-top>
	    <div class="fruit-content">
	        <el-dialog title="修改实际数量" v-model="dialogFormVisible">
		        <el-form :model="form">
					<el-form-item label="商品名称" :label-width="formLabelWidth">
		                <el-input style="width: 195px" v-model="form.pname" auto-complete="off" :disabled="true"></el-input>
		            </el-form-item>
					<el-form-item label="商品编码" :label-width="formLabelWidth">
		                <el-input style="width: 195px" v-model="form.proid" auto-complete="off" :disabled="true"></el-input>
		            </el-form-item>
					<el-form-item label="账面数量" :label-width="formLabelWidth">
		                <el-input style="width: 195px" v-model="form.accountcount" auto-complete="off" :disabled="true"></el-input>
		            </el-form-item>
					<el-form-item label="实际数量" :label-width="formLabelWidth">
		                <el-input style="width: 195px" v-model="form.infactcount" auto-complete="off"></el-input>
		            </el-form-item>
		        </el-form>
		        <div slot="footer" class="dialog-footer">
		            <el-button @click="dialogFormVisible = false">取 消</el-button>
		            <el-button type="primary" @click="confirmAdd">确 定</el-button>
		        </div>
	        </el-dialog>
			<el-row style="margin: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px;">
				<el-col :span="24">
					<el-button @click="exportEXCEL" >导出EXCEL</el-button>
				</el-col>
			</el-row>
	    	<el-row style="margin-top: 20px;">
				<el-col :span="24">
					<el-button style="float: right;" @click="handleAdd" type="primary">返回</el-button>
					<el-button style="float: left;" @click="CheckInventory" type="primary" :disabled="toggle1">确认盘点</el-button>
					<el-button style="float: left;" @click="confirmationInventory" type="primary"  :disabled="toggle1">待确认盘点</el-button>
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
	                  property="pname"
	                  label="商品名称">
	                </el-table-column>
	               <el-table-column
	                  property="proid"
	                  label="商品编码">
	               </el-table-column>
	               <el-table-column
	                  property="accountcount"
	                  label="账面数量">
	               </el-table-column>
	               <el-table-column
	                  property="infactcount"
	                  label="实际数量">
	               </el-table-column>
	               <el-table-column
	                  property="prounite"
	                  label="单位">
	               </el-table-column>
	               <el-table-column
	                  property="prostandard"
	                  label="规格">
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
	                v-if="toggle"
					label="操作">
						<template scope="scope">
						<el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row)">修改实际数量</el-button>
						</template>
					</el-table-column>
	            </el-table>
	            <div class="Pagination" style="text-align: left;margin-top: 10px;">共 {{this.count}} 条</div>
	        </div>
	    </div>
	</div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getInventoryDetails_b,getconfirmationInventory_b,getupdateTInspect_b,getExcleByTInspect, getchangeStateAndInseptTwo_b} from '@/api/getData'
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
                id: this.$route.params.id,
                currentClass: '',
				dialogFormVisible: false,
				formLabelWidth: '120px',
				form: {
					pname: '',
					proid: '',
					prounite: '',
					accountCount: '',
					infactCount: '',
					lossCount: '',
					overageCount: '',
				},
				rets: 0,
				ind: '',
				toggle: true,
				toggle1: false,
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
                    const countData = await getInventoryDetails_b(this.id);
                    console.log("id"+this.id)
                    console.log(countData.data)
                    this.tableData = countData.data.data
                    this.count = countData.data.data.length
                    this.toggle = this.tableData[0].isCreate === 1 ? false : true
                    this.toggle1 = this.tableData[0].isCreate === 1 ? true : false
                    for(let i = 0;i<this.tableData.length;i++){
                        this.tableData[i].isDefault = this.tableData[i].isDefault === 0 ? '否' : '是'
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
			handleEdit(index,row) {
				this.dialogFormVisible = true
//				this.form.infactcount =row.infactcount
				this.form =row
				this.ind=index
			},
			async CheckInventory(){
				const resData = await getchangeStateAndInseptTwo_b(this.id)
                if(resData.data.code === '1111'){
					this.$message(resData.data.message)
					this.initData()
				} else {
					this.$message(resData.data.message)
				}
			},
			async confirmationInventory(){
				for(let i = 0;i<this.tableData.length;i++){
					console.log(this.tableData[i].checkdtailid)
					console.log(this.tableData[i].infactcount)
                    const resData = await getconfirmationInventory_b(this.tableData[i].checkdtailid,this.tableData[i].infactcount)
                    if(resData.data.code === '1111'){
						this.rets = this.rets+1
					} else {
						this.$message(resData.data.message)
					}
                }
				if(this.rets === this.tableData.length){
					this.$message("确认盘点成功")
					this.initData()
				}else{
					this.$message("确认盘点失败")
				}
			},
			async confirmAdd(){
				this.tableData[this.ind].infactcount=this.form.infactcount
				this.dialogFormVisible = false
			},
			async exportEXCEL(){
				const resData = await getExcleByTInspect(this.id)
				window.open("http://47.95.12.49:8084/echuxianshengshop1/tinspect/ExcleByTInspect?checkid="+this.id)
			},
            handleAdd() {
				this.$destroy()
				this.$router.push('/Inventory_b')
            },
			async handleCurrentChange(num){
				console.log(this.get)
				this.currentPage = num
				const dataReceipt = await getInventoryDetails_b(this.id,this.currentPage)
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
