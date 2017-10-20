<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px;">
			<el-col :span="24">
				<el-button @click="addBomChild" >新增料件</el-button>
			</el-col>
		</el-row>
        <el-dialog title="新增料件" v-model="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="料件名称" :label-width="formLabelWidth">
				<el-autocomplete
				v-model="form.goodsName"
				:fetch-suggestions="querySearchAsync"
				placeholder="请输入名称模糊搜索"
				@select="handleAddChild"
				></el-autocomplete>
            </el-form-item>
            <el-form-item label="规格" :label-width="formLabelWidth">
            <el-input style="width: 195px" v-model="form.prostandard" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="单位" :label-width="formLabelWidth">
            <el-select v-model="form.prounite" placeholder="请选择计量单位">
                <el-option label="个" value="个"></el-option>
                <el-option label="克" value="克"></el-option>
                <el-option label="份" value="份"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="数量" :label-width="formLabelWidth">
            <el-input style="width: 195px" v-model="form.count" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmBomChild">确 定</el-button>
        </div>
        </el-dialog>
            <el-dialog title="编辑料件" v-model="dialogFormVisible1">
                <el-form :model="form">
                    <el-form-item label="规格" :label-width="formLabelWidth">
                        <el-input style="width: 195px" v-model="form2.prostandard" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="单位" :label-width="formLabelWidth">
                        <el-select v-model="form2.prounite" placeholder="请选择计量单位">
                            <el-option label="个" value="个"></el-option>
                            <el-option label="克" value="克"></el-option>
                            <el-option label="份" value="份"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数量" :label-width="formLabelWidth">
                        <el-input style="width: 195px" v-model="form2.count" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmEditChild(form2.index)">确 定</el-button>
                </div>
            </el-dialog>
		<el-row>
			<el-col :span="3" style="text-align:right;">产品规格：</el-col>
			<el-col :span="5"><el-input v-model="prostandard" placeholder="请输入内容" :disabled="isDisabled"></el-input></el-col>
			<el-col :span="3" style="text-align:right;">产品名称：</el-col>
			<el-col :span="5"><el-input v-model="proname" placeholder="请输入内容" :disabled="isDisabled"></el-input></el-col>
			<el-col :span="3" style="text-align:right;">单位：</el-col>
			<el-col :span="5" trigger="click">
                <el-dropdown @command="chooseDrop">
                    <el-button>
                        {{prounite}}<i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="index" :disabled="isDisabled" v-for="(dItem,index) in dropDownList" :key="dItem.id">{{dItem}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
		</el-row>
		<el-table
			:data="bomChildList"
			stripe
			style="width: 100%">
			<el-table-column
			prop="procode"
			label="料件ID">
			</el-table-column>
			<el-table-column
			prop="proname"
			label="料件名称">
			</el-table-column>
			<el-table-column
			prop="level"
			label="级别">
			</el-table-column>
			<el-table-column
			prop="proid"
			label="商品ID">
			</el-table-column>
			<el-table-column
			prop="proname"
			label="商品名称">
			</el-table-column>
			<!-- <el-table-column
			prop="pid"
			label="商品分类">
			</el-table-column> -->
			<el-table-column
			prop="prostandard"
			label="规格">
			</el-table-column>
			<el-table-column
			prop="prounite"
			label="单位">
			</el-table-column>
			<el-table-column
			prop="count"
			label="数量">
			</el-table-column>
            <el-table-column
                label="操作">
                <template scope="scope">
                    <el-button
                        size="mini"
                        @click="confirmDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button
                        size="mini"
                        @click="confirmEdit(scope.$index, scope.row)">修改</el-button>
                </template>
            </el-table-column>
		</el-table>
		<el-row style="margin-top:20px; float:right">
			<el-col :span="24" >
				<el-button @click="handleBack" type="primary">返回</el-button>
			</el-col>
		</el-row>
		</div>
    </div>
</template>

<script>
 	import headTop from '@/components/headTop'
    import {getBomDetail, getProList, getBomGroup, insertParentBom, insertChildBom, deleteBom, updateChildBom} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
    			baseUrl,
    			baseImgPath,
				bomChildList: [],
				prostandard: '',
				proname: '',
				prounite: '请选择单位',
                dropDownList: ['个', '克'],
                dialogFormVisible: false,
                dialogFormVisible1: false,
                form: {
					procode: '',
                    proname: '',
					prounite: '',
					prostandard: '',
					proid: '',
					count: '',
					level: '',
					goodsName: '',
                },
                form2: {
                    procode: '',
                    proname: '',
                    prounite: '',
                    prostandard: '',
                    proid: '',
                    count: '',
                    level: ''
                },
				formLabelWidth: '120px',
				pid: '',
				childList:[],
				isDisabled: false,
				goodsList:[],
				confirmIndex: 0
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
    	computed: {},
    	methods: {
    		async initData(){
				console.log('id:',this.$route.params.pid)
    			try{
					if(this.$route.params.pid){
						this.pid = this.$route.params.pid
						const bomDetail = await getBomDetail(this.pid)
						// if(bomDetail.data.code === '1111'){
							this.prostandard = bomDetail.data.data.prostandard
							this.proname = bomDetail.data.data.proname
							this.prounite = bomDetail.data.data.prounite
							this.isDisabled = true
						// }
						const bomList = await getBomGroup(this.pid)
						if (bomList.data.code === '1111') {
							this.bomChildList = bomList.data.data
						}
					}
    			}catch(err){
    				console.log(err)
    			}
			},
			handleEdit(index,row) {
				console.log(index, row)
            },
            chooseDrop(index) {
                console.log(index)
				this.prounite = this.dropDownList[index]
            },
            handleBack() {
				this.$destroy()
				this.$router.push('/bomManage')
			},
			addBomChild() {
				if(this.proname === '' || this.prostandard === '' || this.prounite === '请选择单位' ){
					this.$message({
						showClose: true,
						message: '请先输入Bom基本信息',
						type: 'warning'
					})
					return false
				}
				if(this.pid === ''){
					this.$confirm('录入的BOM信息将会被提交, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.insertBom()
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						})
						return false
					})
				} else {
					this.dialogFormVisible = true
				}
			},
			async insertBom() {
				const insertStatus = await insertParentBom(this.proname, this.prostandard, this.prounite)
				console.log(insertStatus)
				if(insertStatus.data.code === '1111'){
					this.$message({
						type: 'success',
						message: '提交成功!'
					})
					this.pid = insertStatus.data.data
					this.isDisabled = true
					this.dialogFormVisible = true
				}else {
					this.$message({
						type: 'warning',
						message: '提交失败，请重新添加!'
					})
				}
			},
            confirmDelete(index,row) {
                this.$confirm('此操作将删除该料件, 是否继续?', '提示', {
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
            confirmEdit(index,row) {
                this.dialogFormVisible1 = true
                this.form2 = row
                this.form2.index = index
            },
            async handleDelete(index,row) {
                const isDeleted = await deleteBom(row.procode)
                if(isDeleted.data.code === '1111') {
                    this.bomList.splice(index, 1)
                    this.total -= 1
                }
            },
			initForm() {
				this.form.procode = ''
				this.form.proname = ''
				this.form.prounite = ''
				this.form.prostandard = ''
				this.form.proid = ''
				this.form.count = ''
				this.form.level = ''
			},
			async querySearchAsync(queryString, cb) {
				let results=[]
				console.log(queryString)
				const result = await getProList(queryString)
				results = result.data.data
				this.goodsList = result.data.data
				if(result.data.code === '1111'){
					for(let i=0;i<results.length;i++){
						results[i].value=results[i].pname
					}
				}
				clearTimeout(this.timeout)
				this.timeout = setTimeout(() => {
					cb(results);
				}, 3000 * Math.random());
			},
			handleSelect(item) {
				console.log(item)
				this.form.proid = item.proid
			},
			handleAddChild(){
				for(let i = 0; i<this.goodsList.length; i++){
					if(this.form.goodsName == this.goodsList[i].pname) {
						this.confirmIndex = i
					}
				}
			},
			async confirmBomChild() {
				console.log(this.confirmIndex,this.goodsList[this.confirmIndex])
				const insertStatus = await insertChildBom(this.goodsList[this.confirmIndex].pname, this.form.prostandard, this.form.prounite, this.goodsList[this.confirmIndex].proid, this.pid, this.form.count)
				let childData = insertStatus.data.data
				childData.level = 2
				console.log('child:',childData)
				this.bomChildList.push(childData)
				this.dialogFormVisible = false
				this.initForm()
			},
            async confirmEditChild(index) {
                const insertStatus = await updateChildBom(this.form2.procode, this.form2.prostandard, this.form2.prounite, this.form2.count)
                let childData = insertStatus.data.data
                this.dialogFormVisible1 = false
                this.initForm()
                this.initData()
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
