<template>
	<div>
	    <head-top></head-top>
	    <div class="fruit-content">
        <el-dialog title="报损" v-model="dialogFormVisible">
	        <el-form :model="form">
	            <el-form-item label="商品编码" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form.procode" auto-complete="off" :disabled="true"></el-input>
	            </el-form-item>
	            <el-form-item label="商品名称" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form.proname" auto-complete="off" :disabled="true"></el-input>
	            </el-form-item>
	            <el-form-item label="报损数量" :label-width="formLabelWidth">
	                <el-input style="width: 195px" v-model="form.wastecount" auto-complete="off">
	                	<template slot="append">{{this.prou}}</template>
	                </el-input>
	            </el-form-item>
	        </el-form>
	        <div slot="footer" class="dialog-footer">
	            <el-button @click="dialogFormVisible = false">取 消</el-button>
	            <el-button type="primary" @click="confirmAdd">确 定</el-button>
	        </div>
		</el-dialog>
			<el-row style="margin-top: 20px;">
				<el-col :span="24">
	                <el-button style="float: left;" @click="confirmationSlip" type="primary">确认调拨单</el-button>
	                <el-button style="float: right;" @click="Return" type="primary">返回</el-button>
	            </el-col>
			</el-row>
	        <div class="table_container">
	            <el-table
	                :data="tableData"
	                stripe
	                highlight-current-row
	                style="width: 100%">
	               <el-table-column
	                  property="proid"
	                  label="商品编码">
	               </el-table-column>
	               <el-table-column
	                  property="pname"
	                  label="商品名称">
	                </el-table-column>
	               <el-table-column
	                  property="allocatecount"
	                  label="数量">
	               </el-table-column>
	               <el-table-column
	                  property="wastecount"
	                  label="报损数量">
	               </el-table-column>
	               <el-table-column
	                  property="ponunite"
	                  label="单位">
	               </el-table-column>
	               <el-table-column
	                  property="prostandard"
	                  label="规格型号">
	               </el-table-column>
	               <el-table-column
	                  property="switchtype"
	                  label="调拨类型">
	               </el-table-column>
	               <el-table-column
	                  property="inreponame"
	                  label="调出仓库">
	               </el-table-column>
	                <el-table-column v-if="toggle"
					label="操作">
						<template scope="scope">
						<el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row)">报损</el-button>
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
    import {getallotmentSheetDetails_b,addloss_b,getconfirmationSlip_b} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                count: 0,
                currentPage: 1,
                id: this.$route.params.id,
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
				ind: '',
				prou: '',
				lists: '',
				toggle: true,
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
                    const countData = await getallotmentSheetDetails_b(this.id);
                    console.log(countData.data)
                    this.tableData = countData.data.data.list
                    this.count = countData.data.data.total
                    this.toggle = this.tableData[0].isReportWaste === 1? false : true
                    console.log(this.toggle)
                    for(let i = 0;i<this.tableData.length;i++){
                    	if(this.tableData[i].switchtype === 1){
                    		this.tableData[i].switchtype = "缺货调拨"
                    	}else if(this.tableData[i].switchtype === 2){
                    		this.tableData[i].switchtype = "促销调拨"
                    	}else if(this.tableData[i].switchtype === 3){
                    		this.tableData[i].switchtype = "转大宗出库"
                    	}
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
			handleEdit(index,row) {
				this.dialogFormVisible = true
				this.ind = index
				this.prou = row.ponunite
				this.form.procode = row.proid
				this.form.proname = row.pname
			},
			async confirmAdd(){
				const addInfo = await addloss_b(this.tableData[this.ind].allocatedetailid,this.form.wastecount)
				if(addInfo.data.code === '1111'){
					this.$message('添加损耗成功')
					this.form.wastecount = ""
					this.dialogFormVisible = false
					this.initData()
				}else {
					this.$message(addInfo.data.message)
				}
			},
            async Return() {
				this.$destroy()
				this.$router.push('/transferBill_b')
            },
			async confirmationSlip(){//post
				for(let i=0;i<this.tableData.length;i++){
					this.lists += this.tableData[i].allocatedetailid+","
				}
				console.log(this.tableData1)
				const resData = await getconfirmationSlip_b(this.lists)
				if(resData.data.code === '1111'){
					this.$message(resData.data.message)
					this.initData()
				} else {
					this.$message(resData.data.message)
				}
			},
			async handleCurrentChange(num){
				console.log(this.get)
				this.currentPage = num
				const dataReceipt = await getallotmentSheetDetails_b(this.id,this.currentPage)
				if(dataReceipt.data.code === '1111'){
					this.tableData = dataReceipt.data.data.list
					this.count = dataReceipt.data.data.total
                    this.toggle = this.tableData[0].isReportWaste === 1? false : true
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
