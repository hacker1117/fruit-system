<template>
    <div>
        <head-top></head-top>
		<div class="fruit-content">
		<el-table
            ref="multipleTable"
			:data="receiptData"
			stripe
            @selection-change="handleSelectionChange"
			style="margin-top:20px;text-align:left; width:50%;">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
			<el-table-column
			prop="pagename"
			label="页面名称">
			</el-table-column>
		</el-table>
        <el-row style="margin-top: 20px; padding-bottom:5px; margin-left:2%;">
			<el-col :span="24">
				<el-button @click="handleConfirm" >保存</el-button>
			</el-col>
		</el-row>
		</div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {getViewsAll, getUserView, bindHtml} from '@/api/getData'
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
                multipleSelection: [],
                idArray:[]
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
					const dataReceipt = await getViewsAll()
                    this.receiptData = dataReceipt.data.data
                    const userViews = await getUserView(this.$route.params.id)
                    for(let i = 0;i < this.receiptData.length; i++){
                        for(let j = 0;j < userViews.data.data.length; j++){
                            if(this.receiptData[i].pagecode === userViews.data.data[j].pagecode){
                                console.log('table', this.$refs)
                                this.$refs.multipleTable.toggleRowSelection(this.receiptData[i])
                                console.log(i,j)
                            }
                        }
                    }
                    console.log(this.multipleSelection)
    			}catch(err){
    				console.log(err);
    			}
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
                console.log(val)
            },
            toggleSelection(rows) {
                if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
                } else {
                this.$refs.multipleTable.clearSelection();
                }
            },
			handleEdit(index,row) {
				this.$destroy()
				this.$router.push('/roleDetails/'+ row.roleid)
            },
            async handleConfirm(){
                for(let i=0;i<this.multipleSelection.length;i++){
                    this.idArray.push(this.multipleSelection[i].hid)
                }
                const bindInfo = await bindHtml(this.$route.params.id,this.idArray.join())
                if(bindInfo.data.code === '1111'){
                    this.$message('绑定成功')
                    this.$destroy()
                    this.$router.push('/role')
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
