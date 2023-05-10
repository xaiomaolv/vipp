// 预约
const request = getApp().request
const whiteRequest = getApp().whiteRequest

// //POST /vip/reservation/ 行程详细信息
export function vipReservationId(params) {
  return request({
    url: '/vip/reservation/' + params,
    method: 'get'
  })
}

// /vip/info/passenger  get   无参数    获取贵宾及同乘人信息
export function passengerInfo() {
  return request({
    url: '/vip/info/passenger',
    method: 'get'
  })
}
// /vip/passenger/{ids} 删除乘客信息
export function deletePassenger(params) {
  return request({
    url: '/vip/passenger/' + params,
    method: 'delete',
  })
}

// /vip/passenger/vip   get  预约-乘客信息列表
export function vipPassengerInfo(params) {
  return request({
    url: '/vip/passenger/vip/' + params,
    method: 'get',
  })
}

// 贵宾-同乘人信息新增
// /vip/passenger/  post   {name:姓名,sex:性别,tel:电话,idCard:身份证号}  
export function addPassenger(params) {
  return request({
    url: '/vip/passenger/add',
    method: 'post',
    data: params
  })
}

// 站点字典
export function getDicts(params) {
  return request({
    url: '/site/dict/type',
    method: 'get',
    data: params
  })
}

// /vip/info/verification  get
// 贵宾信息确认
export function verificationVip(params) {
  return request({
    url: '/vip/info/verification',
    method: 'get',
    data: params
  })
}

// 贵宾信息新增
// /vip/info/  post
export function addVip(params) {
  return request({
    url: '/vip/info/',
    method: 'post',
    data: params
  })
}

//  行内-贵宾及同乘人信息-
// /vip/info/{id}  get
export function vipReservationInfo(params) {
  return request({
    url: '/vip/passenger/vip/' + params,
    method: 'get'
  })
}

// 行内-同乘人信息新增
// /vip/passenger/add/  post   {name:姓名,sex:性别,tel:电话,idCard:身份证号}  
export function addVipPassenger(params) {
  return request({
    url: '/vip/passenger/',
    method: 'post',
    data: params
  })
}
// 其他预约
// 行内-代预约 /vip/reservation/help  post  
export function reservationHelp(data) {
  return request({
    url: '/vip/reservation/help',
    method: 'post',
    data: data
  })
}

//行内- /vip/info/list  get  贵宾信息
// name   tel   idCard  三个条件筛选查询
export function vipInfoList(params) {
  return request({
    url: '/vip/info/list',
    method: 'get',
    data: params
  })
}
// 行内-行政预约
// /vip/reservation/administrative  行政预约
export function reservationAdmin(data) {
  return request({
    url: '/vip/reservation/administrative',
    method: 'post',
    data: data
  })
}
// /vip/reservation/auditList
// 查询预约审核信息列表
export function listAudit(params) {
  return request({
    url: '/vip/reservation/auditList',
    method: 'get',
    data: params
  })
}
// /vip/reservation/audit/one 一级审核
export function oneAudit(data) {
  return request({
    url: '/vip/reservation/audit/one',
    method: 'post',
    data: data
  })
}

// /vip/reservation/audit/two 二级审核
export function twoAudit(data) {
  return request({
    url: '/vip/reservation/audit/two',
    method: 'post',
    data: data
  })
}
// /wxUserInfo/advertise  获取广告列表
export function listAdvertise(params) {
  return whiteRequest({
    url: '/wxUserInfo/advertise',
    method: 'get',
    data: params
  })
}

