const request = getApp().request

// /writeoff/coupon   优惠券券码核销   post   {reservationId:1,couponCode:"券码"}
export function writeoffCoupon(data) {
  return request({
    url: '/vip/reservation/writeoff/coupon',
    method: 'post',
    data: data
  })
}
// /writeoff/qrcode  post  {reservationId:1}  二维码核销
export function writeoffQrcode(data) {
  return request({
    url: '/vip/reservation/writeoff/qrcode',
    method: 'post',
    data: data
  })
}

// /writeoff/idcard  {reservationId:1, idcard:""}   身份证核销
export function writeoffIdcard(data) {
  return request({
    url: '/vip/reservation/writeoff/idcard',
    method: 'post',
    data: data
  })
}
