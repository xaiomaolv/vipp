// pages/mine/myTrips/myTrips.js
import {
  TripInfo,
  revoke,
  cancel,
  reservationRevokeList
} from '../../../api/mine' //我的行程

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // navTab: ['全部', '已完成', '未完成', '作废'],
    navTab: ['未完成', '已完成', '作废', '撤销'],
    currentTab: 0,
    list: [],
    listC: [],
    dataILu: true, //是否还有更多数据
    pageNum: 0,
    pageSize: 2,
    //初始化隐藏模态输入框
    hiddenmodalput: true,
    form: {
      reason: null,
      isSzStatus: '0',
      isJzStatus: '0'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  init(status) {
    //如果没有更多数据了就退出
    // if (!this.data.dataILu) return
    // this.data.pageNum++
    // 0-预约成功,1-已完成,2-作废 4、撤销中
    var params = null
    if (status == 3) {
      reservationRevokeList().then(res => {
        if (res.code == 200) {
          if (res.data) {
            res.data.forEach(item => {
              item.reservation.type = item.reservation.type == 1 ? '飞机' : '高铁'
              item.reservation.startStation = item.reservation.startStation == '' ? '未填写' : item.reservation.startStation
              item.reservation.startStation = item.reservation.startStation == null ? '未填写' : item.reservation.startStation
              item.reservation.endStation = item.reservation.endStation == '' ? '未填写' : item.reservation.endStation
              item.reservation.endStation = item.reservation.endStation == null ? '未填写' : item.reservation.endStation
              item.reservation.jzStatus = item.reservation.jzStatus == 1 ? '接' : ''
              item.reservation.szStatus = item.reservation.szStatus == 1 ? '送' : ''
              if (item.reservation.isSelf == 1) {
                item.reservation.peopleNum = item.reservation.peopleNum + 1
              }
            })
          }
          this.setData({
            listC: res.data,
          })
        } else {
          app.showModalMsg(res.msg)
        }
      })
    } else {
      params = {
        status: status
      }
      TripInfo(params).then(res => {
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
              if (item.isSelf == 1) {
                item.peopleNum = item.peopleNum + 1
              }
            })
          }
          // const newList = [...this.data.list, ...res.rows]
          // const total = res.total
          this.setData({
            list: res.rows,
            // list: newList,
            // dataILu: newList.length < total
          })
        } else {
          app.showModalMsg(res.msg)
        }
      })
    }

  },
  // 行程类型
  currentTab: function (e) {
    if (this.data.currentTab == e.currentTarget.dataset.idx) {
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    this.getList(this.data.currentTab)
  },
  bindTextAreaBlur: function (e) {
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    if (dataset.value) {
      this.data[dataset.obj] = dataset.value
    } else {
      this.data[dataset.obj] = value
    }
    // 用set才会触发页面刷新
    this.setData(this.data)
  },
  getList(tab) {
    this.init(tab)
  },
  // 行程详细信息
  tripInfo(e) {
    let item = e.currentTarget.dataset.value
    wx.navigateTo({
      url: '/pages/mine/myTrips/tripInfo/tripInfo?id=' + item.id,
    })
  },
  // 评价
  evaluate(e) {
    let item = e.currentTarget.dataset.value
    wx.navigateTo({
      url: '/pages/mine/myTrips/appraise/appraise?id=' + item.id,
    })
  },
  // 送站撤销
  revokeS(e) {
    let that = this
    let item = e.currentTarget.dataset.value
    wx.showModal({
      title: '是否确认撤销送站服务？',
      content: '说明：撤销送站服务为核销后对服务有异议，由乘客方提出撤销申请，撤销申请经管理员审核通过后将返还送站服务所使用的权益券',
      showCancel: true,
      cancelText: '否',
      confirmText: '是',
      success(res) {
        if (res.confirm) {
          that.setData({
            hiddenmodalput: !that.data.hiddenmodalput,
            ['form.reservationId']: item.id,
            ['form.isSzStatus']: '1'
          })
        }
      }
    })
  },
  // 接站撤销
  revokeJ(e) {
    let that = this
    let item = e.currentTarget.dataset.value
    wx.showModal({
      title: '是否确认撤销接站服务？',
      content: '说明：撤销接站服务为核销后对服务有异议，由乘客方提出撤销申请，撤销申请经管理员审核通过后将返还接站服务所使用的权益券',
      showCancel: true,
      cancelText: '否',
      confirmText: '是',
      success(res) {
        if (res.confirm) {
          that.setData({
            hiddenmodalput: !that.data.hiddenmodalput,
            ['form.reservationId']: item.id,
            ['form.isJzStatus']: '1'
          })
        }
      }
    })
  },
  // 撤销确认提交
  confirm() {
    var that = this
    that.setData({
      hiddenmodalput: true,
    })
    // console.log(that.data.form);
    revoke(that.data.form).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '撤销成功',
          icon: 'success'
        })
        this.setData({
          ['form.reason']: null,
          ['form.isSzStatus']: '0',
          ['form.isJzStatus']: '0'
        })
        setTimeout(function () {
          that.getList(that.data.currentTab)
        }, 1000)
      } else {
        app.showModalMsg(res.msg)
      }
    })
  },
  // 撤销取消
  confirmC() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
    })
  },
  // 取消行程
  cancel(e) {
    let that = this
    let item = e.currentTarget.dataset.value
    wx.showModal({
      title: '行程取消',
      content: '是否取消行程？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success(res) {
        if (res.confirm) {
          cancel(item.id).then(res => {
            if (res.code == 200) {
              wx.showToast({
                title: '取消成功',
                icon: 'success'
              })
              setTimeout(function () {
                that.getList(that.data.currentTab)
              }, 1000)
            } else {
              app.showModalMsg(res.msg)
            }
          })
        } else {
          that.setData({
            hiddenmodalput: true,
          })
        }
      }
    })
  },
  // 查看券码
  lookCoupon(e) {
    let item = e.currentTarget.dataset.value
    wx.navigateTo({
      url: '/pages/mine/myTrips/coupon/coupon?id=' + item.id,
    })
  },
  // 送站审核详情
  checkDetailS(e){
    // 0-待审核 1-审核通过 2-审核不通过
    let item = e.currentTarget.dataset.value
    let status = item.status == '0' ? '待审核' : item.status == '1' ? '审核通过' :  item.status == '2' ? '审核不通过' : ''
    let auditResult = item.auditResult == '' ? '无' : item.auditResult == null ? '无' : item.auditResult
    let res = '原因：'+ auditResult
    wx.showModal({
      title: status,
      content: res,
      showCancel: false,
      success(res) {
        if (res.confirm) {
        }
      }
    })
  },
  // 接站审核详情
  checkDetailJ(e){
    let item = e.currentTarget.dataset.value
    let status = item.status == '0' ? '待审核' : item.status == '1' ? '审核通过' :  item.status == '2' ? '审核不通过' : ''
    let auditResult = item.auditResult == '' ? '无' : item.auditResult == null ? '无' : item.auditResult
    let res = '原因：'+ auditResult
    wx.showModal({
      title: status,
      content: res,
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
    // this.init()//获取数据
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})