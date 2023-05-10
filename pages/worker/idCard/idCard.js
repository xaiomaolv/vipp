// pages/worker/idCard/idCard.js
import {
  getDicts, //字典表
} from '../../../api/appointment'
import {
  writeoffIdcard
} from '../../../api/worker'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ['高铁', '飞机'],
    currentTab: 0,
    form: {
      classCode:'',
      idCard: '',
      startSiteId: '',
      endSiteId: ''
    },
    // 出发地
    leaveArray: [],
    leaveIndex: '',
    // 目的地
    arriveArray: [],
    arriveIndex: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 预约类型切换 0：高铁 1：飞机
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
          ['form.startSiteId']: '',
          ['form.endSiteId']: '',
          leaveIndex: '',
          arriveIndex: '',
          leaveArray: res.data,
          arriveArray: res.data
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
  // 出发地
  bindLeaveChange: function (e) {
    let value = e.detail.value
    this.data.leaveArray.forEach((item, index) => {
      if (index == value) {
        this.setData({
          leaveIndex: e.detail.value,
          ['form.startSiteId']: item.id
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
          ['form.endSiteId']: item.id
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
  // 核销
  writeOff() {
    if (!this.data.form.classCode) {
      this.showModal("请输入班次号")
      return
    }
    if (this.data.form.startSiteId || this.data.form.endSiteId) {} else {
      this.showModal("出发地或目的地必选一个")
      return
    }
    // if (!this.data.form.startSiteId) {
    //   this.showModal("请选择出发地")
    //   return
    // }
    // if (!this.data.form.endSiteId) {
    //   this.showModal("请选择目的地")
    //   return
    // }
    if (!this.data.form.idCard) {
      this.showModal("请输入身份证号码")
      return
    }
    if (this.data.form.startSiteId == this.data.form.endSiteId) {
      this.showModal("出发地和目的地不能相同")
      return
    }
    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.form.idCard)) {
      this.showModal('请填写正确的身份证号码')
      return;
    }
    writeoffIdcard(this.data.form).then(res=>{
      if (res.code == 200) {
        wx.showToast({
          title: '核销成功',
          icon: 'success'
        })
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/worker/index/index',
          })
        },1000)
      } else {
        this.showModal(res.msg)
      }
    })
    // console.log(this.data.form,'this.data.form');
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