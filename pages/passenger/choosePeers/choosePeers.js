// pages/passenger/choosePeers/choosePeers.js
import {
  passengerInfo, // 贵宾信息
  vipPassengerInfo, // 同乘人信息
  addPassenger, //同行人新增
  reservationHelp, //工行人员代预约-其他预约
} from '../../../api/appointment'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipId: '',
    list: null,
    couponInfos: [],
    appointmentInfo: null,
    peopleNum: '', //人数
    checkArr: [], // 同乘人
    checkMine: [], // 本人
    isSelf: '', // 本人标志
    isPlatinum: false, //是否是白金卡
    checkedM: false,
    checkedC: false,
    cardJudge: {
      isBlackCard: true,
      isConsumptionReach: true,
      isAssetsReach: true,
      isWhitelist: true,
      selfSum: 0,
      bringPartnerSum: 0,
      bulletTrainSum: 0,
      airportSum: 0,
    }, //权益列表
    // isBlackCard ：是否为黑金卡用户
    // isConsumptionReach：是否白金卡年消费达标
    // isAssetsReach：是否上月资产100达标
    // isWhitelist：是否为白名单用户
    // self：仅限本人使用的权益券张数
    // bringPartnerSum：可携伴使用的权益券张数
    // bulletTrain：高铁消费劵张数
    // airport：机场消费劵张数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      appointmentInfo: app.globalData.appointmentInfo,
      cardJudge: app.globalData.cardJudge,
      vipId: app.globalData.vId
    })
  },
  // 页面初始数据
  init() {

    vipPassengerInfo(this.data.vipId).then(res => {
      if (res.code == 200) {
        var list = res.data
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
  },
  // 本人
  mineChange: function (e) {
    var that = this
    if (e.detail.value.length != 0) {
      if (that.data.cardJudge.isBlackCard || that.data.cardJudge.isConsumptionReach || that.data.cardJudge.isAssetsReach || that.data.cardJudge.isWhitelist) {
        this.setData({
          checkMine: e.detail.value, //单个选中的值
          ['appointmentInfo.isSelf']: 1
        })
        return
      }
      if (that.data.appointmentInfo.type == 0) {
        if (that.data.cardJudge.selfSum <= 0 && that.data.cardJudge.bringPartnerSum <= 0 && that.data.cardJudge.bulletTrainSum <= 0) {
          app.showModalMsg('当前您的本人权益券或高铁消费券不足!')
          that.setData({
            checkedM: false
          })
          return
        }
      }
      if (that.data.appointmentInfo.type == 1) {
        if (that.data.cardJudge.selfSum <= 0 && that.data.cardJudge.bringPartnerSum <= 0 && that.data.cardJudge.airportSum <= 0) {
          app.showModalMsg('当前您的本人权益券或飞机消费券不足!')
          that.setData({
            checkedM: false
          })
          return
        }
      }
      that.setData({
        checkMine: e.detail.value, //单个选中的值
        ['appointmentInfo.isSelf']: 1
      })
    } else {
      that.setData({
        checkMine: e.detail.value, //单个选中的值
        ['appointmentInfo.isSelf']: 0
      })
    }
  },
  // 同行人
  checkboxChange: function (e) {
    console.log(e.detail.value, 'check');
    var that = this
    if (that.data.appointmentInfo.type == 0) {
      if (that.data.cardJudge.bringPartnerSum <= 0 && that.data.cardJudge.bulletTrainSum <= 0) {
        app.showModalMsg('当前您的携伴权益券或高铁消费券不足，不可携伴!')
        that.setData({
          checkedC: false
        })
        return
      }
    }
    if (that.data.appointmentInfo.type == 1) {
      if (that.data.cardJudge.bringPartnerSum <= 0 && that.data.cardJudge.airportSum <= 0) {
        app.showModalMsg('当前您的携伴权益券或飞机消费券不足，不可携伴!')
        that.setData({
          checkedC: false
        })
        return
      }
    }
    that.setData({
      checkArr: e.detail.value //单个选中的值
    })
  },
  // 新增同行人
  // flag：1：新增同行人  2：行内-新增贵宾 3:行内-新增同行人
  handleAdd() {
    wx.navigateTo({
      url: '/pages/passenger/info/peers/peers?flag=' + 1
    })
  },
  // 预约
  order() {   
    let that = this
    if (that.data.checkMine.length == 0) {
      that.setData({
        ['appointmentInfo.isSelf']: 0
      })
    } else {
      that.setData({
        ['appointmentInfo.isSelf']: 1
      })
    }
    this.setData({
      ['appointmentInfo.peopleNum']: that.data.checkArr.length,
      ['appointmentInfo.passengerInfoIds']: [...that.data.checkArr, ...that.data.checkMine]
    })
    if (that.data.checkArr.length != 0 || that.data.checkMine.length != 0) {
      console.log(that.data.appointmentInfo, 'that.data.appointmentInfo');
      reservationHelp(that.data.appointmentInfo).then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '预约成功',
            icon: 'success'
          })
          if (app.globalData.isPlatinumCard == 'N') {
            setTimeout(function () {
              // 是否是白金卡
              // if (!that.data.isPlatinum) {
              wx.showModal({
                title: '白金卡办理',
                content: '是否进行办理？',
                showCancel: true,
                cancelText: '否',
                confirmText: '是',
                success(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: `/pages/webview/webview?url=https://elife.icbc.com.cn/OFSTCARDWEB/dist/#/apply/index/null/14/null/null/EW000250200000YNB02/HZDW000002456/null/null`,
                    })
                  } else {
                    app.goBack(2)
                    
                  }
                }
              })
              return
             
            }, 2000)
          } else {
            setTimeout(function () {
              app.goBack(2)
            
            }, 1000)

          }
        } else {
          app.showModalMsg(res.msg)
        }
      })
    } else {
      app.showModalMsg('请选择你所需预约的乘客')
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
})