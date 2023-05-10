// pages/inStaff/administration/administration.js
import {
  reservationAdmin, //行政预约
  addVip, //贵宾新增
} from '../../../api/appointment'

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
      peopleNum: '',
      licensePlates:''
    }
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
    if (!this.data.form.peopleNum) {
      this.showModal('请输入人次')
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
    app.globalData.appointmentAduit = this.data.form
    wx.navigateTo({
      url: '/pages/inStaff/aduitAppoint/index',
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