// pages/hotActivity/hotActivity.js
import {
  listAdvertise, //广告列表
} from '../../api/appointment'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeList: [
      // {
      //   id: 0,
      //   type: 'image',
      //   img: 'http://10.3.10.170:8080/profile/upload/2021/08/04/5e432d21-cf75-4fb4-a6d3-b0a14ccfac12.png',
      //   url: 'https://www.baidu.com/',
      // },
      // {
      //   id: 1,
      //   type: 'image',
      //   img: 'http://10.3.10.170:8080/profile/upload/2021/08/04/067734f0-cde6-4777-bacb-204878a5e384.jpg',
      //   url: 'https://www.puercn.com/huacha/gongxiao/212519.html',
      // },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  init() {
    listAdvertise().then(res => {
      if (res.code == 200) {
        var base64 = []
        res.data.forEach(e => {
          base64.push({
            image: e.image.replace(/[\r\n]/g, ""),
            id: e.id,
            url: e.url,
          })
          this.setData({
            activeList: base64
          })
        })
      }
    })
  },
  // 活动跳转
  handelActive(e) {
    let item = e.currentTarget.dataset.value
    // console.log(item, 'handelActive');
    wx.navigateTo({
      url: `/pages/webview/webview?url=${item.url}`,
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