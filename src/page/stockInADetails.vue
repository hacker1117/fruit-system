<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top: 20px;">
            <el-col :span="2" style="text-align:right;">单据编号：</el-col>
			<el-col :span="4"><el-input v-model="ordernumber" siez="mini" placeholder="请输入内容"></el-input></el-col>
		</el-row>
		<el-row>
			<el-col :span="24"><el-button style="float: right;" @click="handleSearch" type="primary">查询</el-button></el-col>
		</el-row>
        <!-- <el-dialog title="完善入库信息" v-model="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="仓库" :label-width="formLabelWidth">
                <el-select v-model="form.repositoryname" placeholder="请选择仓库">
                    <el-option label="A库" value="A库"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="实际入库数量" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="净重量" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="单价" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="总价" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="供应商" :label-width="formLabelWidth">
                <el-input style="width: 195px" v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
			<el-form-item label="虚拟库" :label-width="formLabelWidth">
                <el-select v-model="form.repositoryname" placeholder="请选择虚拟库">
                    <el-option label="A库" value="A库"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </div>
        </el-dialog> -->
		<el-table
			:data="receiptData"
			stripe
			style="width: 100%;text-align:left;">
			<el-table-column
			prop="ordercode" width="120px"
			label="采购订单编号">
			</el-table-column>
			<el-table-column
			width="120px"
			label="单据号">
			</el-table-column>
			<el-table-column
			prop="storagename" width="120px"
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="storagecode" width="120px"
			label="商品编码">
			</el-table-column>
			<el-table-column
			prop="prostandared" width="120px"
			label="规格">
			</el-table-column>
			<el-table-column
			prop="prounite" width="120px"
			label="单位">
			</el-table-column>
			<el-table-column
			prop="advisenumber" width="120px"
			label="建议采购数量">
			</el-table-column>
			</el-table-column>
			<el-table-column
			 width="120px"
			label="仓库">
			</el-table-column>
			<el-table-column
			 width="120px"
			label="实际入库数量">
			</el-table-column>
			<el-table-column
			 width="120px"
			label="净重量">
			</el-table-column>
			<el-table-column
			width="120px"
			label="单价">
			</el-table-column>
			<el-table-column
			width="120px"
			label="总价">
			</el-table-column>
			<el-table-column
			 width="120px"
			label="供应商">
			</el-table-column>
			<el-table-column
			width="120px"
			label="虚拟库">
			</el-table-column>
			<el-table-column
			label="操作" fixed="right" width="120px">
			<template scope="scope">
				<el-button
				size="small"
				@click="handleEdit(scope.$index, scope.row)">完善入库单</el-button>
			</template>
			</el-table-column>
		</el-table>
		</div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {getNotStockInA, queryStockInList} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				value1: '',
				value2: '',
				input: '',
				city: {},
				receiptData: [],
				ordernumber: '',
				ordertime: ''
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
					const dataReceipt = await getNotStockInA()
					console.log('re: ',dataReceipt.data.data)
					this.receiptData = dataReceipt.data.data
    			}catch(err){
    				console.log(err);
    			}
    		},
			// handleEdit(index,row) {
			// 	console.log(index,row)
			// 	this.$destroy()
			// 	this.$router.push('/stockInListDetails/'+ row.orderid)
			// },
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
			handleAdd() {
				this.$destroy()
				this.$router.push('/stockInADetails')
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
