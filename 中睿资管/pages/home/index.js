var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({
  data: {
    navData: ["待找车辆", "已贴G", "在库车辆"],//, "催记记录", "处置"
    currentTab: 0,//当前选择第几个页面
    token: '',
    id: '',
    page: 1,//当前页码
    navScrollLeft: 0,
    xiangmulist: ["全部", "民生", "人保", "正印", "伍捌", "泰隆","通用","中睿汇鑫存量资产","其他"],
    xiangmuindex: 0,
    showlist: [
    ],//当前显示的list
    inputvalue: "",//输入框的值
    groupnow: "",//当前内容
    orderByPrice: 0,
    orderByPriceType: 0,
  },
  onLoad() {
    let that = this
    wx.setVisualEffectOnCapture({
      visualEffect: 'hidden',
      success:(res) => {
        console.log(res)
      },
      fail:(err) => {
        console.log(err)
      },
      complete:(res) => {
        console.log(res)
      }
    })
    
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
    //进入首页看有无token
    wx.getStorage({
      key: 'token',
      success: (res) => {
        that.setData({ 'token': res.data })
        let token = res.data
        wx.getStorage({
          key: 'id',
          success(res) {
            that.setData({ 'id': res.data })
            let id = res.data
            wx.request({
              url: 'https://xcx.fjdayixin.cn:51608/api/1/list/page',
              data: {
                "size": 10, //分页参数
                "page": 1, //分页参数
                "userId": id,
                "type": that.data.currentTab + 1, //1就是第一个页面 2 就是第二个页面 3就是第三个页面
                "keyWord": "",
                "group": null,
                "orderByPrice": 0,
                "orderByPriceType": 0,
              },
              header: {
                'content-type': 'application/json',
                'token': token
              },
              method: 'POST',
              dataType: 'json',
              success: (res) => {
                console.log(res);
                that.setData({ "showlist": res.data.data,page: 1,  })
              },
              fail: (err) => { console.log(err); },
              complete: () => { }
            });
          }
        })

      },
      fail: () => { },
    })
  },
  switchNav(event) {
    console.log('切换');
    let that = this
    let groupnow = null
    let xiangmulist = that.data.xiangmulist
    if (that.data.xiangmuindex != 0) {
      groupnow = xiangmulist[that.data.xiangmuindex]
    }
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({ currentTab: cur, page: 1 })
      let that = this
      wx.request({
        url: 'https://xcx.fjdayixin.cn:51608/api/1/list/page',
        data: {
          "size": 10, //分页参数
          "page": 1, //分页参数
          "userId": that.data.id,
          "type": cur + 1, //1就是第一个页面 2 就是第二个页面 3就是第三个页面
          "keyWord": that.data.inputvalue,
          "group": groupnow,
          "orderByPrice": that.data.orderByPrice,
          "orderByPriceType": that.data.orderByPrice,
        },
        header: {
          'content-type': 'application/json',
          'token': that.data.token
        },
        method: 'POST',
        dataType: 'json',
        success: (res) => {
          console.log(res);
          that.setData({ "showlist": res.data.data, page: 1, })
        },
        fail: (err) => { console.log(err); },
        complete: () => { }
      });
    }
  },
  showdetail(e) {
    console.log(e);
    let num = e.currentTarget.dataset.num
    let itemnow = JSON.stringify(e.currentTarget.dataset.classify)
    if (num == 0)//页面1
    {
      wx.navigateTo({
        url: '../addgps/addgps?itemnow=' + itemnow,
        complete: (res) => { },
        fail: (res) => { },
        success: (result) => { },
      })
    }
    if (num == 1)//页面2
    {
      wx.navigateTo({
        url: '../tiegps/tiegps?itemnow=' + itemnow,
        complete: (res) => { },
        fail: (res) => { },
        success: (result) => { },
      })
    }
    if (num == 2)//页面3
    {
      wx.navigateTo({
        url: '../cardetail/cardetail?itemnow=' + itemnow,
        complete: (res) => { },
        fail: (res) => { },
        success: (result) => { },
      })
    }
  },
  inputevent(e) { this.setData({ inputvalue: e.detail.value }) },
  pickerone(e)//首页筛选器
  {
    console.log(e.detail.value);
    this.setData({ xiangmuindex: e.detail.value })
    let that = this
    let groupnow = null
    let xiangmulist = that.data.xiangmulist
    if (e.detail.value != 0) {
      groupnow = xiangmulist[e.detail.value]
    }
    console.log(groupnow);
    wx.request({
      url: 'https://xcx.fjdayixin.cn:51608/api/1/list/page',
      data: {
        "size": 10, //分页参数
        "page": 1, //分页参数
        "userId": that.data.id,
        "type": that.data.currentTab + 1, //1就是第一个页面 2 就是第二个页面 3就是第三个页面
        "keyWord": that.data.inputvalue,
        "group": groupnow,
        "orderByPrice": that.data.orderByPrice,
        "orderByPriceType": that.data.orderByPrice,
      },
      header: {
        'content-type': 'application/json',
        'token': that.data.token
      },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log(res);
        that.setData({ "showlist": res.data.data ,page: 1,})
      },
      fail: (err) => { console.log(err); },
      complete: () => { }
    });
  },
  search(e) {
    console.log('sousuo');
    let that = this
    let groupnow = null
    let xiangmulist = that.data.xiangmulist
    if (that.data.xiangmuindex != 0) {
      groupnow = xiangmulist[that.data.xiangmuindex]
    }
    wx.request({
      url: 'https://xcx.fjdayixin.cn:51608/api/1/list/page',
      data: {
        "size": 10, //分页参数
        "page": 1, //分页参数
        "userId": that.data.id,
        "type": that.data.currentTab + 1, //1就是第一个页面 2 就是第二个页面 3就是第三个页面
        "keyWord": that.data.inputvalue,
        "group": groupnow,
        "orderByPrice": that.data.orderByPrice,
        "orderByPriceType": that.data.orderByPrice,
      },
      header: {
        'content-type': 'application/json',
        'token': that.data.token
      },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log(res);
        that.setData({ "showlist": res.data.data,page: 1, })
      },
      fail: (err) => { console.log(err); },
      complete: () => { }
    });
  },
  //查看更多
  onReachBottom: function () {
    let that = this
    let page = this.data.page
    let groupnow = null
    let xiangmulist = that.data.xiangmulist
    if (that.data.xiangmuindex != 0) {
      groupnow = xiangmulist[that.data.xiangmuindex]
    }
    console.log(page + 1, that.data.id, that.data.currentTab + 1, that.data.inputvalue, groupnow);
    wx.request({
      url: 'https://xcx.fjdayixin.cn:51608/api/1/list/page',
      data: {
        "size": 10, //分页参数
        "page": page + 1, //分页参数
        "userId": that.data.id,
        "type": that.data.currentTab + 1, //1就是第一个页面 2 就是第二个页面 3就是第三个页面
        "keyWord": that.data.inputvalue,
        "group": groupnow,
        "orderByPrice": that.data.orderByPrice,
        "orderByPriceType": that.data.orderByPrice,
      },
      header: {
        'content-type': 'application/json',
        'token': that.data.token
      },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log(res);
        let showlistnow = res.data.data;
        if (showlistnow.length != 0) {
          let showlist = that.data.showlist;
          let list = [...showlist, ...showlistnow]
          that.setData({ "showlist": list, "page": page + 1 })
        }

      },
      fail: (err) => { console.log(err); },
      complete: () => { }
    });
  },
  onRefresh: function () {
    console.log('refresh');
    let that = this
    //进入首页看有无token
    wx.getStorage({
      key: 'token',
      success: (res) => {
        that.setData({ 'token': res.data})
        let token = res.data
        wx.getStorage({
          key: 'id',
          success(res) {
            let groupnow = null
            let xiangmulist = that.data.xiangmulist
            if (that.data.xiangmuindex != 0) {
              groupnow = xiangmulist[that.data.xiangmuindex]
            }
            that.setData({ 'id': res.data })
            let id = res.data
            wx.request({
              url: 'https://xcx.fjdayixin.cn:51608/api/1/list/page',
              data: {
                "size": 10, //分页参数
                "page": 1, //分页参数
                "userId": id,
                "type": that.data.currentTab + 1, //1就是第一个页面 2 就是第二个页面 3就是第三个页面
                "keyWord": that.data.inputvalue,
                "group": groupnow,
                "orderByPrice": that.data.orderByPrice,
                "orderByPriceType": that.data.orderByPrice,
              },
              header: {
                'content-type': 'application/json',
                'token': token
              },
              method: 'POST',
              dataType: 'json',
              success: (res) => {
                console.log(res);
                that.setData({ "showlist": res.data.data,page: 1 })

              },
              fail: (err) => { wx.stopPullDownRefresh(); },
              complete: () => { wx.stopPullDownRefresh(); }
            });
          }
        })

      },
      fail: () => {
        wx.stopPullDownRefresh();
      },
    })

  },
  onPullDownRefresh: function () {
    this.onRefresh();
  },
  cancel(e) {
    this.setData({ inputvalue: "" })
    this.onRefresh();
  },
  classifychange(e) {
    let that = this
    console.log(e);
    let num = e.currentTarget.dataset.num
    let num2 = e.currentTarget.dataset.num2
    that.setData({
      orderByPrice: num,
      orderByPriceType: num2,
    })
    let groupnow = null
    let xiangmulist = that.data.xiangmulist
    if (that.data.xiangmuindex != 0) {
      groupnow = xiangmulist[that.data.xiangmuindex]
    }
    wx.request({
      url: 'https://xcx.fjdayixin.cn:51608/api/1/list/page',
      data: {
        "size": 10, //分页参数
        "page": 1, //分页参数
        "userId": that.data.id,
        "type": that.data.currentTab + 1, //1就是第一个页面 2 就是第二个页面 3就是第三个页面
        "keyWord": that.data.inputvalue,
        "group": groupnow,
        "orderByPrice": num,
        "orderByPriceType": num2,
      },
      header: {
        'content-type': 'application/json',
        'token': that.data.token
      },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log(res);
        let showlistnow = res.data.data;
        that.setData({ "showlist": showlistnow,page: 1,  })
      },
      fail: (err) => { console.log(err); },
      complete: () => { }
    });
  },
  shownewres(e){
    console.log('渲染新数据');
    let that=this
    let groupnow = null
    let xiangmulist = that.data.xiangmulist
    if (that.data.xiangmuindex != 0) {
      groupnow = xiangmulist[that.data.xiangmuindex]
    }
    wx.request({
      url: 'https://xcx.fjdayixin.cn:51608/api/1/list/page',
      data: {
        "size": 10, //分页参数
        "page": 1, //分页参数
        "userId": that.data.id,
        "type": that.data.currentTab + 1, //1就是第一个页面 2 就是第二个页面 3就是第三个页面
        "keyWord": that.data.inputvalue,
        "group": groupnow,
        "orderByPrice": that.data.orderByPrice,
        "orderByPriceType": that.data.orderByPriceType,
      },
      header: {
        'content-type': 'application/json',
        'token': that.data.token
      },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log(res,'新数据');
        let showlistnow = res.data.data;
        that.setData({ "showlist": showlistnow,page: 1,  })
      },
      fail: (err) => { console.log(err); },
      complete: () => { console.log('完成');}
    });
  }

})
