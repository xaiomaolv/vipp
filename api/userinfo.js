const request = getApp().request

//POST /property/wxUserInfo/ 保存微信用户信息
export function saveWxUserInfo(params) {
  return request({
    url: '/wxUserInfo/',
    method: 'post',
    data: params
  })
}
// DELETE /property/wxUserInfo/ 删除微信用户信息
export function delWxUserInfo(params) {
  return request({
    url: '/wxUserInfo/',
    method: 'DELETE'
  })
}
// GET /property/wxUserInfo/ 查询微信用户信息
export function seachWxUserInfo(params) {
  return request({
    url: '/wxUserInfo/',
    method: 'GET'
  })
}
// /vip/rights/query 权益信息
export function rightsInfo(params) {
  return request({
    url: '/vip/rights/query',
    method: 'GET'
  })
}
// /vip/rights/query 代理预约-权益信息
export function instaffRightsInfo(params) {
  return request({
    url: '/vip/rights/query/' + params,
    method: 'GET'
  })
}
// 优惠券-一使用权益信息
export function usageRecord(params) {
  return request({
    url: '/vip/rights/usageRecord',
    method: 'GET',
    data: params
  })
}