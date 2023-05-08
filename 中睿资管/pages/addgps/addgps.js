Page({
  data: {
    picture: [],//车辆图片
    car: "",//当前车辆情况
    token: "",
    userid: "",
    gpschangepicture: [],//定位变动图片
    bohuireason: "",
    addgpsnum: 0,
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

    let that = this
    let itemnow = JSON.parse(options.itemnow)
    this.setData({ car: itemnow })
    wx.getStorage({
      key: 'token',
      success: (res) => {
        let token = res.data
        that.setData({ 'token': res.data })
        wx.getStorage({
          key: 'nickname',
          success: (res) => {
            that.setData({ 'nickname': res.data })
          },
          fail: () => { },
        })
        wx.getStorage({
          key: 'id',
          success: (res) => {
            that.setData({ 'userid': res.data })
            if (itemnow.isRemarkOne == 4) {
              wx.request({
                url: 'https://xcx.fjdayixin.cn:51608/api/1/get/record',
                data: {
                  type: 1,
                  taskId: itemnow.id
                },
                header: {
                  'content-type': 'application/json',
                  'token': token
                },
                method: 'POST',
                dataType: 'json',
                success: (res) => {
                  console.log(res, '驳回理由');
                  let now = res.data.data.length
                  that.setData({ bohuireason: res.data.data[now - 1].text })
                },
                fail: (err) => { console.log(err); },
                complete: () => { }
              });
            }
            if (itemnow.isRemarkOne == 3) {
              wx.request({
                url: 'https://xcx.fjdayixin.cn:51608/api/1/list/urls',
                data: {
                  type: 1,
                  taskId: itemnow.id
                },
                header: {
                  'content-type': 'application/json',
                  'token': token
                },
                method: 'POST',
                dataType: 'json',
                success: (res) => {
                  console.log(res, '审核图片');

                  that.setData({ picture: res.data.data })
                },
                fail: (err) => { console.log(err); },
                complete: () => { }
              });
            }
          },
          fail: () => { },
        })
      },
      fail: () => { },
    })

  },
  //上传图片
  UpLoadPicture(e) {
    let that = this;
    wx.chooseMedia({
      count: 3,
      mediaType: ['image'],
      sourceType: ['album'],
      camera: 'back',
      success: res => {
        console.log(res, '图片链接');
        that.setData({ picture: res.tempFiles })
      }
    })
  },
  //上传数据
  Submit(e) {
    let that = this
    let picture = that.data.picture
    if (picture.length != 0) {
      if (that.data.addgpsnum == 0) {
        that.setData({ addgpsnum: 1 })
        wx.request({
          url: 'https://xcx.fjdayixin.cn:51608/api/1/check/1',
          data: {
            userId: that.data.userid,
            taskId: that.data.car.id
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
              title: '贴g申请提交成功',
              showCancel: false,
              success: function (res) {
                let pages = getCurrentPages();   //获取小程序页面栈
                let beforePage = pages[pages.length - 2];  //获取上个页面的实例对象
                beforePage.shownewres();   //触发上个页面自定义的go_update方法
                wx.navigateBack({
                  delta: 1
                })
              }
            })
            for (let i = 0; i < picture.length; i++) {
              wx.uploadFile({
                url: 'https://xcx.fjdayixin.cn:51608/api/1/upload',
                filePath: picture[i].tempFilePath,
                name: 'file',
                formData: {
                  type: 1,
                  taskId: that.data.car.id,
                  num: i + 1
                },
                header: {
                  'token': that.data.token,
                },
                success(res) {
                  console.log(res);
                }
              })
            }
          },
          fail: (err) => { console.log(err); },
          complete: () => {

          }
        });

      }

    }
    else {
      wx.showModal({
        title: '请上传图片',
        showCancel: false,
        success: function (res) {
        }
      })
    }

  },
  shenqinbiandong(e) {
    let that = this
    wx.showModal({
      title: '定位变动',
      showCancel: true,
      content: '请提交两张图片\n1.车辆定位系统后台截图\n2.车辆实际所在位置图片\n',
      success: function (res) {
        console.log(res);
        if (res.confirm == true) {
          wx.chooseMedia({
            count: 2,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            camera: 'back',
            success: res => {
              let gpspic = res.tempFiles
              console.log(gpspic, '图片链接');
              wx.request({
                url: 'https://xcx.fjdayixin.cn:51608/api/1/check/2',
                data: {
                  userId: that.data.userid,
                  taskId: that.data.car.id
                },
                header: {
                  'content-type': 'application/json',
                  'token': that.data.token
                },
                method: 'POST',
                dataType: 'json',
                success: (res) => {
                  console.log(res);
                  that.setData({ ['car.isRemarkTwo']: 3 })
                  for (let i = 0; i < gpspic.length; i++) {
                    wx.uploadFile({
                      url: 'https://xcx.fjdayixin.cn:51608/api/1/upload',
                      filePath: gpspic[i].tempFilePath,
                      name: 'file',
                      formData: {
                        type: 2,
                        taskId: that.data.car.id,
                        num: i + 1
                      },
                      header: {
                        'token': that.data.token,
                      },
                      success(res) {
                        console.log(res);
                      }
                    })
                  }
                },
                fail: (err) => { console.log(err); },
                complete: () => {
                  wx.showModal({
                    title: '变动申请提交成功',
                    showCancel: false,
                    success: function (res) { }
                  })
                }
              });
            }
          })
        }

      }
    })
  },
  clickImg(e) {
    console.log(e);
    var imgUrl = e.currentTarget.dataset.presrc;
    wx.previewImage({
      urls: [imgUrl], //需要预览的图片https链接列表，注意是数组
      current: '', // 当前显示图片的https链接，默认是第一个
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  picmodal() {
    let urlarr = ["http://image.fzuhuahuo.cn/%E8%B4%B4g%E7%A4%BA%E4%BE%8B%E5%9B%BE1.jpg", "http://image.fzuhuahuo.cn/%E8%B4%B4g%E7%A4%BA%E4%BE%8B%E5%9B%BE2.jpg"]
    wx.previewImage({
      urls: urlarr, //需要预览的图片https链接列表，注意是数组
      current: '', // 当前显示图片的https链接，默认是第一个
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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
    console.log(that.data.fillingreason);
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