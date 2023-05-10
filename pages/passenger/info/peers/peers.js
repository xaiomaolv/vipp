// pages/passenger/info/peers/peers.js
import {
  passengerInfo, // 贵宾及同乘人信息
  addPassenger, //同行人新增
  addVip, //贵宾新增
  addVipPassenger, //行内-同行人新增
} from '../../../../api/appointment'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: '', // flag：1：新增同行人  2：新增贵宾
    form: {
      name: '',
      tel: '',
      sex: '',
      idCard: '',
      licensePlates: ''
    },
    rules: {
      name: [{
        required: true,
        msg: '请输入姓名'
      }],
      tel: [{
        required: true,
        msg: '请输入电话号码'
      }],
      idCard: [{
        required: true,
        msg: '请输入身份证号码'
      }]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {
      this.setData({
        flag: options.flag,
      })
    }
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
    if (!this.validate()) {
      return
    }
    if (!/^1[3456789]\d{9}$/.test(this.data.form.tel)) {
      this.showModal('请填写正确的电话号码')
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
    // flag 1：新增同行人  2：行内-新增贵宾 3:行内-新增同行人
    if (this.data.flag == 1) {
      addPassenger(this.data.form).then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '新增成功',
            icon: 'success'
          })
          setTimeout(function () {
            app.goBack()
          }, 1000)
        }
      })
    }
    // 2：行内-新增贵宾 
    if (this.data.flag == 2) {
      addVip(this.data.form).then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '新增成功',
            icon: 'success'
          })
          setTimeout(function () {
            app.goBack()
          }, 1000)
        }
      })
    }
    // 3:行内-新增同行人
    if (this.data.flag == 3) {
      this.setData({
        ['form.vipId']: app.globalData.vipId
      })
      addVipPassenger(this.data.form).then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '新增成功',
            icon: 'success'
          })
          setTimeout(function () {
            app.goBack()
          }, 1000)
        }
      })
    }
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