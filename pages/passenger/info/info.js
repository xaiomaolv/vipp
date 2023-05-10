// pages/passenger/info/info.js
import {
  passengerInfo, // 贵宾及同乘人信息
  addPassenger, //同行人新增
  reservationHelp, //工行人员代预约
  deletePassenger, //删除乘客
} from '../../../api/appointment'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 新增显示
    show: false,
    list: [],
    couponInfos: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {
      this.setData({
        show: options.show,
      })
    }
  },
  // 页面初始数据
  init() {
    if (app.globalData.vip_admin) {
      passengerInfo().then(res => {
        if (res.code == 200) {
          res.data.forEach(item => {
            item.name = app.filters.name(item.name)
            item.tel = app.filters.phone(item.tel)
            item.idCard = app.filters.idCard(item.idCard)
          })
          this.setData({
            couponInfos: [...res.data]
          })
        }
      })
    } else {
      app.registerModal()
    }
  },
  // 新增同行人
  // flag：1：新增同行人  2：行内-新增贵宾 3:行内-新增同行人
  handleAdd() {
    wx.navigateTo({
      url: '/pages/passenger/info/peers/peers?flag=' + 1
    })
  },
  delete(e){
    var that = this
    let item = e.currentTarget.dataset.value
    wx.showModal({
      title: '删除乘客',
      content: '是否确认删除？',
      showCancel: true,
      cancelText: '否',
      confirmText: '是',
      success(res) {
        if (res.confirm) {
          deletePassenger(item).then(res => {
            if (res.code == 200) {
              setTimeout(function () {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success'
                })
              }, 1000)
              that.init()
            } else {
              app.showModalMsg(res.msg)
            }            
          })
        }
      }
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