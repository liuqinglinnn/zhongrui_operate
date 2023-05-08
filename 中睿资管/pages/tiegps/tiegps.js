Page({
  data: {
    car: "",
    picture: [{}],
    token: "",
    timepop: false,
    timereason: "",
    bohuireason: "",
    userid: "",
    fillingpop: false,
    fillingreason: "",
    nickname: "",
  },
  zhaopiantanchuang(e) {
    wx.showModal({
      title: '照片要求',
      showCancel: false,
      content: '图片1包含车牌号信息（带水印）\n图片2包含车架号信息（带水印）\n图片3包含车辆照片（带水印）',
      success: function (res) { }
    })

  },
  onLoad: function (options) {
    wx.setVisualEffectOnCapture({
      visualEffect: 'hidden',
      success: (res) => {
        console.log(res)
      },
      fail: (err) => {
        console.log(err)
      },
      complete: (res) => {
        console.log(res)
      }
    })

    let itemnow = JSON.parse(options.itemnow)
    let that = this
    this.setData({ car: itemnow })
    wx.getStorage({
      key: 'token',
      success: (res) => {
        that.setData({ 'token': res.data })
        let token = res.data
        wx.getStorage({
          key: 'id',
          success: (res) => {
            wx.getStorage({
              key: 'nickname',
              success: (res) => {
                that.setData({ 'nickname': res.data })
              },
              fail: () => { },
            })
            that.setData({ 'userid': res.data })
            if (itemnow.isRemarkFifth == 4) {
              wx.request({
                url: 'https://xcx.fjdayixin.cn:51608/api/1/list/add/record/' + itemnow.id,
                header: {
                  'content-type': 'application/json',
                  'token': token
                },
                method: 'GET',
                dataType: 'json',
                success: (res) => {
                  console.log(res, '获取所有字段');
                  let resarr = res.data.data
                  for (let i = 0; i < resarr.length; i++) {
                    if (resarr[i].isNew == 1) {
                      that.setData({ bohuireason: resarr[i].rejectText })
                    }
                  }
                },
                fail: (err) => { console.log(err); },
                complete: () => { }
              });
            }
          },
          fail: () => { },
        })
        wx.request({
          url: 'https://xcx.fjdayixin.cn:51608/api/1/list/urls',
          data: {
            "type": 1,
            "taskId": itemnow.id
          },
          header: {
            'content-type': 'application/json',
            'token': res.data
          },
          method: 'POST',
          dataType: 'json',
          success: (res) => {
            console.log(res.data.data, 'url');
            that.setData({ picture: res.data.data })
          },
          fail: (err) => { console.log(err); },
          complete: () => { }
        });
      },
      fail: () => { },
    })

  },
  baobeiruku(e) {
    let that = this
    let itemnow = JSON.stringify(that.data.car)
    wx.navigateTo({
      url: '../enterhouse/enterhouse?itemnow=' + itemnow,
      complete: (res) => { },
      fail: (res) => { },
      success: (result) => { },
    })
  },
  clickImg(e) {
    console.log(e);
    var imgUrl = e.currentTarget.dataset.presrc;
    wx.previewImage({
      urls: [imgUrl],
      current: '',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  yanchangtime() {
    let that = this
    that.setData({ timepop: !that.data.timepop })
  },
  timeinput(e) {
    this.setData({ timereason: e.detail.value })
  },
  timeconfirm(e) {
    let that = this
    if(that.data.timereason!="")
    { wx.request({
      url: 'https://xcx.fjdayixin.cn:51608/api/1/sub/add/time',
      data: {
        userId: that.data.userid,
        taskId: that.data.car.id,
        text: that.data.timereason,
      },
      header: {
        'content-type': 'application/json',
        'token': that.data.token
      },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log(res);
        wx.showModal({
          title: '提交成功',
          showCancel: false,
          success: function (res) {
            let pages = getCurrentPages();
            let beforePage = pages[pages.length - 2];
            beforePage.shownewres();
            wx.navigateBack({
              delta: 1
            })
          }
        })
      },
      fail: (err) => {
        console.log(err);

      },
      complete: () => { }
    });

    }
    else{
      wx.showModal({
        title: '请填写原因',
        showCancel: false,
        success: function (res) {
  
        }
      })
    }
   
  },
  changefilling(e) {
    this.setData({ fillingpop: !this.data.fillingpop })
  },
  changefillingconfirm(e) {
    let that = this
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    console.log("当前时间：" + Y + '年' + M + '月' + D + '日');
    let datanow = Y + '-' + M + '-' + D
    wx.request({
      url: 'https://xcx.fjdayixin.cn:51608/api/1/update/filling',
      data: {
        id: that.data.car.id,
        fillingPerson: that.data.nickname,
        fillingTime: datanow,
        fillingSituation: that.data.fillingreason
      },
      header: {
        'content-type': 'application/json',
        'token': that.data.token
      },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log(res);
        wx.showModal({
          title: '修改成功',
          showCancel: false,
          content: '',
          success: function (res) {
            that.setData({ fillingpop: !that.data.fillingpop })
            let pages = getCurrentPages();   //获取小程序页面栈
            let beforePage = pages[pages.length - 2];  //获取上个页面的实例对象
            beforePage.shownewres();   //触发上个页面自定义的go_update方法
            that.setData({ ['car.fillingSituation']: that.data.fillingreason, fillingreason: "" })
          }
        })
      },
      fail: (err) => { console.log(err); },
      complete: () => { }
    });
  },
  fillingreasoninput(e) {
    this.setData({ 'fillingreason': e.detail.value })
  },
  copy: function (e) {
    let item = e.currentTarget.dataset.item;
    wx.setClipboardData({
      data: item,
      success: function (res) {
      }
    });
  },
})