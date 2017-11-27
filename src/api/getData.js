import "babel-polyfill"
import fetch from '@/config/fetch'
import axio from '@/config/axio'
import yichu from '@/config/yichu'
import local from '@/api/local'

let isLogin = local.get('userInfo')
isLogin = JSON.parse(isLogin)
const repoId = isLogin.repositoryid
const unames = isLogin.uname

/**
 * 登陆
 */

export const login = data => axio('/user/login', data);

/**
 * 登陆后获取页面权限
 */

export const loginRole = (uID = '111') => axio('/user/queryPageRole', {uID});

/**
 * 获取APP后台商品列表
 */

export const appGoodsList = (page,productName) => yichu('/openToErp/openToErpProductList', {page, productName}, 'POST');

/**
 * 获取APP后台商品列表
 */

export const bindAppGoods = (procode, sku, proid) => axio('/productmanager/Bandwithfront', {procode, sku, proid});

/**
 * 退出
 */

export const signout = () => fetch('/admin/singout');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => fetch('/admin/info');

/**
 * api请求量
 */

export const apiCount = date => fetch('/statis/api/' + date + '/count');

/**
 * 所有api请求量
 */

export const apiAllCount = () => fetch('/statis/api/count');


/**
 * 所有api请求信息
 */

export const apiAllRecord = () => fetch('/statis/api/all');

/**
 * 用户注册量
 */

export const userCount = date => fetch('/statis/user/' + date + '/count');

/**
 * 某一天订单数量
 */

export const orderCount = date => fetch('/statis/order/' + date + '/count');


/**
 * 某一天管理员注册量
 */

export const adminDayCount = date => fetch('/statis/admin/' + date + '/count');

/**
 * 管理员列表
 */

export const adminList = data => fetch('/admin/all', data);

/**
 * 管理员数量
 */

export const adminCount = () => fetch('/admin/count');

/**
 * 获取定位城市
 */

export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
});

/**
 * 添加商铺
 */

export const addShop = data => fetch('/shopping/addShop', data, 'POST');

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
	type: 'search',
	city_id: cityid,
	keyword: value
});

/**
 * 获取当前店铺食品种类
 */

export const getCategory = restaurant_id => fetch('/shopping/getcategory/' + restaurant_id);

/**
 * 添加食品种类
 */

export const addCategory = data => fetch('/shopping/addcategory', data, 'POST');


/**
 * 添加食品
 */

export const addFood = data => fetch('/shopping/addfood', data, 'POST');


/**
 * category 种类列表
 */

export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category');

/**
 * 获取餐馆列表
 */

export const getResturants = data => fetch('/shopping/restaurants', data);

/**
 * 获取餐馆详细信息
 */

export const getResturantDetail = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id);

/**
 * 获取餐馆数量
 */

export const getResturantsCount = () => fetch('/shopping/restaurants/count');

/**
 * 更新餐馆信息
 */

export const updateResturant = data => fetch('/shopping/updateshop', data, 'POST');

/**
 * 删除餐馆
 */

export const deleteResturant = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id, {}, 'DELETE');

/**
 * 获取食品列表
 */

export const getFoods = data => fetch('/shopping/v2/foods', data);

/**
 * 获取食品数量
 */

export const getFoodsCount = data => fetch('/shopping/v2/foods/count', data);


/**
 * 获取menu列表
 */

export const getMenu = data => fetch('/shopping/v2/menu', data);

/**
 * 获取menu详情
 */

export const getMenuById = category_id => fetch('/shopping/v2/menu/' + category_id);

/**
 * 更新食品信息
 */

export const updateFood = data => fetch('/shopping/v2/updatefood', data, 'POST');

/**
 * 删除食品
 */

export const deleteFood = food_id => fetch('/shopping/v2/food/' + food_id, {}, 'DELETE');

/**
 * 获取用户列表
 */

export const getUserList = data => fetch('/v1/users/list', data);

/**
 * 获取用户数量
 */

export const getUserCount = data => fetch('/v1/users/count', data);

/**
 * 获取订单列表
 */

export const getOrderList = data => fetch('/bos/orders', data);

/**
 * 获取订单数量
 */

export const getOrderCount = data => fetch('/bos/orders/count', data);

/**
 * 获取用户信息
 */

export const getUserInfo = user_id => fetch('/v1/user/' + user_id);

/**
 * 获取地址信息
 */

export const getAddressById = address_id => fetch('/v1/addresse/' + address_id);

/**
 * 获取用户分布信息
 */

export const getUserCity = () => fetch('/v1/user/city/count');


/**
 * 获取BOM列表
 */

export const getBomAll = (pageNum = 1, pageSize = 10) => axio('/Bom/findAllParent/',{pageNum, pageSize});

/**
 * 查询BOM管理
 */

export const getqueryBomAll = (procode, proname,pageNum = 1, pageSize = 10) => axio('/Bom/findBySth/',{procode, proname,pageNum, pageSize});

/**
 * 根据id获取BOM组
 */

