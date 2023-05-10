//app.js
import locales from './i18n/i18n'
import {
  initPage,
  onPageLoad
} from './utils/page'
import request from './utils/request'
import util from './utils/util'

App({
  onLaunch: function () {
    // 获取语言
    const locale = wx.getStorageSync('locale')
    if (locale) {
      this.T = locales[locale]
    } else { // 默认语言为中文
      this.T = locales.zh
    }
    // 重构Page对象
    initPage(this)
  },
  // 设置语言
  setLocale(locale) {
    // 保存语言到本地存储，以后打开不需要重新设置
    wx.setStorageSync('locale', locale)
    this.T = locales[locale]
    // 重新设置title和T
    onPageLoad(this)
  },
  // 获取当前语言
  getLocale() {
    return wx.getStorageSync('locale') || 'zh'
  },
  // 挂载全局request，使用app.request 替代wx.request
  ...request,
  // 挂载全局工具类
  ...util,
  // api: [...api],
  // setToken(token) {
  //   wx.setStorageSync('token', token)
  // },
  // getToken() {
  //   return wx.getStorageSync('token')
  // },

  setCode(code) {
    wx.setStorageSync('code', code)
  },
  getCode() {
    return wx.getStorageSync('code')
  },
  // 是否开启logger
  loggerEnable: true,
  openid: null,
  globalData: {
    userInfo: null,
    appointmentInfo: null, //预约信息
    appointmentAduit: null, //行政预约信息
    openid: null,
    phoneNumber: null,
    roleName: null,
    phone: null,
    user_name: null,
    vipInfo: null, //贵宾信息
    oneAudit: null, //一级审核
    twoAudit: null, //二级审核
    vipId: null,
    vId: null,
    vip_admin: null, //false :未注册 true :贵宾
    gh_admin: null, //true 工行工作人员
    gt_common: null, //true 高铁工作人员
    jc_common: null, //true 机场工作人员
    isPlatinumCard: null, //是否是白金卡 Y：是 N：不是
    cardJudge: null, //权益列表
    // prem:['service:repair:list','cost:bills:list'], 
    mapKey: 'MpABadeAAeuGSPtPhhg303DAcVNEQH7x', // ejak: pvf34ZOLtbmScvCokIbBlvAGR4fRzHEI  icbcak: MpABadeAAeuGSPtPhhg303DAcVNEQH7x
  }
})

// api需要等待app初始化完成
getApp().api = require('./api/api').default