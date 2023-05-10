const request = getApp().request

// 个人信息 /vip/info/{id}   get
export function mineInfo(params) {
  return request({
    url: '/vip/info/' + params,
    method: 'get',
  })
}
// 修改个人信息 /vip/info/    put
export function updateInfo(params) {
  return request({
    url: '/vip/info/',
    method: 'put',
    data: params
  })
}
// /vip/reservation/visitant  get  我的行程
export function TripInfo(params) {
  return request({
    url: '/vip/reservation/visitant',
    method: 'get',
    data: params
  })
}
// /reservation/revoke/reservationRevokeList 我的行程-撤销列表
export function reservationRevokeList(data) {
  return request({
    url: '/reservation/revoke/reservationRevokeList',
    method: 'post',
    data: data
  })
}
// /vip/reservation/passenger/journey/{reservationId}   get
// 行程详细信息
export function tripDetail(params) {
  return request({
    url: '/vip/reservation/passenger/journey/' + params,
    method: 'get'
  })
}
// 二维码获取
export function qrcode(params) {
  return request({
    url: '/vip/reservation/qrcode/' + params,
    method: 'get'
  })
}
// 已完成行程评价
// /vip/comment/   post 评价新增
export function evaluate(params) {
  return request({
    url: '/vip/comment/',
    method: 'post',
    data: params
  })
}
// /vip/reservation/revoke/{id}  撤销行程
export function revoke(params) {
  return request({
    url: '/vip/reservation/revoke/',
    method: 'post',
    data: params
  })
}
// /vip/reservation/cancel/{id}  取消预约
export function cancel(params) {
  return request({
    url: '/vip/reservation/cancel/' + params,
    method: 'post'
  })
}

//工作人员-查看预约信息
export function apponitInfo(params) {
  return request({
    url: '/vip/reservation/list',
    method: 'get',
    data: params
  })
}
// /coupon/info/visitant  get  查询优惠券
export function vipTicketList() {
  return request({
    url: '/coupon/info/visitant',
    method: 'get',
  })
}
// POST   /server/suggestions    投诉建议新增
export function addSuggestion(data) {
  return request({
    url: '/server/suggestions',
    method: 'post',
    data: data
  })
}