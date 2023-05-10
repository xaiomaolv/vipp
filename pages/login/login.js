// pages/login/login.js
import {
  info,
  smsCode,
  checkPhone,
  register
} from '../../api/login.js'
import {
  seachWxUserInfo
} from '../../api/userinfo' //查询用户信息
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      name: '',
      tel: '',
      idCard: '',
      sex: ''
    },
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: false,
    info: {},
    agreement: false,
    agreeTitle:'',
    agreeId:'',
    agreementList:[
      {id:'0',title:'《中国工商银行电子银行个人客户服务协议》'},
      {id:'4',title:'《贵宾出行服务注册使用协议》'},
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //父组件获取子组件对象方法,根据样式获取，建议使用selectAllComponents
    this.logo = this.selectComponent(".logo");
    if (!app.globalData.vip_admin) {
      this.logo.showDialog(); //调用子组件的方法
    }
  },
  inputChange: function (e) {
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
  // 协议查看
  handleAgreement(e){ 
    let that = this
    let item = e.currentTarget.dataset.value
    this.setData({
      agreeTitle: item.title,
      agreeId: item.id
    })
    that.agreement.showlog()
  },
  // 协议
  switchAgreement() {
    this.setData({ agreement: !this.data.agreement })
  },
  submit(e) {
    if (!this.data.form.name) {
      this.showModal('请输入姓名')
      return;
    }
    if (!this.data.form.idCard) {
      this.showModal('请输入身份证号码')
      return;
    }
    if (this.data.form.idCard) {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(this.data.form.idCard) === true) {
        var idCard = this.data.form.idCard;
        if (idCard.length === 18) {
          let SexNum = idCard.substr(16, 1)
          if (SexNum % 2 === 1) {
            this.setData({
              ['form.sex']: '男'
            })
          } else {
            this.setData({
              ['form.sex']: '女'
            })
          }
        } else if (idCard.length === 15) {
          let SexNum = idCard.substr(14, 1)
          if (SexNum % 2 === 1) {
            this.setData({
              ['form.sex']: '男'
            })
          } else {
            this.setData({
              ['form.sex']: '女'
            })
          }
        }
      } else {
        return this.showModal('请填写正确的身份证号码')
      }
    }
    // if (!this.data.form.tel) {
    //   this.showModal('请输入手机号码')
    //   return;
    // }
    // if (!/^1[3456789]\d{9}$/.test(this.data.form.tel)) {
    //   this.showModal('请填写正确的手机号码')
    //   return;
    // }
    if (!this.data.agreement) {
      this.showModal('请先阅读协议，并同意')
      return
    }
    register(this.data.form).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '注册成功',
        icon: 'success'
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }, 1000)
      } else {
        this.showModal(res.msg)
      }
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    // this.setData({
    //   ['form.tel']: app.globalData.phoneNumber
    // })
    // this.init()
    this.agreement = this.selectComponent(".agreement");
  },
  // 用户授权获取电话号码
  handleAccredit(e) {
    this.setData({
      ['form.tel']: e.detail
    })
  },
  init() {
    //父组件获取子组件对象方法,根据样式获取，建议使用selectAllComponents
    this.logo = this.selectComponent(".logo");
    //判断缓存中有没有授权信息，如果没有就显示弹窗，有就直接隐藏弹窗
    seachWxUserInfo().then(res => {
      if (res.code == 200) {
        if (res.data.vip_admin) {
          app.globalData.openid = res.data.vip.wxOpenid
        } else {
          // this.logo.showDialog();//调用子组件的方法
        }
        app.globalData.vip_admin = res.data.vip_admin
        app.globalData.gh_admin = res.data.gh_admin
        app.globalData.gt_common = res.data.gt_common
        app.globalData.jc_common = res.data.jc_common
      } else {

      }
    })
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
    this.resetForm()
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