// const innerAudioContext = wx.createInnerAudioContext({
//   useWebAudioImplement: false // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
// })
Page({
  data: {
    car: "",//当前车辆情况
    picture: [{}],//审核12图片
    material: [{}],
    statustotal:0,
  },
  onLoad: function (options) {
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
    
    let itemnow = JSON.parse(options.itemnow)
    let that = this
    this.setData({ car: itemnow })
    wx.getStorage({
      key: 'token',
      success: (res) => {
        that.setData({ 'token': res.data })
        wx.request({
          url: 'https://xcx.fjdayixin.cn:51608/api/1/list/urls',
          data: {
            "type": 1,
            "taskId": that.data.car.id
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
        wx.request({
          url: 'https://xcx.fjdayixin.cn:51608/api/1/list/urls',
          data: {
            "type": 5,
            "taskId": that.data.car.id
          },
          header: {
            'content-type': 'application/json',
            'token': res.data
          },
          method: 'POST',
          dataType: 'json',
          success: (res) => {
            console.log(res.data.data, 'url2');
            that.setData({ 'material': res.data.data })
          },
          fail: (err) => { console.log(err); },
          complete: () => { }
        });
      },
      fail: () => { },
    })

  },
  audioPlayed: function (e) {
    console.log(e);
    // let ssrc=e.currentTarget.dataset.ssrc
    // innerAudioContext.src = ssrc
    // innerAudioContext.play() // 播放
  },
  paused: function (e) {
    console.log(e);
    // let ssrc=e.currentTarget.dataset.ssrc
    // innerAudioContext.src = ssrc
    // innerAudioContext.pause() // 暂停
  },
  clickImg(e){
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
  
  playaudio(e) {
    let that = this
    let src = e.currentTarget.dataset.src
    let id = e.currentTarget.dataset.id
    this.myaudio = wx.createInnerAudioContext();
    this.myaudio.src = src
    this.myaudio.play();
    this.myaudio.onPlay(() => {
      let str="material["+id+"].status"
      that.setData({
        [str]: 1,
        statustotal:1
      })
    })
  },
  pauseaudio(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    this.myaudio.pause();
    this.myaudio.onPause(() => {
      console.log('播放中');
      let str="material["+id+"].status"
      that.setData({
        [str]: null,
        statustotal:0
      })
    })
  },
  Submit(e) {
    let that = this
    wx.chooseMessageFile({
      count: 10,
      type: "all",
      success: function (res) {
        console.log(res);
        let musicarr = res.tempFiles
        console.log(musicarr);
        for (let j = 0; j < musicarr.length; j++) {
          let numnow = j + 1
          wx.uploadFile({
            url: 'https://xcx.fjdayixin.cn:51608/api/1/upload',
            filePath: musicarr[j].path,
            name: 'file',
            formData: {
              type: 5,
              taskId: that.data.car.id,
              num: '（补交）' + numnow
            },
            header: {
              'token': that.data.token,
            },
            success(res) {
              console.log(res);
              wx.request({
                url: 'https://xcx.fjdayixin.cn:51608/api/1/list/urls',
                data: {
                  "type": 5,
                  "taskId": that.data.car.id
                },
                header: {
                  'content-type': 'application/json',
                  'token': that.data.token
                },
                method: 'POST',
                dataType: 'json',
                success: (res) => {
                  console.log(res.data.data, 'url2');
                  that.setData({ 'material': res.data.data })
                },
                fail: (err) => { console.log(err); },
                complete: () => { }
              });
            }
          })
        }

        wx.showModal({
          title: '补交成功',
          showCancel: false,
          content: '',
          success: function (res) {


          }
        })
      }
    })
  },
  copy: function (e) {
    let item = e.currentTarget.dataset.item;
    wx.setClipboardData({
      data: item,
      success: function (res) {
      }
    });
  },
});

