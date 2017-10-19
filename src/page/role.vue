<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px; border-bottom:1px solid #EFF2F7; padding-bottom:5px; margin-left:2%;">
			<el-col :span="24">
				<el-button @click="dialogFormVisible = true" >新增角色</el-button>
			</el-col>
		</el-row>
        <el-dialog title="新增用户" v-model="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.rolename" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </div>
        </el-dialog>
		<div class="fruit-content">
		<el-table
			:data="receiptData"
			stripe
			style="margin-top:20px;text-align:left;">
			<el-table-column
			prop="roleid"
			label="角色ID">
			</el-table-column>
			<el-table-column
			prop="rolename"
			label="角色名称">
			</el-table-column>
			<el-table-column
			label="操作" >
			<template scope="scope">
				<el-button
				size="small"
				@click="handleEdit(scope.$index, scope.row)">绑定页面</el-button>
                <el-button
				size="small"
				@click="handleEdit(scope.$index, scope.row)">删除</el-button>
			</template>
			</el-table-column>
		</el-table>
		</div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {getRoleAll, addRole} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				value1: '',
				value2: '',
				input: '',
				city: {},
				receiptData: [],
				pname: '',
				prostandered: '',
				procode: '',
				helpcode: '',
				commodityattribute: '',
				factories: '',
				brand: '',
				barcode: '',
                placeoforigin: '',
                form: {
                    rolename: ''
                },
                dialogFormVisible: false,
                formLabelWidth: '120px'
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		this.initData();
    	},
        beforeRouteLeave (to, from, next) {
            this.$destroy()
            next()
        },
    	methods: {
    		async initData(){
    			try{
					const dataReceipt = await getRoleAll()
					console.log('re: ',dataReceipt.data.data)
					this.receiptData = dataReceipt.data.data
    			}catch(err){
    				console.log(err);
    			}
    		},
			handleEdit(index,row) {
				console.log(index,row)
				this.$destroy()
				this.$router.push('/roleDetails/'+ row.roleid)
			},
			formatter(date){
				console.log(date.getMonth())
				let res = ''
				res += date.getFullYear()+ '-' + (date.getMonth() + 1) + '-' +date.getDate()
				return res
            },
            async confirmAdd() {
                console.log(this.form.rolename)
                const roleInfo = await addRole(this.form.rolename)
                if (roleInfo.data.code === '1111'){
                    this.$message('添加角色成功')
                    this.initData()
                    this.dialogFormVisible = false
                } else {
                    this.$message(roleInfo.data.message)
                }
            }
		}
    }
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.button_submit{
		text-align: center;
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