export const getBomGroup = procode => axio('/Bom/queryOneGroup/' + procode);

/**
 * 根据name模糊查询商品列表
 */

export const getProList = (proName) => axio('/repositoryb/queryProductByName',{proName})

/**
 * 根据id获取BOM组
 */

export const getBomDetail = procode => axio('/Bom/findSingleBom/' + procode);

/**
 * 插入Bom父节点
 */

export const insertParentBom = (proname, prostandard, prounite) => axio('/Bom/createParentBom', {proname, prostandard, prounite}, 'POST');

/**
 * 插入Bom子节点
 */

export const insertChildBom = (proname, prostandard, prounite, proid, pid, count) => axio('/Bom/createChildBom', {proname, prostandard, prounite, proid, pid, count}, 'POST');

/**
 * 插入Bom子节点
 */

export const updateChildBom = (procode, prostandard, prounite, count) => axio('/Bom/modifyOneBom', {procode, prostandard, prounite, count}, 'POST');

/**
 * 删除Bom节点（父子均可）
 */

export const deleteBom = procode => axio('/Bom/deleteBom/' + procode, {}, 'DELETE');

/**
 * 获取销售订单列表
 */

export const getOrderAll = (pageNum = 1, pageSize = 10) => axio('/order/findAll',{pageNum, pageSize});

/**
 * 查询销售订单
 */

export const queryOrders = (orderID, status, startTime, endTime, pageNum = 1, pageSize = 10) => axio('/order/queryOrders',{orderID, status, startTime, endTime,pageNum, pageSize});

/**
 * 生产执行管理 销售订单汇总-批量转异常单
 */

export const sendAbnormal = (orderIds) => axio('/order/markOrderError',{orderIds}, 'POST');

/**
 * 获取销售订单详情
 */

export const getOrderDetails = id => axio('/order/queryOrderListByOrderId/' + id);

/**
 * 获取出库单列表
 */

export const getStockOutAll = (pageNum = 1, pageSize = 10) => axio('/Outputorderb/findAll',{pageNum, pageSize});

/**
 * 获取出库单详情头部
 */

export const getStockOutDetailsHead = data => axio('/Outputorderb/queryOutPutHead/' + data);

/**
 * 获取出库单详情表格
 */

export const getStockOutDetailsDetail = (data, repositoryid = repoId) => axio('/Outputorderb/queryOutPutDetail/' + data,{repositoryid});

/**
 * 查询出库单
 */

export const queryStockOut = (customerID, startDate, endDate, pageNum = 1, pageSize = 10) => axio('/Outputorderb/findBySth',{customerID, startDate, endDate,pageNum, pageSize});

/**
 * 获取货品分类列表
 */

export const getCategoryAll = (pageNum = 1, pageSize = 10) => axio('/productCategory/queryAllParent',{pageNum, pageSize});

/**
 * 查询货品子分类列表
 */

export const getCategoryChild = data => axio('/productCategory/findChildByID/' + data);

/**
 * 删除货品分类（父子均可）
 */

export const deleteCategory = data => axio('/productCategory/deleteById/' + data, {}, 'DELETE');

/**
 * 获取生产计划列表
 */

export const getPlanAll = (pageNum = 1, pageSize = 10) => axio('/handlingorder/findbyUnion', {pageNum, pageSize});

/**
 * 按批次查询生产计划列表
 */

export const queryPlanByBatch = (bid, pageNum = 1, pageSize = 10) => axio('/handlingorder/findUnionByBatch/' + bid,{pageNum, pageSize});

/**
 * 按条件查询生产计划列表
 */

export const queryPlan = (orderID, status, startTime, endTime, pageNum = 1, pageSize = 10) => axio('/handlingorder/findUnionBySth', {orderID, status, startTime, endTime, pageNum, pageSize});

/**
 * 获取生产批次列表
 */

export const getBatchAll = () => axio('/handlingorder/findAllBatches');

/**
 * 获取入库单列表
 */

export const getStockInAll = (bpid = '',ordertime = '', inrepotype = '', handleperson = '', pageNum = 1, pageSize = 10) => axio('/repositoryb/selectTinstoragebByCondition',{bpid, ordertime, inrepotype, handleperson, pageNum, pageSize});

/**
 * 获取入库单列表
 */

export const getStockInAllB = (bpid = '',ordertime = '', inrepotype = '', handleperson = '', pageNum = 1, pageSize = 10, repositoryid = repoId) => axio('/repositoryb/queryInstorageOrder',{bpid, ordertime, inrepotype, handleperson, pageNum, pageSize, repositoryid});

/**
 * 获取入库单详情
 */

export const getStockInDetails = (outputcode, repositoryid = repoId) => axio('/repositoryb/queryInstoragebDetail' , {outputcode, repositoryid});

/**
 * 获取入库清单列表
 */

export const getStockInListAll = (pageNum = 1, pageSize = 10, repositoryid = repoId) => axio('/innetstorageb/getTotal',{pageNum, pageSize, repositoryid});

/**
 * 获取入库清淡详情
 */

