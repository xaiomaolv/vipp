// pages/mine/complaint/complaint.js
import {
  addSuggestion
} from '../../../api/mine' //评价
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      content: ''
    },
    rules: {
      content: [{
        required: true,
        msg: '请输入投诉内容'
      }],
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  // 提交
  handleSubmit() {
    if (!this.validate()) {
      return
    }
    // console.log(this.data.form, 'form');
    addSuggestion(this.data.form).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '投诉成功',
          icon: 'success'
        })
        setTimeout(function () {
          app.goBack()
        }, 1000)
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