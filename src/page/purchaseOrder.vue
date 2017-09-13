<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top: 20px;">
            <el-col :span="2" style="text-align:right;">制单人：</el-col>
			<el-col :span="4"><el-input v-model="salesmanname" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">创建日期：</el-col>
			<el-col :span="4">				
				<el-date-picker
				v-model="creattime"
				type="date"
				size="small"
				format="yyyy-MM-dd"
				placeholder="选择日期">
				</el-date-picker>
			</el-col>
            <el-col :span="2" style="text-align:right;">单据号：</el-col>
			<el-col :span="4"><el-input v-model="ordercode" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">供应商：</el-col>
			<el-col :span="4"><el-input v-model="supplierid" siez="mini" placeholder="请输入内容"></el-input></el-col>
		</el-row>
		<el-dialog title="新增采购单" v-model="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="料件名称" :label-width="formLabelWidth">
				<el-autocomplete
				v-model="form.proname"
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
		<!-- <el-row>
            <el-col :span="2" style="text-align:right;">订单编号：</el-col>
			<el-col :span="4"><el-input v-model="input" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">供应商：</el-col>
			<el-col :span="4"><el-input v-model="input" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">采购类型：</el-col>
			<el-col :span="4"><el-input v-model="input" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">采购部门：</el-col>
			<el-col :span="4"><el-input v-model="input" siez="mini" placeholder="请输入内容"></el-input></el-col>
		</el-row>
		<el-row>
            <el-col :span="2" style="text-align:right;">采购员：</el-col>
			<el-col :span="4"><el-input v-model="input" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">采购金额：</el-col>
			<el-col :span="4"><el-input v-model="input" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">序列号：</el-col>
			<el-col :span="4"><el-input v-model="input" siez="mini" placeholder="请输入内容"></el-input></el-col>
		</el-row> -->
		<el-row>
			<el-col :span="24"><el-button style="float: right;" @click="handleSearch" type="primary">查询</el-button></el-col>
		</el-row>
		<el-table
			:data="receiptData"
			stripe
			style="width: 100%;text-align:left;">
			<el-table-column
			prop="orderstate" width="120px"
			label="单据状态">
			</el-table-column>
			<el-table-column
			prop="markable" width="120px"
			label="标记">
			</el-table-column>
			<el-table-column
			prop="rejectedmarkable" width="120px"
			label="进退货标志">
			</el-table-column>
			<el-table-column
			prop="sequencenumber" width="120px"
			label="序列号">
			</el-table-column>
			<el-table-column
			prop="ordercode" width="120px"
			label="单据号">
			</el-table-column>
			</el-table-column>
			<el-table-column
			prop="supplierid" width="120px"
			label="供应商">
			</el-table-column>
			<el-table-column
			prop="buydepartment" width="120px"
			label="采购部门">
			</el-table-column>
			<el-table-column
			prop="salesmanname" width="120px"
			label="采购员">
			</el-table-column>
			<el-table-column
			prop="moneyamount" width="120px"
			label="采购金额">
			</el-table-column>
			<el-table-column
			prop="buyfare" width="120px"
			label="采购费用">
			</el-table-column>
			<el-table-column
			prop="allowance" width="120px"
			label="折让金额">
			</el-table-column>
			<el-table-column
			prop="creatorderhuman" width="120px"
			label="制单人">
			</el-table-column>
			<el-table-column
			prop="createtime" width="120px"
			label="创建时间">
			</el-table-column>
			<el-table-column
			prop="abolishhuman" width="120px"
			label="作废人">
			</el-table-column>
			<el-table-column
			label="操作" width="120px">
			<template scope="scope">
				<el-button
				size="small"
				@click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
			</template>
			</el-table-column>
		</el-table>
		</div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {getPurchaseOrderAll, queryPurchaseOrderList} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
				value1: '',
				value2: '',
				input: '',
				city: {},
				receiptData: [],
				salesmanname: '',
				creattime: '',
				ordercode: '',
				supplierid: ''
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
					const dataReceipt = await getPurchaseOrderAll(1, 1)
					console.log('re: ',dataReceipt.data.data)
					this.receiptData = dataReceipt.data.data.list
    			}catch(err){
    				console.log(err);
    			}
    		},
			handleEdit(index,row) {
				console.log(index,row)
				this.$destroy()
				this.$router.push('/purchaseOrderDetails/'+ row.ordercode)
			},
			async handleSearch(){
				let cTime = this.creattime === '' ? '' : this.formatter(this.creattime)
				console.log(cTime)
				const resData = await queryPurchaseOrderList(this.salesmanname, cTime, this.ordercode, this.supplierid,1,1)
				this.receiptData = resData.data.data.list
				console.log(resData.data)
			},
			formatter(date){
				console.log(date.getMonth())
				let res = ''
				res += date.getFullYear()+ '-' + (date.getMonth() + 1) + '-' +date.getDate()
				return res
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
