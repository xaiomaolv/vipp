// pages/inStaff/vipInfo/vipInfo.js
import {
  getDicts, //字典表
  vipInfoList, //贵宾信息
} from '../../../api/appointment' //预约

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    form: {
      name: '',
      tel: '',
      idCard: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 查询
  search() {
    // this.reset()
    this.init()
  },
  // 页面初始数据
  init() {
    if (this.data.form.name || this.data.form.tel || this.data.form.idCard) {
      vipInfoList(this.data.form).then(res => {
        if (res.code == 200) {
          var list = res.data
          res.rows.forEach(item => {
            item.name = app.filters.name(item.name)
            item.tel = app.filters.phone(item.tel)
            item.idCard = app.filters.idCard(item.idCard)
          })
          this.setData({
            list: [...res.rows]
          })
        }
      })
    } else {
      this.setData({
        list: []
      })
    }
  },
  reset() {
    this.setData({
      list: [],
      ['form.name']: '',
      ['form.tel']: '',
      ['form.idCard']: '',
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