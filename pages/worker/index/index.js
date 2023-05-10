// pages/worker/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 扫码核销
  scanCode() {
    wx.navigateTo({
      url: '/pages/worker/scanCode/scanCode',
    })
  },
  // 身份证核销
  idCard() {
    wx.navigateTo({
      url: '/pages/worker/idCard/idCard',
    })
  },
  // 券码核销
  couponCode() {
    wx.navigateTo({
      url: '/pages/worker/coupon/coupon',
    })
  },

   // 预约信息
   appointInfo() {
    wx.navigateTo({
      url: '/pages/passenger/appointmentInfo/appointmentinfo',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})