export const getStockInListDetails = orderid => axio('/innetstorageb/get/'+ orderid );

/**
 * 查询入库清单
 */

export const queryStockInList = (orderid, ordertime, ordercode, pageNum = 1, pageSize = 10, repositoryid = repoId) => axio('/repositoryb/queryInnetStorageb',{orderid, ordertime, ordercode, pageNum, pageSize, repositoryid});

/**
 * 获取运输损耗列表
 */

export const getTransportWasteAll = (pageNum = 1, pageSize = 10, repositoryid = repoId) => axio('/repositoryb/getTransferWasteb',{pageNum, pageSize, repositoryid});

/**
 * 新增运输损耗
 */

export const addTransportWasteAll = (productcount, ordercode, proname, procode, protype, prostandard, prounite, procount, pageNum = '1', pageSize = '1000', repositoryid = repoId) => axio('/bTWastageordera/addWeastorder', {productcount, ordercode, proname, procode, protype, prostandard, prounite, procount, repositoryid} );

/**
 * A库新增损耗管理
 */

//export const addWasteAll = (pname, procode, wasteproductcode, unite, wastetype, productcount, pageNum = '1', pageSize = '10') => axio('/wastageordera/insertWastage', {pname, procode, wasteproductcode, unite, wastetype, productcount, pageNum , pageSize} );
export const addWasteAll = (pname, procode, prostandered, unite, wastetype, remarkable, productcount, pageNum = '1', pageSize = '10') => axio('/wastageordera/insertWastage', {pname, procode, prostandered, unite, wastetype, remarkable, productcount, pageNum , pageSize} );

/**
 * 查询A库损耗管理
 */

export const queryWasteList = (procode, pname, wasteproductcode, reporttime, pageNum = 1, pageSize = 10) => axio('/bTWastageordera/getCondition',{ procode, pname, wasteproductcode, reporttime, pageNum , pageSize});

/**
 * 查询运输损耗清单
 */

export const queryTransportWasteList = (procode, pname, wasteproductcode, reporttime, pageNum = 1, pageSize = 10, repositoryid = repoId) => axio('/bTWastageordera/getCondition',{ procode, pname, wasteproductcode, reporttime, pageNum , pageSize, repositoryid});

/**
 * 获取B库日常损耗管理列表
 */

export const getDailyLossList = (pageNum = 1, pageSize = 10, repositoryid = repoId) => axio('/repositoryb/getAllDailyWaste',{pageNum, pageSize, repositoryid});

/**
 * 查询B库日常损耗管理
 */

export const queryDailyLossList = (productcode, pname, wasteproductcode, createhuman, timeofreport, pageNum = 1, pageSize = 10, repositoryid = repoId) => axio('repositoryb/queryDailyWaste',{productcode, pname, wasteproductcode, createhuman, timeofreport, pageNum , pageSize, repositoryid});

/**
 * 新增B库日常损耗管理
 */

export const addTransportWaste = (pname,productcode,procuctstanderd,productunite,wastetype,remarkable,productnumber, pageNum = 1, pageSize = 10, repositoryid = repoId) => axio('/repositoryb/addDailyWaste',{pname,productcode,procuctstanderd,productunite,wastetype,remarkable,productnumber, pageNum , pageSize, repositoryid});

/**
 * 获取采购单（A库）列表
 */

export const getPurchaseOrderAll = (pageNum = 1, pageSize = 10) => axio('/purchaseordera/selectnotinstorage',{pageNum, pageSize});

/**
 * 获取供应商列表
 */

export const getSupplierAll = (pageNum = 1, pageSize = 10) => axio('/supplierorder/findAllSupplierorder',{pageNum, pageSize});

/**
 * 获取供应商详情
 */

export const getSupplierDetails = (supplierid) => axio('/supplierorder/findDetalis',{supplierid});

/**
 * 添加供应商
 */

export const addSupplier = (supplierid,sname,supplytype,cmpanyaddress,ranks,linkman,mantelephone,mobiletelephone,taxrate,createman,createtime,remarkable) => axio('/supplierorder/InsertSupplierOrder',{supplierid,sname,supplytype,cmpanyaddress,ranks,linkman,mantelephone,mobiletelephone,taxrate,createman,createtime,remarkable},'POST');

/**
 * 获取货品列表
 */

export const getGoodsAll = (pageNum = 1, pageSize = 10) => axio('/productmanager/findAllProduct',{pageNum, pageSize});

/**
 * 添加商品信息
 */

export const addGoods = (isStandard,proid,pname,prostandered,commodityattribute,storagetype,factories,brand,supplierid,referenceinprice,createman) => axio('/productmanager/insertProduct',{isStandard,proid,pname,prostandered,commodityattribute,storagetype,factories,brand,supplierid,referenceinprice,createman});

/**
 * 修改商品信息
 */

export const updateGoods = (proid,pname,prostandered,commodityattribute,storagetype,factories,brand,supplierid,referenceinprice) => axio('/productmanager/updateProduct',{proid,pname,prostandered,commodityattribute,storagetype,factories,brand,supplierid,referenceinprice});

