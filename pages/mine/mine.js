// pages/mine/mine.js
import {
  seachWxUserInfo
} from '../../api/userinfo'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    show: false,
    info: {},
    isLogin: false,
    form: {},
    user: {},
    vip_admin: null,
    gh_admin: null, //true 工行工作人员
    gt_common: null, //true 高铁工作人员
    jc_common: null, //true 机场工作人员
    money: '****',
    moneyShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.logo = this.selectComponent(".logo");
    //  this.logo.showDialog();//调用子组件的方法
    // this.setData({
    //   vip_admin:app.globalData.prem.some(item => {
    //     return  item =='service:repair:list'
    //   })
    // })
    this.setData({
      vip_admin: app.globalData.vip_admin,
    })
  },

  init() {
    if (app.globalData.vip_admin) {}else{
      app.registerModal()
      return
    }
    seachWxUserInfo().then(res => {
      let that = this
      if (res.code == 200) {
        this.setData({
          isLogin: true,
          vip_admin: res.data.vip_admin,
          gh_admin: res.data.gh_admin,
          gt_common: res.data.gt_common,
          jc_common: res.data.jc_common,
        })
        if (res.data.vip_admin) {
          app.globalData.openid = res.data.vip.wxOpenid
          app.globalData.userInfo = res.data.vip
          this.setData({
            userInfo: res.data.vip,
          })
        }
        app.globalData.oneAudit = res.data.oneAudit
        app.globalData.twoAudit = res.data.twoAudit
        app.globalData.vip_admin = res.data.vip_admin
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    // this.init()
  },
  // 用户授权获取头像信息
  handleAccredit(e) {
    this.init()
  },

  // 我的信息
  myInfo() {
    // if (this.data.vip_admin) {
    wx.navigateTo({
      url: '/pages/mine/myInfo/myInfo',
    })
    // } else {
    //   app.registerModal()
    // }

  },
  // 我的行程
  myTrips() {
    // if (this.data.vip_admin) {
    wx.navigateTo({
      url: '/pages/mine/myTrips/myTrips',
    })
    // } else {
    // app.registerModal()
    // }

  },
  // 行内人员通道
  instaffIn() {
    wx.navigateTo({
      url: '/pages/inStaff/index/index',
    })
  },
  // 高铁、机场人员通道
  workerIn() {
    wx.navigateTo({
      url: '/pages/worker/index/index',
    })
  },
  // 我的券
  vipTicker() {
    // if (this.data.vip_admin) {
    wx.navigateTo({
      url: '/pages/passenger/vipTickets/vipTickets',
    })
    // } else {
    //   app.registerModal()
    // }
  },
  // 投诉
  complaint() {
    wx.navigateTo({
      url: '/pages/mine/complaint/complaint',
    })
  }
})