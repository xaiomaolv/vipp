// pages/passenger/vipTickets/vipTickets.js
import {
  vipTicketList
} from '../../../api/mine' //我的券
import {
  rightsInfo,
  usageRecord //已使用
} from '../../../api/userinfo.js' //查询权益
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    // navTab: ['未使用', '已使用', '购券'],
    navTab: ['未使用', '已使用'],
    currentTab: 0,

    airport: [],
    bringPartner: [],
    bulletTrain: [],
    self: [],
    // 购券m
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled',
    // consumptionType:消费类型  {1：高铁 2：飞机 }  
    // couponType：优惠券类型   {1：权益券 2：消费券}
    list: null,
    imgList: [{
        id: 1,
        number: 1,
        consumptionType: 1,
        couponType: 1,
        expireDate: '2021-10-29',
        img: '../../../img/qb.jpg',
      },
      {
        id: 2,
        number: 3,
        consumptionType: 1,
        couponType: 2,
        expireDate: '2021-12-29',
        img: '../../../img/qx.jpg',
      },
      {
        id: 3,
        number: 12,
        consumptionType: 2,
        couponType: 1,
        expireDate: '2021-07-29',
        img: '../../../img/jx.jpg',
      },
      {
        id: 4,
        number: 3,
        consumptionType: 1,
        couponType: 2,
        expireDate: '2021-12-29',
        img: '../../../img/gx.jpg',
      },
    ],
    'goodList': [{
        'name': '飞机消费券',
        'isbn': '1',
        'cover': '../../../img/jx.jpg',
        'desc': '仅限飞机使用',
        'price': 295,
        'count': 1,
        'checked': false
      },
      {
        'name': '高铁消费券',
        'isbn': '2',
        'cover': '../../../img/gx.jpg',
        'desc': '仅限高铁使用',
        'price': 265,
        'count': 1,
        'checked': false
      }
    ],
    'checkAll': false,
    'totalCount': 0,
    'totalPrice': 0
  },
  /**
   * 计算贵宾券总数
   */
  calculateTotal: function () {
    var goodList = this.data.goodList;
    var totalCount = 0;
    var totalPrice = 0;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      if (good.checked) {
        totalCount += good.count;
        totalPrice += good.count * good.price;
      }
    }
    totalPrice = totalPrice.toFixed(2);
    this.setData({
      'totalCount': totalCount,
      'totalPrice': totalPrice
    })
  },

  /**
   * 用户点击贵宾券减1
   */
  subtracttap: function (e) {
    // console.log(e, 'subtracttap');
    var index = e.target.dataset.index;
    var goodList = this.data.goodList;
    var count = goodList[index].count;
    // console.log(count, 'count');
    if (count <= 1) {
      return;
    } else {
      goodList[index].count--;
      this.setData({
        'goodList': goodList
      });
      this.calculateTotal();
    }
  },

  /**
   * 用户点击贵宾券加1
   */
  addtap: function (e) {
    // console.log(e, 'addtap');
    var index = e.target.dataset.index;
    var goodList = this.data.goodList;
    var count = goodList[index].count;
    goodList[index].count++;
    this.setData({
      'goodList': goodList
    });
    this.calculateTotal();
  },
  /**
   * 用户选择购物车贵宾券
   */
  checkboxChange: function (e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.goodList;
    var values = e.detail.value;
    for (var i = 0; i < checkboxItems.length; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0; j < values.length; ++j) {
        if (checkboxItems[i].isbn == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    var checkAll = false;
    if (checkboxItems.length == values.length) {
      checkAll = true;
    }

    this.setData({
      'goodList': checkboxItems,
      'checkAll': checkAll
    });
    this.calculateTotal();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // vipTicketList().then(res=>{
    //   console.log((res,'vipTicketList'));
    // })
  },
  // 贵宾券切换
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
    if (tab == 0) {
      rightsInfo().then(res => {
        if (res.code == 200) {
          this.setData({
            list: res.data,
            airport: res.data.airport,
            bulletTrain: res.data.bulletTrain,
            bringPartner: res.data.bringPartner,
            self: res.data.self
          })
        }
      })
    }
    if (tab == 1) {
      usageRecord().then(res => {
        if (res.code == 200) {
          this.setData({
            list: res.data,
            airport: [],
            bulletTrain: [],
            bringPartner: [],
            self: []
          })
        }
      })
    }
    if (tab == 2) {
      this.setData({
        show: true
      })
    } else {
      this.setData({
        show: false
      })
    }
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  },
  // 购买
  buy() {
    // console.log(this.data.totalCount, '购券数');
    if (this.data.totalCount == 0) {
      app.showModalMsg("请先勾选所购优惠券")
      return
    }
    // console.log(this.data.goodList, 'goodList');
    let nlist = [];
    for (let i = 0; i < this.data.goodList.length; i++) {
      if (this.data.goodList[i].checked) {
        nlist.push(this.data.goodList[i]);
      }
      // console.log(nlist, 'listn');
    }
    wx.showToast({
      title: '购券成功',
      icon: 'success'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.calculateTotal();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList(this.data.currentTab)
  },
  handleItem(e){

    let item = e.currentTarget.dataset.value
    let msg;
    if(item == '1'){
      msg = '根据您在工行云南分行开立的卡类别、消费额、资产等赠送的人权益，仅限本人使用，每张券可享受一次贵宾服务。'
    }
    if(item == '2'){
      msg = '根据您在工行云南分行开立的卡类别、消费额、资产等赠送的人权益，可携伴使用，每张券可享受一人/次贵宾服务'
    }
    if(item == '3' || item == '4'){
      msg = '您可以在工行手机银行上（本地服务/贵宾出行）以工行的协议优惠价购买消费券，不限使用人，每张券可享受一人/次贵宾服务'
    }
    
    app.showModalMsg(msg)
  }
})