// pages/passenger/appointment/index.js
import {
  getDicts, //字典表
  reservationHelp, //工行人员代预约
} from '../../../api/appointment' //预约

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ['高铁', '飞机'],
    currentTab: 0,
    form: {
      type: '', //预约类型 0：高铁 1：飞机
      classCode: '', //班次号
      departureDate: '', //出发日期
      startStation: '', //起点站
      endStation: '', //终到站
      jzStatus: '0', //是否接站
      szStatus: '0', //是否送站
      vipInfo: {}, //vip信息
      vipId: '', //vip
      unify_id: '', //统一认证号
      licensePlates: '', // 车牌
    },
    checkG: false,
    checkS: false,
    // 班次
    classes: '',
    // 出发地
    leaveArray: [],
    leaveIndex: '',
    // 目的地
    arriveArray: [],
    arriveIndex: '',

    rules: {
      classCode: [{
        required: true,
        msg: '请输入班次'
      }],
      departureDate: [{
        required: true,
        msg: '请选择出发日期'
      }],
      licensePlates: [{
        required: false,
        msg: '请输入车牌'
      }],
      startStation: [{
        required: false,
        msg: '请选择出发地'
      }],
      endStation: [{
        required: false,
        msg: '请选择目的地'
      }]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 预约类型切换 1：高铁 2：飞机
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
    let num = tab 
    this.setData({
      ['form.type']: num,
    })
    getDicts({
      type: num
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          ['form.classCode']: '',
          ['form.departureDate']: '',
          ['form.startStation']: '',
          ['form.endStation']: '',
          ['form.licensePlates']: '',
          checkS: false,
          checkG: false,
          leaveIndex: '',
          arriveIndex: '',
          leaveArray: res.data,
          arriveArray: res.data
        })
      }
    })
  },
  // 接
  take: function (e) {
    this.setData({
      checkG: !this.data.checkG
    })
    if (this.data.checkG == true) {
      if (!this.data.form.endStation) {
        this.showModal("请选择目的地")
        this.setData({
          checkG: false
        })
        return
      } else {
        this.setData({
          ['form.jzStatus']: '1'
        })
      }
    } else {
      this.setData({
        ['form.jzStatus']: '0'
      })
    }
  },
  // 送
  send: function (e) {
    this.setData({
      checkS: !this.data.checkS
    })
    if (this.data.checkS == true) {
      if (!this.data.form.startStation) {
        this.showModal("请选择出发地")
        this.setData({
          checkS: false
        })
        return
      } else {
        this.setData({
          ['form.szStatus']: '1'
        })
      }
    } else {
      this.setData({
        ['form.szStatus']: '0'
      })
    }
  },
  // 出发地
  bindLeaveChange: function (e) {
    let value = e.detail.value
    this.data.leaveArray.forEach((item, index) => {
      if (index == value) {
        this.setData({
          leaveIndex: e.detail.value,
          ['form.startSiteId']: item.id,
          ['form.startStation']: item.siteName
        })
      }
    })
  },
  // 目的地
  bindArriveChange: function (e) {
    let value = e.detail.value
    this.data.arriveArray.forEach((item, index) => {
      if (index == value) {
        this.setData({
          arriveIndex: e.detail.value,
          ['form.endSiteId']: item.id,
          ['form.endStation']: item.siteName
        })
      }
    })
  },
   // 送站取消
   bindLeaveCancel: function (e) {
    this.setData({
      leaveIndex: '',
      ['form.startSiteId']: '',
      ['form.startStation']: '',
      checkS: false,
      ['form.szStatus']: '0'
    })
  },
  // 接站取消
  bindArriveCancel: function (e) {
    this.setData({
      arriveIndex: '',
      ['form.endSiteId']: '',
      ['form.endStation']: '',
      checkG: false,
      ['form.jzStatus']: '0'
    })
  },
  inputChange: function (e) {
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    if (dataset.value) {
      this.data[dataset.obj] = dataset.value
    } else {
      this.data[dataset.obj] = value
    }
    this.setData(this.data)
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
  // 时间选择 
  bindDateChange(e) {
    this.setData({
      ['form.departureDate']: e.detail.value
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
  // 预约
  next() {
    if (!this.validate()) {
      return
    }
    if (this.data.form.startStation || this.data.form.endStation) {} else {
      this.showModal("出发地或目的地必选一个")
      return
    }
    if (this.data.form.jzStatus == '0' &&  this.data.form.szStatus == '0') {
      this.showModal("接站或送站必选一个")
      return
    }
    if (this.data.form.startStation == this.data.form.endStation) {
      this.showModal("出发地和目的地不能相同")
      return
    }
    if (!this.data.form.unify_id) {
      this.showModal("请填写统一认证号")
      return
    }

    app.globalData.appointmentInfo = this.data.form
    wx.navigateTo({
      url: '/pages/inStaff/choosePeers/choosePeers',
    })
  },
})