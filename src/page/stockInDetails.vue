<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
        <el-dialog title="报损" v-model="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="商品编码" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.procode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.proname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="数量" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.productcount" auto-complete="off">
                	<template slot="append">{{this.prou}}</template>
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </div>
		</el-dialog>
		<el-table
			:data="receiptData"
			stripe
			style="width: 960px;text-align:left; margin-top: 20px;">
			<el-table-column
			prop="ordercode" width="120px"
			label="B库采购需求单号">
			</el-table-column>
			<el-table-column
			prop="proname" width="120px"
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="procode" width="120px"
			label="商品编码">
			</el-table-column>
			<el-table-column
			prop="protype" width="120px"
			label="商品分类">
			</el-table-column>
			<el-table-column
			prop="procount" width="120px"
			label="数量">
			</el-table-column>
			<el-table-column
			prop="storenumber" width="120px"
			label="报损数量">
			</el-table-column>
			<el-table-column
			prop="prostandard" width="120px"
			label="规格型号">
			</el-table-column>
			<el-table-column
			prop="prounite" width="120px"
			label="单位">
			</el-table-column>
			<el-table-column
			label="操作" width="120px" fixed="right">
			<template scope="scope">
				<el-button
				size="small"
				@click="handleEdit(scope.$index, scope.row)">报损</el-button>
			</template>
			</el-table-column>
		</el-table>
		<el-row style="margin-top:20px;">
			<el-col :span="24">
				<el-button style="float:right;" @click="handleBack" type="primary">返回</el-button>
			</el-col>
		</el-row>
		</div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {getStockInDetails, getStockOutDetailsDetail, addTransportWasteAll} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				radio2: 3,
				value1: '',
				value2: '',
				input: '',
				city: {},
                receiptData: [],
                id: this.$route.params.id,
				headData:{},
				procode: '',
				proname: '',
				prostandered: '',
				prounite: '',
				form: {},
				dialogFormVisible:false,
				formLabelWidth: '120px',
				repository: '',
				procount: '',
				ind: '',
				prou: '',
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
					const dataReceipt = await getStockInDetails(this.id)
                    this.receiptData = dataReceipt.data.data.list
    			}catch(err){
    				console.log(err);
    			}
            },
            handleBack(){
                this.$destroy()
                this.$router.push('/stockIn')
			},
			handleEdit(index,row) {
				this.dialogFormVisible = true
				this.ind = index
				this.prou = row.prounite
				this.form.procode = row.procode
				this.form.proname = row.proname
				console.log(row.prounite)
			},
			async confirmAdd(){
				const addInfo = await addTransportWasteAll(this.form.productcount, this.receiptData[this.ind].ordercode,this.receiptData[this.ind].proname,this.receiptData[this.ind].procode,this.receiptData[this.ind].protype,this.receiptData[this.ind].prostandard,this.receiptData[this.ind].prounite,this.receiptData[this.ind].procount)
				if(addInfo.data.code === '1111'){
					this.$message('添加运输损耗成功')
					this.dialogFormVisible = false
					this.initData()
				}else {
					this.$message(addInfo.data.message)
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