/**
 * 获取入库单列表
 */

export const getStockInaAll = (pageNum = 1, pageSize = 10) => axio('/storageordera/findAllData',{pageNum, pageSize});

/**
 * 查询入库单
 */

export const queryStockInaAll = (storgeaid, ordertime, storagename, pageNum = 1, pageSize = 10) => axio('/storageordera/selectByExamples',{storgeaid, ordertime, storagename, pageNum, pageSize});

/**
 * 获取库存余额列表 -A库
 */

export const getStockBalanceaAll = (pageNum = 1, pageSize = 10) => axio('/abalancerepository/selectAllDatas',{pageNum, pageSize});

/**
 * 获取库存余额列表 -B库
 */

export const getStockBalancebAll = (repocode,proname,pageNum = 1, pageSize = 10, repositoryid = repoId) => axio('/repositoryb/getStoragebAblance',{repocode,proname,pageNum, pageSize,repositoryid});


/**
 * 查询库存余额列表 -B库
 */

export const getqueryBalancebAll = (repocode,proname,pageNum = 1, pageSize = 10, repositoryid = repoId) => axio('/repositoryb/getStoragebAblance',{repocode,proname,pageNum, pageSize,repositoryid});

/**
 * 获取损耗列表
 */

export const getWasteAll = (pageNum = 1, pageSize = 10) => axio('/wastageordera/findAllWorder',{pageNum, pageSize});

/**
 * 获取损耗列表
 */

export const getStockOutaAll = (pageNum = 1, pageSize = 10) => axio('/outputordera/findTodayOutput',{pageNum, pageSize});

/**
 * 查询A库出库单
 */

export const queryStockOutA= (outputcode , ordertime, customer, pageNum = 1, pageSize = 10) => axio('/outputordera/findByExamples',{ordertime, customer, pageNum, pageSize});

/**
 * 查询A库出库单
 */

export const getStockOutaDetails= outputCode => axio('/outputordera/findDetails',{outputCode});

/**
 * 查询B库入库单
 */

export const queryStockIn= (outputcode, ordertime, pageNum = 1, pageSize = 10, repositoryid = repoId) => axio('/repositoryb/selectTinstoragebByCondition',{outputcode, ordertime, pageNum, pageSize, repositoryid});


/**
 * 查询采购单列表
 */

export const queryPurchaseOrderList = (salesmanname, createtime, ordercode, supplierid, pageNum = 1, pageSize = 10) => axio('/purchaseordera/selectByPurchseordernumber',{salesmanname, createtime, ordercode, supplierid, salesmanname, createtime, ordercode, supplierid, pageNum, pageSize});

/**
 * A库采购单-完成待入库
 */

export const querystay = (pageNum = 1, pageSize = 10) => axio('/purchaseordera/selectTodaysData',{pageNum, pageSize});

/**
 * 获取采购单（A库）详情
 */

export const getPurchaseOrderDetails = ordercode => axio('/purchaseordera/Deatil',{ordercode});

/**
 * 获取未生单的采购单列表
 */

export const getPurchaseSumList = ordercode => axio('/purchasesummaryordera/selectAllNotCreate',{ordercode});

/**
 * 按照名称获取采购汇总单
 */

export const getPurchaseSumListByName = (productcode) => axio('/purchasesummaryordera/selectByProductcode',{productcode});

/**
 * 获取未生单的商品列表
 */

export const getPurchaseSumGoods = () => axio('/purchasesummaryordera/findAllProuctInPurchsummaryordera');

/**
 * 自动生成采购单
 */

export const makePurchaseOrder = (pname, productcode, supplierid, aexistamount, advisebuynumber) => axio('/purchasesummaryordera/updateIsCreatre',{pname, productcode, supplierid, aexistamount, advisebuynumber});

/**
 * 获取未生单的商品列表
 */

export const getNotStockInA = () => axio('/storageordera/queryTodayNotInStory');

/**
 * 查询供应商列表
 */

export const querySupplierList = (supplytype,sname,mantelephone,pageNum = 1, pageSize = 10) => axio('/supplierorder/selectByExamples',{supplytype,sname,mantelephone,pageNum,pageSize});

/**
 * 查询列表
 */

export const queryGoodsList = (pname, proid, pageNum = '1', pageSize = '10') => axio('/productmanager/selectByExamples',{pname, proid, pageNum, pageSize});

/**
 * 查询用户列表
 */

export const queryUserList = (pageNum = 1,pageSize = 10) => axio('/user/findAllUser',{pageNum,pageSize});

/**
 * 更新用户信息
 */

export const updateUser = (uid, upassword) => axio('/user/updateUser', {uid, upassword});

/**
 * 查询角色列表
 */

export const getRoleAll = () => axio('/user/addUserOnload');

/**
 * 添加用户
 */

export const addUserInfo = (roleid, urole, account, repositoryid, uname, upassword) => axio('/user/addUser', {roleid, urole, account, repositoryid, uname, upassword});

