// pages/worker/scanCode/scanCode.js
import {
  writeoffQrcode
} from '../../../api/worker'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      idCard: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  // 扫码核销
  scanCode: function () {
    var that = this;
    wx.scanCode({ //扫描API
      onlyFromCamera: true, // 只允许从相机扫码
      scanType: ['barCode', 'qrCode'],
      success(res) { //扫描成功
        // var scanCodeMsg = res.path; //获取二维码的路径信息
        // console.log(res.result) //输出二维码信息
        var obj = JSON.parse(res.result); 
        // console.log(obj,'obj');
        let params = {
          reservationId:obj.id
        }
        writeoffQrcode(params).then(res=>{
          if (res.code == 200) {
            wx.showToast({
              title: '核销成功',
              duration: 1000
            })
          } else {
            app.showModalMsg(res.msg)
          }
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '扫码失败',
          icon: 'error',
          duration: 2000
        })
      },
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