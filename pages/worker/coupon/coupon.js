// pages/worker/coupon/coupon.js
import {
  writeoffCoupon
} from '../../../api/worker'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [] //选项列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //添加选项
  addOption(e) {
    let options = this.data.couponList
    options.push('')
    this.setData({
      couponList: options
    })
  },
  //删除选项
  delOption(e) {
    let index = e.currentTarget.dataset.index //索引位置
    let options = this.data.couponList
    for (let i = 0; i < options.length; i++) {
      if (index == i) {
        options.splice(index, 1)
      }
    }
    this.setData({
      couponList: options
    })
  },
  //获取券码输入内容
  bindinput(e) {
    let index = e.currentTarget.dataset.index //索引位置
    let value = e.detail.value //输入的内容
    // console.log(value, 'vavv');
    let options = this.data.couponList //data中存放的数据
    for (let i = 0; i < options.length; i++) {
      if (index == i) {
        options[index] = value //将当前输入的值放到数组中对应的位置
      }
    }
    this.setData({
      couponList: options
    })
  },
  // 核销
  writeOffCoupon(e) {
    if (this.data.couponList.length != 0) {
      let options = this.data.couponList //data中存放的数据
      for (let i = 0; i < options.length; i++) {
        if (!options[i]) {
          wx.showToast({
            title: '请输入第' + `${i * 1 + 1}` + '条的券码！',
            icon: 'none'
          })
          return;
        }
      }
      // console.log(this.data.couponList, 'this.data.couponList');
      let params = {
        couponCode: this.data.couponList
      }
      writeoffCoupon(params).then(res => {
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
          app.showModalMsg(res.msg)
        }
      })

    } else {
      app.showModalMsg('请先添加券码')
    }


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