/**
 * 查询页面列表
 */

export const getViewsAll = () => axio('/maprolehtml/findAllHtml');

/**
 * 查询角色对应的页面列表
 */

export const getUserView = (roleid) => axio('/maprolehtml/findHtmlInRole/' + roleid);

/**
 * 查询角色对应的页面列表
 */

export const addRole = (rolename) => axio('/RoleManage/addRole', {rolename});


/**
 * 查询父类分组列表
 */

export const getGroupAll = () => axio('/group/findAllGroups');

/**
 * 查询子类分组列表
 */

export const getChildGroupAll = (saleid ,pageNum = 1, pageSize = 10) => axio('/group/findChildrenGroupBysaleid' , {saleid, pageNum, pageSize});

/**
 * 查询所有仓库
 */

export const getRepoAll = () => axio('/user/findrepositorymanagerb');

/**
 * 查询所有仓库
 */

export const getVirtualRepoAll = (pageNum = 1, pageSize = 10) => axio('/virtualrepomanager/selectAllRepositoryInUse',{pageNum,pageSize});

/**
 * 添加父类组
 */

export const addGroup = (roleid,salegroupname) => axio('/group/insertGroup',{roleid,salegroupname});

/**
 * 添加子类组
 */

export const addChildGroup = (salegroupname,fid,roleid,categorycode) => axio('/group/insertChildrenGroup',{salegroupname, fid, roleid, categorycode});

/**
 * 查询所有商品分类
 */

export const getCateAll = () => axio('/group/selectCategroy');

/**
 * 批量添加页面绑定
 */

export const bindHtml = (roleID,hIDs) => axio('/maprolehtml/bandSomeHtml',{roleID,hIDs});

/**
 * 查询组内所有用户
 */

export const getGroupUser = (saleid) => axio('/group/queryUserInGroup',{saleid});

/**
 * 批量添加用户
 */

export const bindUser = (saleid,uids) => axio('/mappingGroupUser/bandSomeUserswithAGroup',{saleid,uids});

/**
 * B库-查询采购单列表
 */

export const getPuschaseOrderB = (orderno,createtime,buydepartmentid,repositorysource,pageNum = 1,pageSize = 10, repositoryid = repoId) => axio('/repositoryb/queryNeedOfBuyb',{orderno,createtime,buydepartmentid,repositorysource,pageNum,pageSize, repositoryid});

/**
 * B库-查询分库列表
 */

export const getRepoBranch = (pageNum = 1,pageSize = 10, repositoryid = repoId) => axio('/repositoryb/getBranREpob',{pageNum,pageSize,repositoryid});

/**
 * B库-新增分库
 */
export const IncreasePool = (repocode, reponame, id, isDefault, repostate, repositoryid = repoId) => axio('/repositoryb/addBranRepo',{repocode, reponame, id, isDefault, repostate ,repositoryid});

/**
 * 删除B库-分库
 */

export const deleteLibrary = (repocode, repositoryid = repoId) => axio('/repositoryb/delBranRepo', {repocode,repositoryid});

/**
 * B库-添加采购单
 */

export const addPurchaseOrderB = (pname, productcode, buynumber, protype, pronuite, supplierid, repositoryid = repoId, username = unames) => axio('/repositoryb/addSummaryordera',{pname, productcode, buynumber, protype, pronuite, supplierid, repositoryid,username});

/**
 * 货品分类-添加父分类
 */

export const addFatherCate = categoryname => axio('/productCategory/creatParent',{categoryname}, 'POST');

/**
 * 货品分类-添加子分类
 */

export const addChildCate = (categoryname,parentcategoryname,pid) => axio('/productCategory/creatChild',{categoryname,parentcategoryname,pid}, 'POST');

/**
 * 按照仓库筛选未出库商品
 */

export const getAddPurchase = respositysource => axio('/outputordera/summary',{respositysource});

/**
 * 确认出库
 */

export const makeStockOut = (respositysource) => axio('/outputordera/insertOutput',{respositysource});

/**
 * 新增入库单
 */

export const makeStockIn = (ordercode, visualreposity, storagename, goodscode, storageproducttype, prostandered, prounite, grossweight, tare, perprice, totalmoney, netweight, supplierid, prostandared, ordernumber, storagetype = 'A库入库') => axio('/storageordera/insertStorageordera',{ordercode, visualreposity, storagename, goodscode, storageproducttype, prostandered, prounite, grossweight, tare, perprice, totalmoney, netweight, supplierid, prostandared, ordernumber, storagetype});

/**
 * 完善入库单信息
 */

export const makePurchase = (ordercode,supplierid,salesmanname,buydepartment,buyfare,moneyamount,allowance) => axio('/purchaseordera/updateByOrderCode',{ordercode,supplierid,salesmanname,buydepartment,buyfare,moneyamount,allowance});

/**
 * 完善入库单信息
 */

export const insertVirtualRepo = (reponame, protype) => axio('/virtualrepomanager/insertvirtualrepo', {reponame, protype});

