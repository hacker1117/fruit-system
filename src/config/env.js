/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 * 
 */
let baseUrl = ''; 
let routerMode = 'history';
let baseImgPath = 'http://images.cangdu.org/';
let basicUrl = 'http://47.95.12.49:8084/echuxianshengshop'

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://47.95.12.49:9001';
}else{
	baseUrl = 'http://47.95.12.49:9001';
}

export {
	baseUrl,
	routerMode,
	baseImgPath,
	basicUrl
}