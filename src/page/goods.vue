<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-row style="margin-top: 20px;">
            <el-col :span="2" style="text-align:right;">商品编码：</el-col>
			<el-col :span="4"><el-input v-model="proid" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">商品名称：</el-col>
			<el-col :span="4"><el-input v-model="pname" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">规格型号：</el-col>
			<el-col :span="4"><el-input v-model="prostandered" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">助记码：</el-col>
			<el-col :span="4"><el-input v-model="helocode" siez="mini" placeholder="请输入内容"></el-input></el-col>
		</el-row>
		<el-row>
            <el-col :span="2" style="text-align:right;">商品属性：</el-col>
			<el-col :span="4"><el-input v-model="commodityattribute" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">厂家：</el-col>
			<el-col :span="4"><el-input v-model="factories" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">品牌：</el-col>
			<el-col :span="4"><el-input v-model="brand" siez="mini" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" style="text-align:right;">条码：</el-col>
			<el-col :span="4"><el-input v-model="barcode" siez="mini" placeholder="请输入内容"></el-input></el-col>
		</el-row>
		<el-row>
            <el-col :span="2" style="text-align:right;">产地：</el-col>
			<el-col :span="4"><el-input v-model="placeoforigin" siez="mini" placeholder="请输入内容"></el-input></el-col>
		</el-row>
		<el-row>
			<el-col :span="24"><el-button style="float: right;" @click="handleSearch" type="primary">查询</el-button></el-col>
		</el-row>
		<el-table
			:data="receiptData"
			stripe
			style="width: 100%;text-align:left;">
			<el-table-column
			prop="proid" width="120px"
			label="商品编码">
			</el-table-column>
			<el-table-column
			prop="pname" width="120px"
			label="商品名称">
			</el-table-column>
			<el-table-column
			prop="prostandered" width="120px"
			label="规格">
			</el-table-column>
			<el-table-column
			prop="protype" width="120px"
			label="商品分类">
			</el-table-column>
			<el-table-column
			prop="pronuite" width="120px"
			label="计量单位">
			</el-table-column>
			<el-table-column
			prop="referenceprice" width="120px"
			label="参考售价">
			</el-table-column>
			</el-table-column>
			<el-table-column
			prop="salesprice" width="120px"
			label="零售价">
			</el-table-column>
			<el-table-column
			prop="imagepath" width="120px"
			label="图片">
			</el-table-column>
			<el-table-column
			prop="placeoforigin" width="120px"
			label="来源">
			</el-table-column>
			<el-table-column
			prop="goodsstate" width="120px"
			label="状态">
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
    import {getGoodsAll, queryGoodsList} from '@/api/getData'
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
				placeoforigin: ''
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
					const dataReceipt = await getGoodsAll()
					console.log('re: ',dataReceipt.data.data)
					this.receiptData = dataReceipt.data.data.list
    			}catch(err){
    				console.log(err);
    			}
    		},
			handleEdit(index,row) {
				console.log(index,row)
				this.$destroy()
				this.$router.push('/stockInListDetails/'+ row.orderid)
			},
			async handleSearch(){
				const resData = await queryGoodsList(this.pname, this.prostandered, this.procode, this.helpcode, this.commodityattribute, this.factories, this.brand, this.barcode, this.placeoforigin)
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
