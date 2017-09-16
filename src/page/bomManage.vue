<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px;">
			<el-col :span="24">
				<el-button @click="handleAdd" >增加</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="3" style="text-aligh:right;">产品编号：</el-col>
			<el-col :span="5"><el-input v-model="proid" placeholder="请输入内容"></el-input></el-col>
			<el-col :span="3" style="text-aligh:right;">产品名称：</el-col>
			<el-col :span="5"><el-input v-model="procon" placeholder="请输入内容"></el-input></el-col>
			<el-col :span="3" style="text-aligh:right;">计量单位：</el-col>
			<el-col :span="5"><el-input v-model="prounit" placeholder="请输入内容"></el-input></el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-button style="float: right;" type="primary">清空</el-button>
				<el-button style="float: right; margin-right:10px;" type="primary">查询</el-button>
			</el-col>
		</el-row>
		<el-table
			:data="bomList"
			stripe
			style="width: 100%">
			<el-table-column
			prop="level"
			label="级别">
			</el-table-column>
			<el-table-column
			prop="procode"
			label="产品编号">
			</el-table-column>
			<el-table-column
			prop="proname"
			label="产品名称">
			</el-table-column>
			<el-table-column
			prop="prostandard"
			label="规格型号">
			</el-table-column>
			<el-table-column
			prop="count"
			label="数量">
			</el-table-column>
			<el-table-column
			prop="prounite"
			label="计量单位">
			</el-table-column>
			<el-table-column
			prop="remarkable"
			label="备注">
			</el-table-column>
			<el-table-column
			prop="procedurecount"
			label="工序数">
			</el-table-column>
			<el-table-column
			prop="procedurecontent"
			label="工作内容">
			</el-table-column>
			<el-table-column
			label="操作">
			<template scope="scope">
				<el-button
				size="mini"
				@click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
				<el-button
				size="mini"
				@click="confirmDelete(scope.$index, scope.row)">删除</el-button>
			</template>
			</el-table-column>
		</el-table>
		<el-row style="float:right;">
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-size="10"
				layout="total, prev, pager, next"
				:total="total">
			</el-pagination>
		</el-row>
		</div>
    </div>
</template>

<script>
 	import headTop from '@/components/headTop'
    import {getCategory, addCategory, addFood, getBomAll, deleteBom} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
    			baseUrl,
    			baseImgPath,
				bomList: [],
				proid: '',
				procon: '',
				prounit: '',
				total: 0,
				currentPage: 1
    		}
    	},
    	components: {
    		headTop,
    	},
    	created(){
    		this.initData();
    	},
    	computed: {},
    	methods: {
    		async initData(){
    			try{
					const bomData = await getBomAll(1,10)
					console.log(bomData)
					if (bomData.data.code === '1111') {
						this.bomList = bomData.data.data.list
						this.total = bomData.data.data.total
					}
    			}catch(err){
    				console.log(err)
    			}
			},
			handleAdd() {
				this.$destroy()
				this.$router.push('/addBom')
			},
			handleEdit(index,row) {
				console.log(index, row)
				this.$destroy()
				this.$router.push('/addBom/'+ row.procode)
			},
			confirmDelete(index,row) {
				this.$confirm('此操作将删除该Bom, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.handleDelete(index,row)
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})       
				})
			},
			async handleDelete(index,row) {
				const isDeleted = await deleteBom(row.procode)
				if(isDeleted.data.code === '1111') {
					this.bomList.splice(index, 1)
					this.total -= 1
				}
			},
			async handleCurrentChange(num){
				this.currentPage = num 
					const bomData = await getBomAll(this.currentPage)
					if (bomData.data.code === '1111') {
						this.bomList = bomData.data.data.list
					}
			}
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.form{
		min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
	}
	.food_form{
		border: 1px solid #eaeefb;
		padding: 10px 10px 0;
	}
	.form_header{
		text-align: center;
		margin-bottom: 10px;
	}
	.category_select{
		border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
	}
	.add_category_row{
		height: 0;
		overflow: hidden;
		transition: all 400ms;
		background: #f9fafc;
	}
	.showEdit{
		height: 185px;
	}
	.add_category{
		background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
		border-top: none;
	}
	.add_category_button{
		text-align: center;
		line-height: 40px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #eaeefb;
		border-top: none;
		transition: all 400ms;
		&:hover{
			background: #f9fafc;
			span, .edit_icon{
				color: #20a0ff;
			}
		}
		span{
			.sc(14px, #999);
			transition: all 400ms;	
		}
		.edit_icon{
			color: #ccc;
			transition: all 400ms;
		}
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.cell{
		text-align: center;
	}
		.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
	.el-row {
		margin-bottom: 20px;
		&:last-child {
		margin-bottom: 0;
		}
	}
	.el-col {
		border-radius: 4px;
		height: 36px;
		line-height: 36px;
		font-size: 14px;
		padding-right:2%;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.bg-purple-light {
		background: #e5e9f2;
	}
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
	.el-input__inner {
		height: 32px !important;
	}
	.fruit-content {
		padding: 0 4%;
	}
</style>