/**
 * A库-查询库存余额
 */

export const queryBalanceB = (repocode,proname,pageNum = 1,pageSize = 10) => axio('/abalancerepository/selectAbalanceByExamples',{repocode,proname,pageNum,pageSize});

/**
 * B库-查询盘点列表
 */

export const getInventory_b = (pageNum = 1,pageSize = 10, repositoryid = repoId) => axio('/tinspect/queryTInspectAll',{pageNum,pageSize,repositoryid});

/**
 * B库-条件查询盘点
 */

export const getInventoryChild_b = (startTime, endTime, pageNum = 1, pageSize = 10, repositoryid = repoId) => axio('/tinspect/queryTInspectByParam',{startTime, endTime, pageNum, pageSize, repositoryid});

/**
 * B库-未盘点
 */

export const queryTInspectByParam_b = (state, pageNum = 1, pageSize = 10, repositoryid = repoId) => axio('/tinspect/queryTInspectByParam2',{state, pageNum, pageSize, repositoryid});

/**
 * B库-查询盘点详情列表
 */

export const getInventoryDetails_b = (checkid, pageNum = 1,pageSize = 10, repositoryid = repoId) => axio('/tinspect/queryTInspectbyCheckid',{checkid,pageNum,pageSize,repositoryid});

/**
 * B库-查询新增盘点列表
 */

export const getinventoryadd_b = (pageNum = 1,pageSize = 10, repositoryid = repoId, username = unames) => axio('/tinspect/find',{pageNum,pageSize,repositoryid,username});

/**
 * B库-查询新增盘点--商品分类
 */
export const getclassification_b = () => axio('/tinspect/getAllCategoryname');

/**
 * B库-条件查询盘点新增
 */

export const queryInventoryAdded_b = (proname, goodstype, pageNum = 1,pageSize = 10, repositoryid = repoId) => axio('/tinspect/queryStoragetableb',{proname, goodstype, pageNum,pageSize,repositoryid});

/**
 * B库-盘点新增--待盘点
 */

export const getinventoryPreservation_b = (bpid, repositoryid = repoId, username = unames) => axio('/tinspect/addInspects',{bpid,repositoryid, username});

/**
 * B库-盘点详情--确认盘点
 */

export const getconfirmationInventory_b = (checkdtailId, infactCount, repositoryid = repoId, username = unames) => axio('/tinspect/createTInspect',{checkdtailId, infactCount, repositoryid, username});

/**
 * B库-盘点详情--修改实际数量
 */

export const getupdateTInspect_b = (checkdtailid, losscount, overagecount, accountcount, infactCount, repositoryid = repoId, username = unames) => axio('/tinspect/updateTInspect',{checkdtailid, losscount, overagecount, accountcount, infactCount,repositoryid, username});

/**
 * B库-调拨单 获取调拨单
 */

export const getallocation_b = (pageNum = 1,pageSize = 10, repositoryid = repoId) => axio('/switch/getAllSwitch',{pageNum,pageSize,repositoryid});

/**
 * B库-调拨单 按条件查询调拨单
 */

export const getByPname_b = (pname, pageNum = 1, pageSize = 10, repositoryid = repoId) => axio('/switch/getByPname',{pname, pageNum, pageSize,repositoryid});

/**
 * B库-调拨单 查询调拨单详情
 */

export const getallotmentSheetDetails_b = (allocateid, pageNum = 1,pageSize = 10, repositoryid = repoId) => axio('/switch/getInDetail',{allocateid,pageNum,pageSize,repositoryid});

/**
 * B库-调拨单 新增调拨单
 */

export const getaddAllocate_b = (pname, proid, prostandard, ponunite, inrepocde, switchtype, allocatecount, inreponame, repositoryid = repoId, username = unames) => axio('/switch/insertOne',{pname, proid, prostandard, ponunite, inrepocde, switchtype, allocatecount, inreponame, repositoryid, username});

/**
 * B库 查询仓库
 */
export const getWarehouse_b = () => axio('/switch/getAllRepoName');

/**
 * B库 获取新增调拨单商品
 */

export const queryWarehouse_b = (pageNum = 1,pageSize = 10, repositoryid = repoId, username = unames) => axio('/switch/queryDaiSee',{pageNum,pageSize, repositoryid, username});

/**
 * B库 新增调拨单 生成调拨单
 */

export const getupdateTswitch_b = (list, repositoryid = repoId, username = unames) => axio('/switch/updateTswitch',{list, repositoryid, username},'POST');

/**
 * B库-调入调拨单 获取调入调拨单
 */

export const getransferBill_b = (pageNum = 1,pageSize = 10, repositoryid = repoId) => axio('/switch/toThisRepo',{pageNum,pageSize,repositoryid});

/**
 * B库-调入调拨单 按条件查询调拨单
 */

export const getByOutPname_b = (pname, pageNum = 1, pageSize = 10, repositoryid = repoId) => axio('/switch/getByOutPname',{pname, pageNum, pageSize,repositoryid});

/**
 * B库-调入调拨单 查询仓库
 */
