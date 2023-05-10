// pages/mine/myTrips/tripInfo/tripInfo.js
import {
  vipReservationId
} from '../../../../api/appointment'
import { tripDetail} from '../../../../api/mine'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 新增显示
    reservationId: null,
    list: [],
    couponInfos: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options,'options');
    if (options) {
      this.setData({
        reservationId: options.id,
      })
    }
    vipReservationId(this.data.reservationId).then(res=>{
      if (res.code == 200) {
        this.setData({
          list:res.data
        })
      } else{
        app.showModalMsg(res.msg)
      }
      
    })
    tripDetail(this.data.reservationId).then(res=>{
      if (res.code == 200) {
        res.data.forEach(item => {
          item.tpassengerInfo.name = app.filters.name(item.tpassengerInfo.name)
          item.tpassengerInfo.tel = app.filters.phone(item.tpassengerInfo.tel)
          item.tpassengerInfo.idCard = app.filters.idCard(item.tpassengerInfo.idCard)
        })
        this.setData({
          couponInfos:res.data
        })
      } else{
        app.showModalMsg(res.msg)
      }
    })
  },
  // 页面初始数据
  init() {
    
  },
  // 新增同行人
  // flag：1：新增同行人  2：行内-新增贵宾 3:行内-新增同行人
  handleAdd() {
    wx.navigateTo({
      url: '/pages/passenger/info/peers/peers?flag=' + 1
    })
  },
  delete(e) {
    // console.log(e.currentTarget.dataset.value, 'delete');
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
    this.init()
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