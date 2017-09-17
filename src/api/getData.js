import fetch from '@/config/fetch'
import axio from '@/config/axio'
import yichu from '@/config/yichu'

/**
 * 登陆
 */

export const login = data => axio('/user/login', data, 'POST');

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
 * 根据id获取BOM组
 */

export const getBomGroup = procode => axio('/Bom/queryOneGroup/' + procode);

/**
 * 根据name模糊查询商品列表
 */

export const getProList = (proName) => axio('/Bom/queryProductByName',{proName})

/**
 * 根据id获取BOM组
 */

export const getBomDetail = procode => axio('/Bom/findSingleBom/' + procode);

/**
 * 插入Bom父节点
 */

export const insertParentBom = (proname, prostandard, prounite) => axio('/Bom/createParentBom', {proname, prostandard, prounite}, 'POST');

/**
 * 插入Bom父节点
 */

export const insertChildBom = (proname, prostandard, prounite, proid, pid, count) => axio('/Bom/createChildBom', {proname, prostandard, prounite, proid, pid, count}, 'POST');

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

export const getStockOutDetailsDetail = data => axio('/Outputorderb/queryOutPutDetail/' + data);

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

export const deleteCategory = data => axio('/productCategory/deleteById/' + data);

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
 * 获取入库单详情
 */

export const getStockInDetails = bpid => axio('/repositoryb/selectTinstoragebByCondition' , {bpid});

/**
 * 获取入库清单列表
 */

export const getStockInListAll = (pageNum = 1, pageSize = 10) => axio('/innetstorageb/getTotal',{pageNum, pageSize});

/**
 * 获取入库清淡详情
 */

export const getStockInListDetails = orderid => axio('/innetstorageb/get/'+ orderid );

/**
 * 查询入库清单
 */

export const queryStockInList = (orderid, ordertime, orderofcreatehuman, defaultrepository, marklogo, buyhuman, buytype, buydepartment, pageNum = 1, pageSize = 10) => axio('/innetstorageb/get/',{orderid, ordertime, orderofcreatehuman, defaultrepository, marklogo, buyhuman, buytype, buydepartment, pageNum, pageSize});

/**
 * 获取运输损耗列表
 */

export const getTransportWasteAll = (pageNum = 1, pageSize = 10) => axio('/bTWastageordera/getTotal',{pageNum, pageSize});

/**
 * 新增运输损耗
 */

export const addTransportWasteAll = (procount, productcount, procode, ordercode, customer, proname, prostandard, prounite, pageNum = '1', pageSize = '10') => axio('/bTWastageordera/addWeastorder', {procount, productcount, procode, ordercode, customer, proname, prostandard, prounite} );

/**
 * 查询运输损耗清单
 */

export const queryTransportWasteList = (procode, pname, wasteproductcode, createhuman, reporttime, pageNum = 1, pageSize = 10) => axio('/bTWastageordera/getCondition',{ procode, pname, wasteproductcode, createhuman, reporttime, pageNum , pageSize});

/**
 * 获取采购单（A库）列表
 */

export const getPurchaseOrderAll = (pageNum = 1, pageSize = 10) => axio('/purchaseordera/selectTodaysData',{pageNum, pageSize});

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
 * 获取货品列表
 */

export const addGoods = (proid,pname,prostandered,commodityattribute,factories,brand,supplierid,referenceinprice,createman) => axio('/productmanager/insertProduct',{proid,pname,prostandered,commodityattribute,factories,brand,supplierid,referenceinprice,createman});

/**
 * 获取入库单列表
 */

export const getStockInaAll = (pageNum = 1, pageSize = 10) => axio('/storageordera/findAllData',{pageNum, pageSize});

/**
 * 获取库存余额列表 -A库
 */

export const getStockBalanceaAll = (pageNum = 1, pageSize = 10) => axio('/abalancerepository/selectAllDatas',{pageNum, pageSize});

/**
 * 获取库存余额列表 -B库
 */

export const getStockBalancebAll = (pageNum = 1, pageSize = 10) => axio('/repositoryb/getStoragebAblance',{pageNum, pageSize});

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

export const queryStockOutA= (ordercode, ordertime, customer, pageNum = 1, pageSize = 10) => axio('/outputordera/findByExamples',{ordercode, ordertime, customer, pageNum, pageSize});

/**
 * 查询B库入库单
 */

export const queryStockIn= (ordercode, ordertime, pageNum = 1, pageSize = 10) => axio('/repositoryb/selectTinstoragebByCondition',{ordercode, ordertime, pageNum, pageSize});


/**
 * 查询采购单列表
 */

export const queryPurchaseOrderList = (salesmanname, createtime, ordercode, supplierid, pageNum = 1, pageSize = 10) => axio('/purchaseordera/selectByPurchseordernumber',{salesmanname, createtime, ordercode, supplierid, salesmanname, createtime, ordercode, supplierid, pageNum, pageSize});

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

export const makePurchaseOrder = (pname, productcode, buynumber, aexistamount, advisebuynumber) => axio('/purchasesummaryordera/updateIsCreatre',{pname, productcode, buynumber, aexistamount, advisebuynumber});

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

export const queryGoodsList = (pname, prostandered, procode, helpcode, commodityattribute, factories, brand, barcode, placeoforigin, pageNum = '1', pageSize = '10') => axio('/productmanager/selectByExamples',{pname, prostandered, procode, helpcode, commodityattribute, factories, brand, barcode, placeoforigin, pageNum, pageSize});

/**
 * 查询用户列表
 */

export const queryUserList = () => axio('/user/findAllUser');

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

export const getChildGroupAll = (saleid) => axio('/group/findChildrenGroupBysaleid' , {saleid});

/**
 * 查询所有仓库
 */

export const getRepoAll = () => axio('/user/findrepositorymanagerb');

/**
 * 查询所有仓库
 */

export const getVirtualRepoAll = (pageNum = 1, pageSize = 10) => axio('/virtualrepomanager/selectAllRepositoryInUse');

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

export const getPuschaseOrderB = (pageNum = 1,pageSize = 10) => axio('/repositoryb/queryNeedOfBuyb',{pageNum,pageSize});

/**
 * B库-添加采购单
 */

export const addPurchaseOrderB = (pname, productcode, producttype, buydepartmentid, buyer, buyunite, productionstandard, respositysource, buynumber) => axio('/repositoryb/addSummaryordera',{pname, productcode, producttype, buydepartmentid, buyer, buyunite, productionstandard, respositysource, buynumber});

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

export const makeStockIn = (ordercode, visualreposity, storagename, goodscode, storageproducttype, prostandered, prounite, pronumber, perprice, totalmoney, netweight, storagetype = 'A库入库') => axio('/storageordera/insertStorageordera',{ordercode, visualreposity, storagename, goodscode, storageproducttype, prostandered, prounite, pronumber, perprice, totalmoney, netweight, storagetype});

/**
 * 完善入库单信息
 */

export const makePurchase = (ordercode, supplierid, salesmanname, buydepartment, buyfare, moneyamount, allowance) => axio('/purchaseordera/updateByOrderCode',{ordercode, supplierid, salesmanname, buydepartment, buyfare, moneyamount, allowance});