export const getoutWarehouse_b = (repositoryid = repoId) => axio('/switch/getByOutPname',{repositoryid});

/**
 * B库 调入调拨单详情 报损
 */
export const addloss_b = (allocatedetailid, wastecount, repositoryid = repoId) => axio('/switch/commitWaste',{allocatedetailid, wastecount, repositoryid},'POST');

/**
 * B库 调入调拨单详情 确认调拨单
 */

export const getconfirmationSlip_b = (list, repositoryid = repoId, username = unames) => axio('/switch/confirmSwitch',{list, repositoryid, username},'POST');




/**
 * A库-查询包装管理列表
 */

export const getPacking_a = (pageNum = 1,pageSize = 10) => axio('/packagemanager/findAll',{pageNum,pageSize});

/**
 * A库-添加品类
 */

export const addcategory_a = (packid,packagename,prostandard,packcount,prounite) => axio('/packagemanager/insertpackage',{packid,packagename,prostandard,packcount,prounite});

/**
 * A库-删除品类
 */

export const deleteCategory_a = (packid) => axio('/packagemanager/deletepackage',{packid});

/**
 * A库-修改品类
 */

export const modifycategory_a = (packid,packagename,prostandard,packcount,prounite) => axio('/packagemanager/updatepackage',{packid,packagename,prostandard,packcount,prounite});

/**
 * A库-扣减品类数量
 */

export const numberdeduction_a = (packid,packCount,useCount) => axio('/packagemanager/usepackage',{packid,packCount,useCount});

/**
 * A库-增加品类数量
 */

export const numberadd_a = (packid,packcount,addcount) => axio('/packagemanager/addpackage',{packid,packcount,addcount});

/**
 * A库-入库单--》加工损耗
 */

export const addStockInaA = (goodscode,storgeaid,storagename,visualreposity,netweight,prounite,perprice,totalmoney,prostandered,ordertime,storagetype,supplierid,remarkable,workwastecount) => axio('/storageordera/workwastecount',{goodscode,storgeaid,storagename,visualreposity,netweight,prounite,perprice,totalmoney,prostandered,ordertime,storagetype,supplierid,remarkable,workwastecount});

/**
 * A库-查询盘点列表
 */

export const getInventory_a = (pageNum = 1,pageSize = 10, repositoryposition = repoId) => axio('/inspecta/querycheckHand',{pageNum,pageSize,repositoryposition});

/**
 * A库-条件查询盘点
 */

export const getInventoryChild_a = (starttime, endtime, pageNum = 1, pageSize = 10, repositoryposition = repoId) => axio('/inspecta/selectbetweenstarttimeandendtime',{starttime, endtime, pageNum, pageSize, repositoryposition});

/**
 * A库- 未盘点
 */

export const getselectbetweenstart_a = (state, pageNum = 1, pageSize = 10, repositoryposition = repoId) => axio('/inspecta/selectbetweenstarttimeandendtime2',{state, pageNum, pageSize, repositoryposition});

/**
 * A库-查询新增盘点--仓库
 */
export const getclassification_a = () => axio('/inspecta/getAllCategoryname');

/**
 * A库-查询新增盘点列表
 */

export const getinventoryadd_a = (pageNum = 1, pageSize = 10, repositoryposition = repoId) => axio('/inspecta/find',{pageNum, pageSize, repositoryposition});

/**
 * A库-条件查询盘点新增
 */

export const queryInventoryAdded_a = (proname, goodstype, pageNum = 1, pageSize = 10, repositoryposition = repoId) => axio('/inspecta/queryAbalancerepositoryByParam',{proname, goodstype, pageNum, pageSize, repositoryposition});

/**
 * A库-盘点新增--待盘点
 */

export const getinventoryPreservation_a = (repocode, repositoryposition = repoId, username = unames) => axio('/tinspect/addInspects',{repocode,repositoryposition, username});

/**
 * A库-查询盘点详情列表
 */

export const getInventoryDetails_a = (checkid, pageNum = 1,pageSize = 10) => axio('/inspecta/checkdetailsBycheckid',{checkid,pageNum,pageSize});

/**
 * A库-盘点详情--确认盘点
 */

export const getconfirmationInventory_a = (checkdtailId, infactCount) => axio('/inspecta/createTInspect',{checkdtailId, infactCount});

/**
 * A库-盘点详情--修改实际数量
 */

export const getupdateTInspect_a = (checkdtailid, losscount, overagecount, accountcount, infactCount, repositoryposition = repoId, username = unames) => axio('/inspecta/updateTInspect',{checkdtailid, losscount, overagecount, accountcount, infactCount,repositoryposition, username});

/**
 * A库 盘点-导出EXCEL
 */

export const getExcleByTInspect_a = (checkid) => axio('/inspecta/ExcleByTInspect', {checkid});

/**
 * A库-删除虚拟库
 */

export const deletevirtualLibrary_a = (repcode) => axio('/virtualrepomanager/deleteRepository', {repcode});

