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
    		}
    	},
    	components: {
    		headTop,
    	},
    	created(){
    		if (this.$route.query.restaurant_id) {
    			this.restaurant_id = this.$route.query.restaurant_id;
    		}else{
    			this.restaurant_id = Math.ceil(Math.random()*10);
    			// this.$msgbox({
		        //   title: '提示',
		        //   message: '添加食品需要选择一个商铺，先去就去选择商铺吗？',
		        //   showCancelButton: true,
		        //   confirmButtonText: '确定',
		        //   cancelButtonText: '取消',
		        //   beforeClose: (action, instance, done) => {
		        //     if (action === 'confirm') {
		        //       this.$router.push('/shopList');
		        //       done();
		        //     } else {
		        //     	this.$message({
				//             type: 'info',
				//             message: '取消'
				//         });
		        //       	done();
		        //     }
		        //   }
		        // })
			}
    		this.initData();
    	},
    	computed: {},
    	methods: {
    		async initData(){
    			try{
    				// const result = await getCategory(this.restaurant_id);
	    			// if (result.status == 1) {
	    			// 	result.category_list.map((item, index) => {
	    			// 		item.value = index;
	    			// 		item.label = item.name;
	    			// 	})
	    			// 	this.categoryForm.categoryList = result.category_list;
	    			// }else{
	    			// 	console.log(result)
					// }
					const bomData = await getBomAll(1,10)
					console.log(bomData)
					if (bomData.data.code === '1111') {
						this.bomList = bomData.data.data.list
						this.total = bomData.data.data.list.length
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
			}
		    // addCategoryFun(){
		    // 	this.showAddCategory = !this.showAddCategory;
		    // },
		    // submitcategoryForm(categoryForm) {
			// 	this.$refs[categoryForm].validate(async (valid) => {
			// 		if (valid) {
			// 			const params = {
			// 				name: this.categoryForm.name,
			// 				description: this.categoryForm.description,
			// 				restaurant_id: this.restaurant_id,
			// 			}
			// 			try{
			// 				const result = await addCategory(params);
			// 				if (result.status == 1) {
			// 					this.initData();
			// 					this.categoryForm.name = '';
			// 					this.categoryForm.description = '';
			// 					this.showAddCategory = false;
			// 					this.$message({
			// 		            	type: 'success',
			// 		            	message: '添加成功'
			// 		          	});
			// 				}
			// 			}catch(err){
			// 				console.log(err)
			// 			}
			// 		} else {
			// 			this.$notify.error({
			// 				title: '错误',
			// 				message: '请检查输入是否正确',
			// 				offset: 100
			// 			});
			// 			return false;
			// 		}
			// 	});
			// },
			// uploadImg(res, file) {
			// 	if (res.status == 1) {
			// 		this.foodForm.image_path = res.image_path;
			// 	}else{
			// 		this.$message.error('上传图片失败！');
			// 	}
			// },
			// beforeImgUpload(file) {
			// 	const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
			// 	const isLt2M = file.size / 1024 / 1024 < 2;

			// 	if (!isRightType) {
			// 		this.$message.error('上传头像图片只能是 JPG 格式!');
			// 	}
			// 	if (!isLt2M) {
			// 		this.$message.error('上传头像图片大小不能超过 2MB!');
			// 	}
			// 	return isRightType && isLt2M;
			// },
			// addspecs(){
			// 	this.foodForm.specs.push({...this.specsForm});
			// 	this.specsForm.specs = '';
			// 	this.specsForm.packing_fee = 0;
			// 	this.specsForm.price = 20;
			// 	this.dialogFormVisible = false;
			// },
			// handleDelete(index){
			// 	this.foodForm.specs.splice(index, 1);
			// },
			// tableRowClassName(row, index) {
		    //     if (index === 1) {
		    //     	return 'info-row';
		    //     } else if (index === 3) {
		    //     	return 'positive-row';
		    //     }
		    //     return '';
		    // },
		    // addFood(foodForm){
		    // 	this.$refs[foodForm].validate(async (valid) => {
			// 		if (valid) {
			// 			const params = {
			// 				...this.foodForm,
			// 				category_id: this.selectValue.id,
			// 				restaurant_id: this.restaurant_id,
			// 			}
			// 			try{
			// 				const result = await addFood(params);
			// 				if (result.status == 1) {
			// 					console.log(result)
			// 					this.$message({
			// 		            	type: 'success',
			// 		            	message: '添加成功'
			// 		          	});
			// 		          	this.foodForm = {
			// 	    				name: '',
			// 	    				description: '',
			// 	    				image_path: '',
			// 	    				activity: '',
			// 	    				attributes: [],
			// 	    				specs: [{
			// 	    					specs: '默认',
			// 				          	packing_fee: 0,
			// 				          	price: 20,
			// 	    				}],
			// 	    			}
			// 				}else{
			// 					this.$message({
			// 		            	type: 'error',
			// 		            	message: result.message
			// 		          	});
			// 				}
			// 			}catch(err){
			// 				console.log(err)
			// 			}
			// 		} else {
			// 			this.$notify.error({
			// 				title: '错误',
			// 				message: '请检查输入是否正确',
			// 				offset: 100
			// 			});
			// 			return false;
			// 		}
			// 	});
		    // }
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
