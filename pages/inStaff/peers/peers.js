// pages/inStaff/peers/peers.js
import {
  passengerInfo, // 贵宾及同乘人信息
  verificationVip, //贵宾信息确认
  addVip, //贵宾新增
} from '../../../api/appointment'
import {
  instaffRightsInfo
} from '../../../api/userinfo' //查询权益

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      name: '',
      tel: '',
      sex: '',
      idCard: '',
      // licensePlates:'',
    },
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
    // bringPartner：可携伴使用的权益券张数
    // bulletTrain：高铁消费劵张数
    // airport：机场消费劵张数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  inputChange: function (e) {
    var that = this
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    if (dataset.value) {
      that.data[dataset.obj] = dataset.value
    } else {
      that.data[dataset.obj] = value
    }
    that.setData(that.data)
  },
  add() {
    var that = this
    if (!this.data.form.name) {
      this.showModal('请输入姓名')
      return;
    }
    if (!this.data.form.tel) {
      this.showModal('请输入电话号码')
      return;
    }
    if (!/^1[3456789]\d{9}$/.test(this.data.form.tel)) {
      this.showModal('请填写正确的电话号码')
      return;
    }
    if (!this.data.form.idCard) {
      this.showModal('请输入身份证号码')
      return;
    }
    if (this.data.form.idCard) {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(this.data.form.idCard) === true) {
        var idCard = this.data.form.idCard;
        if (idCard.length === 18) {
          let SexNum = idCard.substr(16, 1)
          if (SexNum % 2 === 1) {
            this.setData({
              ['form.sex']: '男'
            })
          } else {
            this.setData({
              ['form.sex']: '女'
            })
          }
        } else if (idCard.length === 15) {
          let SexNum = idCard.substr(14, 1)
          if (SexNum % 2 === 1) {
            this.setData({
              ['form.sex']: '男'
            })
          } else {
            this.setData({
              ['form.sex']: '女'
            })
          }
        }
      } else {
        return this.showModal('请填写正确的身份证号码')
      }
    }

    verificationVip(this.data.form).then(res => {
      if (res.code == 200) {
        app.globalData.vipInfo = this.data.form
        app.globalData.vipId = res.data.id
          // 权益查询
        instaffRightsInfo(res.data.id).then(res => {
          if (res.code == 200) {
            this.setData({
              cardJudge: res.data
            })
            if (!that.data.cardJudge.isBlackCard && !that.data.cardJudge.isConsumptionReach && !that.data.cardJudge.isAssetsReach && !that.data.cardJudge.isWhitelist) {
              if (that.data.cardJudge.selfSum <= 0 && that.data.cardJudge.bringPartnerSum <= 0 && that.data.cardJudge.bulletTrainSum <= 0 && that.data.cardJudge.airportSum <= 0) {
                app.showModalMsg('当前贵宾权益券或消费券不足!')
                return
              }
            }
            setTimeout(function () {
              wx.navigateTo({
                // url: '/pages/inStaff/chooseVehicle/chooseVehicle',
                url: '/pages/inStaff/appointment/index',
              })
            }, 1000)
          } else {
            app.showModalMsg(res.msg)
          }
        })
      } else {
        app.showModalMsg(res.msg)
      }
    })
  },
  showModal(msg) {
    wx.showModal({
      title: '',
      content: msg,
      showCancel: false,
      success(res) {
        if (res.confirm) {

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