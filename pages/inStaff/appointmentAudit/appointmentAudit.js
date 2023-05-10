// pages/inStaff/appointmentAudit/appointmentAudit.js
import {
  listAudit, //代理预约审核列表
  oneAudit,
  twoAudit
} from '../../../api/appointment'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // state: 0审核通过 1待审核 2一审通过 3、一审不通过   4、二审不通过
    navTab: ['待审核', '已审核'],
    currentTab: 0,
    list: [],
    oneAudit: false,
    twoAudit: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      oneAudit: app.globalData.oneAudit,
      twoAudit: app.globalData.twoAudit
    })
  },
  // 一级审核
  oneAudit(e) {
    var that = this
    let item = e.currentTarget.dataset.value.id
    wx.showModal({
      title: '一级审核',
      content: '是否通过？',
      showCancel: true,
      cancelText: '否',
      confirmText: '是',
      success(res) {
        if (res.confirm) {
          let params = {
            id: item,
            state: 2,
          }
          oneAudit(params).then(res => {
            if (res.code == 200) {
              wx.showToast({
                title: '审核成功',
                icon: 'success'
              })
            }
            that.getList(that.data.currentTab)
          })
        } else {
          let params = {
            id: item,
            state: 3,
          }
          oneAudit(params).then(res => {
            if (res.code == 200) {
              wx.showToast({
                title: '审核成功',
                icon: 'success'
              })
            }
            that.getList(that.data.currentTab)
          })
        }
      }
    })
  },
  // 二级审核
  twoAudit(e) {
    var that = this
    let item = e.currentTarget.dataset.value.id
    wx.showModal({
      title: '二级审核',
      content: '是否通过？',
      showCancel: true,
      cancelText: '否',
      confirmText: '是',
      success(res) {
        if (res.confirm) {
          let params = {
            id: item,
            state: 0,
          }
          twoAudit(params).then(res => {
            if (res.code == 200) {
              wx.showToast({
                title: '审核成功',
                icon: 'success'
              })
            }
            that.getList(that.data.currentTab)
          })
        } else {
          let params = {
            id: item,
            state: 4,
          }
          twoAudit(params).then(res => {
            if (res.code == 200) {
              wx.showToast({
                title: '审核成功',
                icon: 'success'
              })
            }
            that.getList(that.data.currentTab)
          })
        }
      }
    })
  },
  // 类型切换 0:审核通过 1：已审核
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
    // 1-待审核   2 已审核
    let num = tab + 1
    listAudit({
      searchType: num
    }).then(res => {
      if (res.code == 200) {
        if (res.rows) {
          res.rows.forEach(item => {
            item.type = item.type == 1 ? '飞机' : '高铁'
            item.startStation = item.startStation == '' ? '未填写' : item.startStation
            item.startStation = item.startStation == null ? '未填写' : item.startStation
            item.endStation = item.endStation == '' ? '未填写' : item.endStation
            item.endStation = item.endStation == null ? '未填写' : item.endStation
            item.jzStatus = item.jzStatus == 1 ? '接' : ''
            item.szStatus = item.szStatus == 1 ? '送' : ''
            item.status = item.state == 0 ? "审核成功" : "" || item.state == 1 ? "待审核" : "" || item.state == 2 ? "一审通过" : "" || item.state == 3 ? "一审不通过" : "" || item.state == 4 ? "二审不通过" : ""
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
  init() {
    listAudit().then(res => {
      if (res.code == 200) {
        if (res.rows) {
          res.rows.forEach(item => {
            item.type = item.type == 1 ? '飞机' : '高铁'
            item.startStation = item.startStation == '' ? '未填写' : item.startStation
            item.startStation = item.startStation == null ? '未填写' : item.startStation
            item.endStation = item.endStation == '' ? '未填写' : item.endStation
            item.endStation = item.endStation == null ? '未填写' : item.endStation
            item.jzStatus = item.jzStatus == 1 ? '接' : ''
            item.szStatus = item.szStatus == 1 ? '送' : ''
            item.status = item.state == 0 ? "审核成功" : "" || item.state == 1 ? "待审核" : "" || item.state == 2 ? "一审通过" : "" || item.state == 3 ? "一审不通过" : "" || item.state == 4 ? "二审不通过" : ""
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.init()
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