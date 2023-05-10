// pages/passenger/appointmentInfo/appointmentinfo.js
import {
  apponitInfo
} from '../../../api/mine' //我的行程

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ['已预约', '已核销'],
    currentTab: 0,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  init(status) {
    // 0-预约成功,1-已完成,2-作废
      let params = {
        status: status
      }
    apponitInfo(params).then(res => {
      if (res.code == 200) {
        if (res.rows) {
          res.rows.forEach(item => {
            item.type = item.type == 1 ? '飞机' : '高铁'
            item.startStation = item.startStation == '' ? '未填写' : item.startStation
            item.startStation = item.startStation == null  ? '未填写' : item.startStation
            item.endStation = item.endStation == '' ? '未填写' : item.endStation
            item.endStation = item.endStation == null ? '未填写' : item.endStation
            item.jzStatus = item.jzStatus == 1 ? '接' : ''
            item.szStatus = item.szStatus == 1 ? '送' : ''
            if (item.isSelf == 1) {
              item.peopleNum = item.peopleNum + 1
            }
          })
        }
        this.setData({
          list: res.rows
        })
      } else {
        app.showModalMsg(res.msg)
      }
    })
  },
  // 预约切换
  currentTab: function (e) {
    if (this.data.currentTab == e.currentTarget.dataset.idx) {
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    this.getList(this.data.currentTab)
  },
  getList(tab) {
    this.init(tab)
  },
   // 预约行程详细信息
   tripInfo(e) {
    let item = e.currentTarget.dataset.value
    wx.navigateTo({
      url: '/pages/passenger/appointmentInfo/detail/detail?id=' + item.id,
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
    this.getList(this.data.currentTab)
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