/**
 * A库供应商管理-禁用供应商
 */

export const transmitDisable = (Supplierid) => axio('/supplierorder/deleteSupplierorder', {Supplierid});

/**
 * A库供应商管理-启用供应商
 */

export const transmitEnable = (Supplierid, isDelete = 0) => axio('/supplierorder/updateSupById', {Supplierid, isDelete});

/**
 * A库出库单-无法出库商品
 */

export const getunable = (respositysource, pageNum = 1,pageSize = 10) => axio('/outputordera/summarycannotout', {respositysource, pageNum,pageSize});

/**
 * A库采购单 获取商品分类
 */

export const getclassification = () => axio('/productCategory/findAll');

/**
 * A库采购单-查询未完成
 */

export const getcommodity = (storagename, storagetype, pageNum = 1,pageSize = 10) => axio('/purchaseordera/selectnotcreatebyexamples', {storagename, storagetype, pageNum,pageSize});

/**
 * A库采购单-导出EXCEL
 */

export const getexport = (storagename, storagetype) => axio('/purchaseordera/exportExcel', {storagename, storagetype});


/**
 * B库 盘点-导出EXCEL
 */

export const getExcleByTInspect = (checkid) => axio('/tinspect/ExcleByTInspect', {checkid});


/**
 * B库-包装管理加载列表
 */

export const getPacking_b = (pageNum = 1,pageSize = 10, repositoryid = repoId) => axio('/package/findAll',{pageNum,pageSize, repositoryid});

/**
 * B库-添加品类
 */

export const addcategory_b = (packid,packagename,prostandard,packcount,prounite, repositoryid = repoId) => axio('/package/addPackageInfo',{packid,packagename,prostandard,packcount,prounite, repositoryid});

/**
 * B库-删除品类
 */

export const deleteCategory_b = (packid, repositoryid = repoId) => axio('/package/delPackage',{packid, repositoryid});

/**
 * B库-修改品类
 */

export const modifycategory_b = (packid,packagename,prostandard,packcount,prounite, repositoryid = repoId) => axio('/package/updatePackage',{packid,packagename,prostandard,packcount,prounite, repositoryid});

/**
 * B库-扣减品类数量
 */

export const numberdeduction_b = (packid,packCount,useCount, repositoryid = repoId) => axio('/package/usepackage',{packid,packCount,useCount, repositoryid});

/**
 * B库-增加品类数量
 */

export const numberadd_b = (packid,packcount,addcount, repositoryid = repoId) => axio('/package/addPackage',{packid,packcount,addcount, repositoryid});

/**
 * B库-分库管理 查询所有所属区域id
 */

export const getregion = () => axio('/repositoryb/getAllFieldName');


/**
 * B库采购单管理 待修改采购单
 */

export const getPendingModification = (pageNum = 1,pageSize = 10, repositoryid = repoId) => axio('/repositoryb/queryAllExamine',{pageNum,pageSize, repositoryid});

/**
 * B库采购单管理 修改采购数量
 */

export const getmodifyPurchasing_b = (orderno, productcode, buynumber, repositoryid = repoId) => axio('/repositoryb/examineb',{orderno, productcode, buynumber, repositoryid});

/**
 * B库库存余额表 查询库存大于零
 */

export const queryGreater_b = (pageNum = 1,pageSize = 10, repositoryid = repoId) => axio('/repositoryb/getGeratThenZero',{pageNum,pageSize, repositoryid});

/**
 * A库出库单 审批修改
 */

export const gethandleEdit = (orderno, productcode, repositoryid = repoId) => axio('/repositoryb/examine',{orderno, productcode, repositoryid});

/**
 * A库库存余额表 查询库存大于零
 */

export const queryGreater_a = (pageNum = 1,pageSize = 10) => axio('/abalancerepository/selectcurrentexistnotnull',{pageNum,pageSize});

/**
 * 生产执行/生产线管理 获取生产线
 */

export const getProduction = (pageNum = 1,pageSize = 10) => axio('/RepPipelineController/findAll',{pageNum,pageSize});

/**
 * 生产执行/生产线管理 获取仓库
 */

export const getWarehouse = () => axio('/RepPipelineController/findAllrepository');

/**
 * 生产执行/生产线管理 添加生产线
 */

export const addProduction = (repcode, pipeline, holenum, prioritylevel, isenable, maxnum) => axio('/RepPipelineController/addPipline',{repcode, pipeline, holenum, prioritylevel, isenable, maxnum},'POST');

/**
 * 生产执行/生产线管理 修改生产线
 */

export const modifyProduction = (id, repcode, pipeline, holenum, prioritylevel, isenable, maxnum) => axio('/RepPipelineController/modifyPipline',{id, repcode, pipeline, holenum, prioritylevel, isenable, maxnum},'POST');

/**
 * 生产执行/生产线管理 删除生产线
 */

export const DeleteProduction = (piplineId, pageNum = 1,pageSize = 10) => axio('/RepPipelineController/deletePipLine',{piplineId, pageNum,pageSize},'DELETE');



