<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
        <el-dialog title="新增运输损耗" v-model="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-select v-model="form.goodsIndex" placeholder="请选择商品名称">
                    <el-option v-for="(goods,index) in goodsList" :key="goods.id" :label="goods.pname" :value="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数量" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.productcount" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="规格" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.prostandered" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="单位" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.unite" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="报损时间" :label-width="formLabelWidth">
                <el-date-picker
				v-model="form.reporttime"
				type="date"
				size="small"
				format="yyyy-MM-dd"
				placeholder="选择日期">
				</el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </div>
        </el-dialog>
		<el-row style="margin-top: 20px;">
            <el-col :span="2" style="text-align:right;">商品编号：</el-col>
			<el-col :span="4"><el-input v-model="input" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">商品名称：</el-col>
			<el-col :span="4"><el-input v-model="input" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">损耗商品码：</el-col>
			<el-col :span="4"><el-input v-model="input" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">报损时间</el-col>
			<el-col :span="4"><el-input v-model="input" siez="mini" placeholder="请输入内容"></el-input></el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
                <el-button style="float: right;" @click="handleSearch" type="primary">清空</el-button>
                <el-button style="float: right; margin-right:10px;" @click="handleSearch" type="primary">查询</el-button>
            </el-col>
		</el-row>
		<el-table
			:data="receiptData"
			stripe
			style="text-align:left;">
			<el-table-column
			prop="orderid"
			label="采购订单号">
			</el-table-column>
			<el-table-column
			prop="procode" 
			label="商品编号">
			</el-table-column>
			<el-table-column
			prop="pname" 
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="unite" 
			label="单位">
			</el-table-column>
			<el-table-column
			prop="wasteproductcode" 
			label="损耗商品编码">
			</el-table-column>
			<el-table-column
			prop="productcount" 
			label="损耗数量">
			</el-table-column>
			</el-table-column>
			<el-table-column
			prop="wastetype" 
			label="损耗类别">
			</el-table-column>
		</el-table>
		</div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {getTransportWasteAll, queryTransportWasteList, getProList, addTransportWasteAll} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				value1: '',
				value2: '',
				input: '',
				city: {},
				receiptData: [],
				formLabelWidth: '120px',
				dialogFormVisible: false,
				goodsList:[],
				form:{
					goodsIndex: '',
					reporttime: ''
				}
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		this.initData();
    	},
    	methods: {
    		async initData(){
    			try{
					const dataReceipt = await getTransportWasteAll()
					console.log('re: ',dataReceipt.data.data)
					this.receiptData = dataReceipt.data.data.list
					const result = await getProList('')
					this.goodsList = result.data.data
    			}catch(err){
    				console.log(err);
    			}
    		},
			handleEdit(index,row) {
				console.log(index,row)
				this.$destroy()
				this.$router.push('/transportWasteDetails/'+ row.orderid)
			},
			async handleSearch(){
				// let sTime = this.formatter(this.value1)
				// let eTime = this.formatter(this.value2)
				// console.log(sTime)
				// console.log(eTime)
				// console.log(this.input)
				// const resData = await queryStockIn(this.input,sTime,eTime,1,10)
				// this.receiptData = resData.data.data.list
				// console.log(resData.data)
			},
			formatter(date){
				console.log(date.getMonth())
				let res = ''
				res += date.getFullYear()+ '-' + (date.getMonth() + 1) + '-' +date.getDate()
				return res
			},
			handleInsert(){
				this.dialogFormVisible = true
			},
			async confirmAdd(){
				let times = this.form.reporttime === '' ? '' : this.formatter(this.form.reporttime)
				const addInfo = await addTransportWasteAll(this.goodsList[this.form.goodsIndex].procode, this.goodsList[this.form.goodsIndex].pname, this.form.productcount, this.form.prostandered, this.form.unite, times)
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
