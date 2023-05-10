// pages/customer/index/index.js
import {
  seachWxUserInfo
} from '../../../api/userinfo' //查询用户信息

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: false,
    vip_admin: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  info() {
    if (this.data.vip_admin) {
      wx.navigateTo({
        url: '/pages/passenger/info/info',
      })
    } else {
      app.registerModal()
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.init(options)
  },
  // 用户授权获取头像信息
  handleAccredit(e) {
    this.init()
  },
  init() {
    //父组件获取子组件对象方法,根据样式获取，建议使用selectAllComponents
    this.logo = this.selectComponent(".logo");
    //判断缓存中有没有授权信息，如果没有就显示弹窗，有就直接隐藏弹窗
    seachWxUserInfo().then(res => {
      if (res.code == '0') {
        if (res.data.vip_admin) {
          app.globalData.openid = res.data.vip.wxOpenid
        } else {
          // this.logo.showDialog();//调用子组件的方法
        }
        app.globalData.vip_admin = res.data.vip_admin
        this.setData({
          vip_admin: res.data.vip_admin
        })
      } else {

      }
    })
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