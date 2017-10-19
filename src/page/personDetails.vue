<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top:20px;">
			<el-col :span="2" style="text-align:left;">新密码：</el-col>
			<el-col :span="5"><el-input type="password" v-model="newpass" placeholder="请输入内容" :disabled="isDisabled"></el-input></el-col>
		</el-row>
		<el-row>
			<el-col :span="2" style="text-align:left;">新密码：</el-col>
			<el-col :span="5"><el-input type="password" v-model="repass" placeholder="请输入内容" :disabled="isDisabled"></el-input></el-col>
		</el-row>
		<el-row style="margin-top:20px;">
			<el-col :span="24" style="float:left;">
				<el-button @click="handleEdit" type="primary">修改</el-button>
				<el-button @click="handleBack" type="primary">返回</el-button>
			</el-col>
		</el-row>
		</div>
    </div>
</template>

<script>
 	import headTop from '@/components/headTop'
    import {updateUser} from '@/api/getData'
	import {baseUrl, baseImgPath} from '@/config/env'
	import md5 from 'md5'
    export default {
    	data(){
    		return {
    			baseUrl,
    			baseImgPath,
                bomChildList: [],
                newpass: '',
                repass: '',
				id: this.$route.params.id,
				childList:[],
				isDisabled: false
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
			async handleEdit() {
				if(this.newpass === '') {
                    this.$message('请输入密码');
                    return false
                }
                if(this.newpass === this.repass) {
                    console.log(this.newpass)
                    const isSuccess = await updateUser(this.id, md5(this.newpass))
                    if(isSuccess.data.code === '1111'){
                        this.$message('修改密码成功')
                        this.$destroy()
                        this.$router.push('/person')
                    } else {
                        this.$message(isSuccess.data.message)
                    }
                } else {
                    this.$message('两次输入密码不一致');
                    return false
                }
            },
            handleBack() {
				this.$destroy()
				this.$router.push('/person')
			}
			// addBomChild() {
			// 	if(this.proname === '' || this.prostandard === '' || this.prounite === '请选择单位' ){
			// 		this.$message({
			// 			showClose: true,
			// 			message: '请先输入Bom基本信息',
			// 			type: 'warning'
			// 		})
			// 		return false
			// 	}
			// 	if(this.pid === ''){
			// 		this.$confirm('录入的BOM信息将会被提交, 是否继续?', '提示', {
			// 			confirmButtonText: '确定',
			// 			cancelButtonText: '取消',
			// 			type: 'warning'
			// 		}).then(() => {
			// 			this.insertBom()
			// 		}).catch(() => {
			// 			this.$message({
			// 				type: 'info',
			// 				message: '已取消删除'
			// 			})
			// 			return false
			// 		})
			// 	} else {
			// 		this.dialogFormVisible = true
			// 	}
			// },
			// async insertBom() {
			// 	const insertStatus = await insertParentBom({
			// 		proname: this.form.proname,
			// 		prostandard: this.form.prostandard,
			// 		prounite: this.form.prounite,
			// 	})
			// 	console.log(insertStatus)
			// 	if(insertStatus.data.code === '1111'){
			// 		this.$message({
			// 			type: 'success',
			// 			message: '提交成功!'
			// 		})
			// 		this.pid = insertStatus.data.data
			// 		this.isDisabled = true
			// 		this.dialogFormVisible = true
			// 	}else {
			// 		this.$message({
			// 			type: 'warning',
			// 			message: '提交失败，请重新添加!'
			// 		})
			// 	}
			// },
			// initForm() {
			// 	this.form.procode = ''
			// 	this.form.proname = ''
			// 	this.form.prounite = ''
			// 	this.form.prostandard = ''
			// 	this.form.proid = ''
			// 	this.form.count = ''
			// 	this.form.level = ''
			// },
			// async querySearchAsync(queryString, cb) {
			// 	let results=[]
			// 	if(queryString !== '') {
			// 		const result = await getProList(queryString,1,10)
			// 		results = result.data.data.list
			// 		for(let i=0;i<results.length;i++){
			// 			results[i].value=results[i].pname
			// 		}
			// 	}
			// 	clearTimeout(this.timeout)
			// 	this.timeout = setTimeout(() => {
			// 		cb(results);
			// 	}, 3000 * Math.random());
			// },
			// handleSelect(item) {
			// 	console.log(item)
			// 	this.form.proid = item.proid
			// },
			// handleAddChild(){
			// 	this.$confirm('确认新增该料件吗?', '提示', {
			// 		confirmButtonText: '确定',
			// 		cancelButtonText: '取消',
			// 		type: 'warning'
			// 	}).then(() => {
			// 		this.confirmBomChild()
			// 	}).catch(() => {
			// 		this.$message({
			// 			type: 'info',
			// 			message: '已取消删除'
			// 		})
			// 		return false
			// 	})
			// },
			// async confirmBomChild() {
			// 	const insertStatus = await insertChildBom({
			// 		proname: this.proname,
			// 		prostandard: this.prostandard,
			// 		prounite: this.prounite,
			// 		proid: this.form.proid,
			// 		pid: this.pid,
			// 		count: this.form.count
			// 	})
			// 	let childData = insertStatus.data.data
			// 	childData.level = 2
			// 	console.log('child:',childData)
			// 	this.bomChildList.push(childData)
			// 	this.dialogFormVisible = false
			// 	this.initForm()
			// 	console.log(this.pid)
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
