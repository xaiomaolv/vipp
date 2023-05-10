// pages/mine/myTrips/appraise/appraise.js
import {
  evaluate
} from '../../../../api/mine' //评价
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // reservationId:预约ID  icbcScore:工行服务评分  vipScore:贵宾机场评分  icbcComment:工行服务评价  vipComment:贵宾服务评价   image:图片(预留  看是否需要拍照 不需要则省略)
    form:{
      icbcScore:'',
      vipScore:'',
      icbcComment:'',
      vipComment:'',
      reservationId:''
    },
    rules: {
      icbcScore: [
        { required: false, msg: '请对工行服务评分' }
      ], 
      icbcComment: [
        { required: false, msg: '请输入对工行服务评价内容' }
      ], 
      vipScore: [
        { required: false, msg: '请对机场/高铁贵宾服务评分' }
      ], 
      vipComment: [
        { required: false, msg: '请输入对机场/高铁贵宾服务评价内容' }
      ], 
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ['form.reservationId']:options.id
    })
  },
  getScoreGh(e) {
    this.setData({
      ['form.icbcScore']: e.detail.value,
    })
  },
  getScoreGb(e) {
    this.setData({
      ['form.vipScore']: e.detail.value,
    })
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
  handleSubmit(){
    if (!this.validate()) {
      return
    }
    // console.log(this.data.form,'form');
    evaluate(this.data.form).then(res=>{
      if (res.code == 200) {
        wx.showToast({
          title: '评价成功',
          icon: 'success'
        })
        setTimeout(function(){
          app.goBack()
        },1000)
      } else{
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