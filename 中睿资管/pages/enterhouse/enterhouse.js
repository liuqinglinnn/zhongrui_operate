Page({
  data: {
    usepeople: ["车主本人", "二押", "其他", "不详"],
    usepeopleindex: 0,
    picture1: [],
    music2: [],
    picture3: [],
    videoarr4: [],
    videoarr5: [],
    videoarr6: [],
    videoarr7: [],
    picture8: [],
    picture9: [],
    huishoudate: "2022-06-01",
    huishoutime: "00:00",
    rukucangku: null,
    cheshangdianhua: "",
    cheyaoshi: ["有", "没有", "不详"],
    cheyaoshiindex: 0,
    xingshizheng: ["有", "没有", "不详"],
    xingshizhengindex: 0,
    chekuangmiaoshu: "",
    cheneiwupingmiaoshu: "",
    songdacheku: "",
    token: "",
    userid: "",
    enterhousenum: 0,
    latitude: 0,
    longitude: 0,
    protectPerson: "",
    protectTime: "2022-06-01",
    protectText: "",
    protectMind: "不详",
    protectWay: "",
  },
  onLoad(options) {
    let itemnow = JSON.parse(options.itemnow)
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


    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    console.log("当前时间：" + Y + '年'  + M+ '月' + D+ '日' );
    let datanow=  Y + '-'  + M+ '-' + D

    this.setData({ car: itemnow,protectTime:datanow,huishoudate:datanow })
    wx.getStorage({
      key: 'token',
      success: (res) => {
        that.setData({ 'token': res.data })
        wx.getStorage({
          key: 'id',
          success: (res) => {
            that.setData({ 'id': res.data })
          },
          fail: () => { },
        })
      },
      fail: () => { },
    })
  },
  susepeople(e) { this.setData({ usepeopleindex: e.detail.value }) },
  shuishoudate(e) { this.setData({ huishoudate: e.detail.value }) },
  sprotectPerson(e) { this.setData({ protectPerson: e.detail.value }) },
  sprotectWay(e) { this.setData({ protectWay: e.detail.value }) },
  baoquandate(e) { this.setData({ protectTime: e.detail.value }) },
  sprotectText(e) { this.setData({ protectText: e.detail.value }) },
  sprotectMind(e) { this.setData({ protectMind: e.detail.value }) },
  shuishoutime(e) { this.setData({ huishoutime: e.detail.value }) },
  scheshangdianhua(e) { this.setData({ cheshangdianhua: e.detail.value }) },
  scheyaoshi(e) { this.setData({ cheyaoshiindex: e.detail.value }) },
  sxingshizheng(e) { this.setData({ xingshizhengindex: e.detail.value }) },
  schekuangmiaoshu(e) { this.setData({ chekuangmiaoshu: e.detail.value }) },
  scheneiwupingmiaoshu(e) { this.setData({ cheneiwupingmiaoshu: e.detail.value }) },
  ssongdacheku(e) { this.setData({ songdacheku: e.detail.value }) },
  Chooseaddress(e) {
    let that = this
    console.log(e);
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        let address = res.name
        let la = res.latitude
        let lo = res.longitude
        console.log(address, la, lo);
        that.setData({
          rukucangku: address,
          latitude: la,
          longitude: lo
        })
      },
    })
  },
  //上传数据
  Submit(e) {
    let that = this
    if (that.data.songdacheku == "") {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请填写送达仓库',
        success: function (res) { }
      })
    }
    else if (that.data.chekuangmiaoshu == "") {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请填写车况描述',
        success: function (res) { }
      })
    }
    else if (that.data.rukucangku == null) {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请获取入库仓库定位',
        success: function (res) { }
      })
    }
    else if (that.data.cheneiwupingmiaoshu == "") {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请填写车内物品描述',
        success: function (res) { }
      })
    }
    else if (that.data.protectTime == "") {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请填写保全时间',
        success: function (res) { }
      })
    }
    else if (that.data.protectText == "") {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请填写保全经过',
        success: function (res) { }
      })
    }
    else if (that.data.protectMind == "") {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请填写过户意愿',
        success: function (res) { }
      })
    }
    else if (that.data.protectWay == "") {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请填写过户方式',
        success: function (res) { }
      })
    }
    else if (that.data.picture1.length == 0) {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请上传告知函与车牌合影',
        success: function (res) { }
      })
    }
    else if (that.data.music2.length == 0) {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请上传电话录音与通话截图',
        success: function (res) { }
      })
    }
    else if (that.data.picture3.length == 0) {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请上传短信两条截图',
        success: function (res) { }
      })
    }
    else if (that.data.videoarr4.length == 0) {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请上传上板视频',
        success: function (res) { }
      })
    }
    else if (that.data.videoarr5.length == 0) {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请上传清收过程视频',
        success: function (res) { }
      })
    }
    else if (that.data.videoarr6.length == 0) {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请上传下板视频',
        success: function (res) { }
      })
    }
    else if (that.data.videoarr7.length == 0) {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请上传入库绕车一周视频（若开车门拍全程视频）',
        success: function (res) { }
      })
    }
    else if (that.data.picture8.length == 0) {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请上传车辆情况图',
        success: function (res) { }
      })
    }
    else if (that.data.picture9.length == 0) {
      wx.showModal({
        title: '入库失败',
        showCancel: false,
        content: '请上传入库单',
        success: function (res) { }
      })
    }
    else {
      if (that.data.enterhousenum == 0) {
        that.setData({ enterhousenum: 1 })
        console.log(that.data.huishoudate + ' ' + that.data.huishoutime + ':00');
        wx.request({
          url: 'https://xcx.fjdayixin.cn:51608/api/1/inbox',
          data: {
            actualUser: that.data.usepeople[that.data.usepeopleindex],
            carConditionDes: that.data.chekuangmiaoshu,
            carPhone: that.data.cheshangdianhua,
            hasKey: that.data.cheyaoshiindex,
            hasLicense: that.data.xingshizhengindex,
            inboxWare: that.data.rukucangku,
            itemsInCarDes: that.data.cheneiwupingmiaoshu,
            recoveryTime: that.data.huishoudate + ' ' + that.data.huishoutime + ':00',
            sentGarage: that.data.songdacheku,
            taskId: that.data.car.id,
            userId: that.data.id,
            longitude: that.data.longitude,
            latitude: that.data.latitude,
            protectPerson: that.data.protectPerson,
            protectTime: that.data.protectTime,
            protectText: that.data.protectText,
            protectMind: that.data.protectMind,
            protectWay: that.data.protectWay,
          },
          header: {
            'content-type': 'application/json',
            'token': that.data.token
          },
          method: 'POST',
          dataType: 'json',
          success: (res) => {
            console.log(res);
            let picture1 = that.data.picture1
            let music2 = that.data.music2
            let picture3 = that.data.picture3
            let videoarr4 = that.data.videoarr4
            let videoarr5 = that.data.videoarr5
            let videoarr6 = that.data.videoarr6
            let videoarr7 = that.data.videoarr7
            let picture8 = that.data.picture8
            let picture9 = that.data.picture9
            wx.showModal({
              title: '入库成功',
              showCancel: false,
              content: '',
              success: function (res) {
                let pages = getCurrentPages();   //获取小程序页面栈
                let beforePage = pages[pages.length - 3];  //获取上个页面的实例对象
                beforePage.shownewres();   //触发上个页面自定义的go_update方法
                wx.navigateBack({
                  delta: 2
                })
              }
            })
            for (let i = 0; i < picture1.length; i++) {
              wx.uploadFile({
                url: 'https://xcx.fjdayixin.cn:51608/api/1/upload',
                filePath: picture1[i].path,
                name: 'file',
                formData: {
                  type: 5,
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
            for (let j = 0; j < music2.length; j++) {
              wx.uploadFile({
                url: 'https://xcx.fjdayixin.cn:51608/api/1/upload',
                filePath: music2[j].path,
                name: 'file',
                formData: {
                  type: 5,
                  taskId: that.data.car.id,
                  num: j + picture1.length + 1
                },
                header: {
                  'token': that.data.token,
                },
                success(res) {
                  console.log(res);
                }
              })
            }
            for (let k = 0; k < picture3.length; k++) {
              wx.uploadFile({
                url: 'https://xcx.fjdayixin.cn:51608/api/1/upload',
                filePath: picture3[k].path,
                name: 'file',
                formData: {
                  type: 5,
                  taskId: that.data.car.id,
                  num: k + picture1.length + 1 + music2.length
                },
                header: {
                  'token': that.data.token,
                },
                success(res) {
                  console.log(res);
                }
              })
            }
            for (let k2 = 0; k2 < videoarr4.length; k2++) {
              wx.uploadFile({
                url: 'https://xcx.fjdayixin.cn:51608/api/1/upload',
                filePath: videoarr4[k2].path,
                name: 'file',
                formData: {
                  type: 5,
                  taskId: that.data.car.id,
                  num: k2 + picture1.length + 1 + music2.length + picture3.length
                },
                header: {
                  'token': that.data.token,
                },
                success(res) {
                  console.log(res);
                }
              })
            }
            for (let k3 = 0; k3 < videoarr5.length; k3++) {
              wx.uploadFile({
                url: 'https://xcx.fjdayixin.cn:51608/api/1/upload',
                filePath: videoarr5[k3].path,
                name: 'file',
                formData: {
                  type: 5,
                  taskId: that.data.car.id,
                  num: k3 + picture1.length + 1 + music2.length + picture3.length + videoarr4.length
                },
                header: {
                  'token': that.data.token,
                },
                success(res) {
                  console.log(res);
                }
              })
            }
            for (let k4 = 0; k4 < videoarr6.length; k4++) {
              wx.uploadFile({
                url: 'https://xcx.fjdayixin.cn:51608/api/1/upload',
                filePath: videoarr6[k4].path,
                name: 'file',
                formData: {
                  type: 5,
                  taskId: that.data.car.id,
                  num: k4 + picture1.length + 1 + music2.length + picture3.length + videoarr4.length + videoarr5.length
                },
                header: {
                  'token': that.data.token,
                },
                success(res) {
                  console.log(res);
                }
              })
            }
            for (let k5 = 0; k5 < videoarr7.length; k5++) {
              wx.uploadFile({
                url: 'https://xcx.fjdayixin.cn:51608/api/1/upload',
                filePath: videoarr7[k5].path,
                name: 'file',
                formData: {
                  type: 5,
                  taskId: that.data.car.id,
                  num: k5 + picture1.length + 1 + music2.length + picture3.length + videoarr4.length + videoarr5.length + videoarr6.length
                },
                header: {
                  'token': that.data.token,
                },
                success(res) {
                  console.log(res);
                }
              })
            }
            for (let k6 = 0; k6 < picture8.length; k6++) {
              wx.uploadFile({
                url: 'https://xcx.fjdayixin.cn:51608/api/1/upload',
                filePath: picture8[k6].path,
                name: 'file',
                formData: {
                  type: 5,
                  taskId: that.data.car.id,
                  num: k6 + picture1.length + 1 + music2.length + picture3.length + videoarr4.length + videoarr5.length + videoarr6.length + videoarr7.length
                },
                header: {
                  'token': that.data.token,
                },
                success(res) {
                  console.log(res);
                }
              })
            }
            for (let k7 = 0; k7 < picture9.length; k7++) {
              wx.uploadFile({
                url: 'https://xcx.fjdayixin.cn:51608/api/1/upload',
                filePath: picture9[k7].path,
                name: 'file',
                formData: {
                  type: 5,
                  taskId: that.data.car.id,
                  num: k7 + picture1.length + 1 + music2.length + picture3.length + videoarr4.length + videoarr5.length + videoarr6.length + videoarr7.length + picture8.length
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
          complete: () => { }
        });

      }


    }

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
  material() {
    wx.navigateTo({
      url: '../etemplate/etemplate',
      success: (result) => { },
      fail: (res) => { },
      complete: (res) => { },
    })
  },



  choosepicture1(e) {
    let that = this
    // wx.chooseMedia({
    //   count: 10,
    //   mediaType: ['image'],
    //   sourceType: ['album', 'camera'],
    //   camera: 'back',
    //   success: res => {
    //     let a = res.tempFiles
    //     let b = that.data.picture1
    //     b.push.apply(b, a)
    //     that.setData({ picture1: b })
    //   }
    // })
    wx.chooseMessageFile({
      count: 10,
      type: "all",
      success: function (res) {
        let a = res.tempFiles
        let b = that.data.picture1
        b.push.apply(b, a)
        console.log(b);
        that.setData({ picture1: b })
      }
    })
  },
  choosefile2(e) {
    let that = this
    wx.chooseMessageFile({
      count: 10,
      type: "all",
      success: function (res) {
        let a = res.tempFiles
        let b = that.data.music2
        b.push.apply(b, a)
        that.setData({ music2: b })
      }
    })
  },
  choosepicture3(e) {
    let that = this
    // wx.chooseMedia({
    //   count: 10,
    //   mediaType: ['image'],
    //   sourceType: ['album', 'camera'],
    //   camera: 'back',
    //   success: res => {
    //     let a = res.tempFiles
    //     let b = that.data.picture3
    //     b.push.apply(b, a)
    //     that.setData({ picture3: b })
    //   }
    // })
    wx.chooseMessageFile({
      count: 10,
      type: "all",
      success: function (res) {
        let a = res.tempFiles
        let b = that.data.picture3
        b.push.apply(b, a)
        that.setData({ picture3: b })
      }
    })
  },
  choosevideo4(e) {
    let that = this
    // wx.chooseMedia({
    //   count: 10,
    //   mediaType: ['video'],
    //   sourceType: ['album', 'camera'],
    //   camera: 'back',
    //   success: res => {
    //     let a = res.tempFiles
    //     let b = that.data.videoarr4
    //     b.push.apply(b, a)
    //     that.setData({ videoarr4: b })
    //   }
    // })
    wx.chooseMessageFile({
      count: 10,
      type: "all",
      success: function (res) {
        let a = res.tempFiles
        let b = that.data.videoarr4
        b.push.apply(b, a)
        that.setData({ videoarr4: b })
      }
    })
  },
  choosevideo5(e) {
    let that = this
    // wx.chooseMedia({
    //   count: 10,
    //   mediaType: ['video'],
    //   sourceType: ['album', 'camera'],
    //   camera: 'back',
    //   success: res => {
    //     let a = res.tempFiles
    //     let b = that.data.videoarr5
    //     b.push.apply(b, a)
    //     that.setData({ videoarr5: b })
    //   }
    // })
    wx.chooseMessageFile({
      count: 10,
      type: "all",
      success: function (res) {
        let a = res.tempFiles
        let b = that.data.videoarr5
        b.push.apply(b, a)
        that.setData({ videoarr5: b })
      }
    })
  },
  choosevideo6(e) {
    let that = this
    // wx.chooseMedia({
    //   count: 10,
    //   mediaType: ['video'],
    //   sourceType: ['album', 'camera'],
    //   camera: 'back',
    //   success: res => {
    //     let a = res.tempFiles
    //     let b = that.data.videoarr6
    //     b.push.apply(b, a)
    //     that.setData({ videoarr6: b })
    //   }
    // })
    wx.chooseMessageFile({
      count: 10,
      type: "all",
      success: function (res) {
        let a = res.tempFiles
        let b = that.data.videoarr6
        b.push.apply(b, a)
        that.setData({ videoarr6: b })
      }
    })
  },
  choosevideo7(e) {
    let that = this
    // wx.chooseMedia({
    //   count: 10,
    //   mediaType: ['video'],
    //   sourceType: ['album', 'camera'],
    //   camera: 'back',
    //   success: res => {
    //     let a = res.tempFiles
    //     let b = that.data.videoarr7
    //     b.push.apply(b, a)
    //     that.setData({ videoarr7: b })
    //   }
    // })
    wx.chooseMessageFile({
      count: 10,
      type: "all",
      success: function (res) {
        let a = res.tempFiles
        let b = that.data.videoarr7
        b.push.apply(b, a)
        that.setData({ videoarr7: b })
      }
    })
  },
  choosepicture8(e) {
    let that = this
    // wx.chooseMedia({
    //   count: 10,
    //   mediaType: ['image'],
    //   sourceType: ['album', 'camera'],
    //   camera: 'back',
    //   success: res => {
    //     let a = res.tempFiles
    //     let b = that.data.picture8
    //     b.push.apply(b, a)
    //     that.setData({ picture8: b })
    //   }
    // })
    wx.chooseMessageFile({
      count: 10,
      type: "all",
      success: function (res) {
        let a = res.tempFiles
        let b = that.data.picture8
        b.push.apply(b, a)
        that.setData({ picture8: b })
      }
    })
  },
  choosepicture9(e) {
    let that = this
    // wx.chooseMedia({
    //   count: 10,
    //   mediaType: ['image'],
    //   sourceType: ['album', 'camera'],
    //   camera: 'back',
    //   success: res => {
    //     let a = res.tempFiles
    //     let b = that.data.picture9
    //     b.push.apply(b, a)
    //     that.setData({ picture9: b })
    //   }
    // })
    wx.chooseMessageFile({
      count: 10,
      type: "all",
      success: function (res) {
        let a = res.tempFiles
        let b = that.data.picture9
        b.push.apply(b, a)
        that.setData({ picture9: b })
      }
    })
  },
  deletefile1(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    let arr = that.data.picture1
    console.log(e);
    wx.showModal({
      title: '提示',
      content: '确定要删除此文件吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          arr.splice(index, 1)
          that.setData({ picture1: arr })

        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
      }
    })
  },
  deletefile2(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    let arr = that.data.music2
    console.log(e);
    wx.showModal({
      title: '提示',
      content: '确定要删除此文件吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          arr.splice(index, 1)
          that.setData({ music2: arr })
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
      }
    })
  },
  deletefile3(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    let arr = that.data.picture3
    console.log(e);
    wx.showModal({
      title: '提示',
      content: '确定要删除此文件吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          arr.splice(index, 1)
          that.setData({ picture3: arr })
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
      }
    })
  },
  deletefile4(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    let arr = that.data.videoarr4
    console.log(e);
    wx.showModal({
      title: '提示',
      content: '确定要删除此文件吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          arr.splice(index, 1)
          that.setData({ videoarr4: arr })
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
      }
    })
  },
  deletefile5(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    let arr = that.data.videoarr5
    console.log(e);
    wx.showModal({
      title: '提示',
      content: '确定要删除此文件吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          arr.splice(index, 1)
          that.setData({ videoarr5: arr })
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
      }
    })
  },
  deletefile6(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    let arr = that.data.videoarr6
    console.log(e);
    wx.showModal({
      title: '提示',
      content: '确定要删除此文件吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          arr.splice(index, 1)
          that.setData({ videoarr6: arr })
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
      }
    })
  },
  deletefile7(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    let arr = that.data.videoarr7
    console.log(e);
    wx.showModal({
      title: '提示',
      content: '确定要删除此文件吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          arr.splice(index, 1)
          that.setData({ videoarr7: arr })
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
      }
    })
  },
  deletefile8(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    let arr = that.data.picture8
    console.log(e);
    wx.showModal({
      title: '提示',
      content: '确定要删除此文件吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          arr.splice(index, 1)
          that.setData({ picture8: arr })
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
      }
    })
  },
  deletefile9(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    let arr = that.data.picture9
    console.log(e);
    wx.showModal({
      title: '提示',
      content: '确定要删除此文件吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          arr.splice(index, 1)
          that.setData({ picture9: arr })
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
      }
    })
  },
})