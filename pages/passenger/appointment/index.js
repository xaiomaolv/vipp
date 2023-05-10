// pages/passenger/appointment/index.js
import {
  getDicts, //字典表
} from '../../../api/appointment' //预约

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ['高铁', '飞机'],
    currentTab: 0,
    // classCode：//车次号  startStation： endStation：//终到站   departureDate：//出发日期  type：预约类型 peopleNum：//人数   szStatus：//是否送站  jzStatus：//是否接站
    form: {
      type: '', //预约类型 0：高铁 1：飞机
      classCode: '', //车次号
      departureDate: '', //出发日期
      startStation: '', //起点站
      endStation: '', //终到站
      jzStatus: '0', //是否接站
      szStatus: '0', //是否送站
      licensePlates: '', // 车牌
    },
    checkG: false,
    checkS: false,
    checked: '',
    // 车次
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
        msg: '请输入车次/航班'
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
    },
    show: false,
    showa: false,
    plateList: [], //[{checked:'',NO:'云A12345'},{checked:'',NO:'云A31345'}, {checked:'',NO:'云A51645'},{checked:'',NO:'云A31348'}, {checked:'',NO:'云A51649'}],
    plateListJ: [],
    plateListS: [],
    plateNoJ: '',
    plateNoS: '',
    isJoS: '',
    plateNos: '',
    addList: [],
    activeTab: '',
    checkeds: []
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
      ['form.type']: num
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
          ['form.endStation']: '',
          ['form.licensePlates']: '',
          checkS: false,
          checkG: false,
          leaveIndex: num == 1 ? '0' : '',
          arriveIndex: '',
          leaveArray: res.data,
          arriveArray: res.data,
          ['form.startSiteId']: num == 1 ? res.data[0].id : '',
          ['form.startStation']: num == 1 ? res.data[0].siteName : '',
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
      // if (!this.data.form.endStation) {
      //   this.showModal("请选择目的地")
      //   this.setData({
      //     checkG: false
      //   })
      //   return
      // } else {
      //   this.setData({
      //     ['form.jzStatus']: '1'
      //   })
      // }
      this.setData({
        ['form.jzStatus']: '1',
        arriveIndex: '0',
        ['form.endStation']: this.data.arriveArray[0].siteName,
        ['form.endSiteId']: this.data.arriveArray[0].id,
      })
    } else {
      this.setData({
        ['form.jzStatus']: '0',
        arriveIndex: '',
        ['form.endStation']: '',
        ['form.endSiteId']: '',
      })
    }
  },
  // 送
  send: function (e) {
    this.setData({
      checkS: !this.data.checkS
    })
    if (this.data.checkS == true) {
      // if (!this.data.form.startStation) {
      //   this.showModal("请选择出发地")
      //   this.setData({
      //     checkS: false
      //   })
      //   return
      // } else {
      //   this.setData({
      //     ['form.szStatus']: '1'
      //   })
      // }
      this.setData({
        ['form.szStatus']: '1',
        leaveIndex: '0',
        ['form.startStation']: this.data.leaveArray[0].siteName,
        ['form.startSiteId']: this.data.leaveArray[0].id,
      })
    } else {
      this.setData({
        ['form.szStatus']: '0',
        leaveIndex: '',
        ['form.startStation']: '',
        ['form.startSiteId']: '',
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
          ['form.startStation']: item.siteName,
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
    this.setData({
      show: false
    })
    // this.getList(this.data.currentTab)
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
  // 下一步
  next() {
    if (!this.validate()) {
      return
    }

    if (this.data.form.startStation || this.data.form.endStation) {} else {
      this.showModal("出发地或目的地必选一个")
      return
    }
    if (this.data.form.jzStatus == '0' && this.data.form.szStatus == '0') {
      this.showModal("接站或送站必选一个")
      return
    }
    if (this.data.form.startStation == this.data.form.endStation) {
      this.showModal("出发地和目的地不能相同")
      return
    }
    if (this.data.checkS && !this.data.form.licensePlates) {
      this.showModal("请输入送站车牌")
      return
    }
    if (this.data.checkG && !this.data.form.licensePlatesEnd) {
      this.showModal("请输入接站车牌")
      return
    }

    this.setData({
      show: true
    })
  },
  handleCencel() {
    this.setData({
      show: false
    })
  },
  handleConfirm() {
    app.globalData.appointmentInfo = this.data.form

    let a = this.data.form.licensePlates ? this.data.form.licensePlates.split(',') : []
    let b = this.data.form.licensePlatesEnd ? this.data.form.licensePlatesEnd.split(',') : []

    let list = [...new Set([...a, ...b])]
    let arr = []
    list.forEach(el => {
      let obj = {
        NO: el,
        checked: ''
      }
      arr.push(obj)
    })

    let plateList = wx.getStorageSync('plateList')
    wx.setStorageSync('plateList', [...plateList, ...arr])

    wx.navigateTo({
      url: '/pages/passenger/choosePeers/choosePeers',
    })
  },
  handleSong() {
    let arr = []
    if (this.data.form.licensePlates) {
      arr = this.data.form.licensePlates.split(',');
    }
    let newArr = wx.getStorageSync('plateList').slice(-5)

    if (newArr.length !== 0) {
      newArr.forEach(el => {
        arr.forEach(item => {
          if (el.NO == item) {
            el.checked = true
          }
        })
      })
    }

    this.setData({
      isJoS: 1,
      showa: true,
      plateListS: [...newArr],
      addList: arr
    })

  },
  handleJie() {
    let arr = []
    if (this.data.form.licensePlatesEnd) {
      arr = this.data.form.licensePlatesEnd.split(',');
    }
    let newArr = wx.getStorageSync('plateList').slice(-5)
    if (newArr.length !== 0) {
      newArr.forEach(el => {
        arr.forEach(item => {
          if (el.NO == item) {
            el.checked = true
          }
        })
      })
    }
    this.setData({
      isJoS: 2,
      showa: true,
      plateListJ: [...newArr],
      addList: arr
    })

  },
  palteCencel() {
    this.setData({
      isJoS: '',
      showa: false,
      plateNo: '',
      addList: []
    })
  },
  palteConfirm() {
    if (this.data.addList.length == 0) {
      this.showModal("选择或输入车牌号")
      return
    }

    if (this.data.isJoS == '1') {
      this.setData({
        ['form.licensePlates']: this.data.addList.join(','),
        showa: false,
        addList: [],
        plateNo: ''
      })
    }
    if (this.data.isJoS == '2') {
      this.setData({
        ['form.licensePlatesEnd']: this.data.addList.join(','),
        showa: false,
        addList: [],
        plateNo: ''
      })
    }

  },
  hanleAdd() {

    var creg = /^([京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][1-9DF][1-9ABCDEFGHJKLMNPQRSTUVWXYZ]\d{3}[1-9DF]|[京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][\dABCDEFGHJKLNMxPQRSTUVWXYZ]{5})$/

    if (!this.data.plateNo) {
      this.showModal('请输入车牌号')
      return;
    }

    if (this.data.plateNo.length  && !creg.test(this.data.plateNo)) {
      this.showModal('请输入正确的车牌号')
      return;
    }
    

    this.data.addList.push(this.data.plateNo)
    this.setData({
      addList: this.data.addList,
      plateNo: ''
    })
  },
  // 删除车牌
  handleDel(e) {
    let index = e.currentTarget.dataset.index
    let item = e.currentTarget.dataset.value
    this.data.addList.splice(index, 1)
    let arr = this.data.isJoS == '1' ? this.data.plateListS : this.data.plateListJ
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].NO == item) {
        console.log(arr[i].NO, item)
        //当前点击的位置为true即选中        
        if (arr[i].checked) {
          arr[i].checked = false;
        }
      }
    }
    if (this.data.isJoS == '1') {
      this.setData({
        plateListS: arr,
        addList: this.data.addList
      })
    } else {
      this.setData({
        plateListJ: arr,
        addList: this.data.addList
      })
    }
  },
  handleTab(e) {

    let index = e.currentTarget.dataset.idx
    let arr = this.data.isJoS == '1' ? this.data.plateListS : this.data.plateListJ

    for (let i = 0; i < arr.length; i++) {
      if (i == index) {
        console.log(i, index)
        //当前点击的位置为true即选中        
        if (arr[i].checked) {
          arr[i].checked = false;
          this.data.addList.forEach((el, index) => {
            if (arr[i].NO == el) {
              this.data.addList.splice(index, 1)
            }
          })
        } else {
          arr[i].checked = true;
          this.data.addList.push(arr[i].NO)
        }
      }

    }
    if (this.data.isJoS == '1') {
      this.setData({
        plateListS: arr,
        addList: this.data.addList
      })
    } else {
      this.setData({
        plateListJ: arr,
        addList: this.data.addList
      })
    }
  },

  // 清除历史记录
  handleClear() {
    wx.setStorageSync('plateList', [])

    this.setData({
      plateListS: [],
      plateListJ: [],
      // addList:[]       
    })

  }

})