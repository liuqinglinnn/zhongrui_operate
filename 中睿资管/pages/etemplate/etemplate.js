
Page({
  data: {
    picture: [],
    material: [{}],
    nuokupop: false,
    nuokuinput: "",
    token: "",
    downloadpop: false,
    downloadurl: "",
    remarkpop: false,
    remarkvalue: "",
    statustotal: null,
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
  },
  audioPlayed: function (e) {
    console.log(e);
  },
  paused: function (e) {
    console.log(e);
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
  playaudio(e) {
    let that = this
    let src = e.currentTarget.dataset.src
    this.myaudio = wx.createInnerAudioContext();
    this.myaudio.src = src
    this.myaudio.play();
    this.myaudio.onPlay(() => {
      that.setData({
        statustotal: 1
      })
    })
  },
  pauseaudio(e) {
    let that = this
    this.myaudio.pause();
    this.myaudio.onPause(() => {
      console.log('播放中');
      that.setData({
        statustotal: null
      })
    })
  },

});

