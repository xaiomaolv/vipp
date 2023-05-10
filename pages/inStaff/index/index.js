// pages/inStaff/index/index.js
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
  // 代理预约
  agentAppointment() {
    wx.navigateTo({
      url: '/pages/inStaff/peers/peers',
    })
  },
  // 行政预约
  administration(){
    wx.navigateTo({
      url: '/pages/inStaff/administration/administration',
    })
  },
  // 行政预约审核
  AuditList(){
    wx.navigateTo({
      url: '/pages/inStaff/appointmentAudit/appointmentAudit',
    })
  },
  // 贵宾新增
  // flag：1：新增同行人  2：新增贵宾
  vipAdd() {
    wx.navigateTo({
      url: '/pages/passenger/info/peers/peers?flag=' + 2
    })
  },
  // 贵宾信息
  passengerInfo() {
    wx.navigateTo({
      url: '/pages/inStaff/vipInfo/vipInfo',
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