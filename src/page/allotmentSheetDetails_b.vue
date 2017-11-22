<template>
	<div>
	    <head-top></head-top>
	    <div class="fruit-content">
			<el-row style="margin-top: 20px;">
				<el-col :span="24">
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
	                  property="ponunite"
	                  label="单位">
	               </el-table-column>
	               <el-table-column
	                  property="prostandard "
	                  label="规格型号">
	               </el-table-column>
	               <el-table-column
	                  property="switchtype "
	                  label="调拨类型">
	               </el-table-column>
	               <el-table-column
	                  property="inreponame "
	                  label="调入仓库">
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
    import {getallotmentSheetDetails_b} from '@/api/getData'
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
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            async Return() {
				this.$destroy()
				this.$router.push('/allotmentSheet_b')
            },
			async handleCurrentChange(num){
				console.log(this.get)
				this.currentPage = num
				const dataReceipt = await getallotmentSheetDetails_b(this.id,this.currentPage)
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
