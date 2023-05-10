// pages/mine/myInfo/myInfo.js
import {
  mineInfo,
  updateInfo
} from '../../../api/mine' //个人信息
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      name: '',
      tel: '',
      idCard: ''
    },
    form: {
      tel: null
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getList() {
    var userInfo = app.globalData.userInfo
    mineInfo(userInfo.id).then(res => {
      if (res.code == 200) {
        var user = res.data
        this.setData({
          ['userInfo.name']: app.filters.name(user.name),
          ['userInfo.tel']: app.filters.phone(user.tel),
          ['userInfo.idCard']: app.filters.idCard(user.idCard),
        })
      }
    })


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
  // 用户授权获取电话号码
  handleAccredit(e) {
    let that = this
    this.setData({
      ['form.tel']: e.detail
    })
    if (that.data.form.tel) {
      updateInfo(that.data.form).then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          })
          setTimeout(function () {
            that.getList()
          }, 1000)
        } else {
          app.showModalMsg(res.msg)
        }
      })
    }
  },
  // 修改电话号码
  updateTel() {
    let that = this
    that.info = that.selectComponent(".info");
    that.info.showDialog(); //调用子组件的方法
    let userInfo = app.globalData.userInfo
    that.setData({
      ['form.id']: userInfo.id
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
    this.getList()
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