Page({
    data: {
        "username": null,
        "password": null,
        "id": "",
        "userid": "",
        "nickname": "登录",
        "userpicture": "/icon/admin.png",
        "level": 0
    },
    onShow(options) {
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
        
        wx.getStorage({
            key: 'id',
            success: (res) => {
                that.setData({ 'id': res.data })
                wx.getStorage({
                    key: 'nickname',
                    success: (res) => {
                        console.log('nickname', res.data);
                        that.setData({ 'nickname': res.data })
                        wx.getStorage({
                            key: 'level',
                            success: (res) => {
                                that.setData({ 'level': res.data })
                            },
                            fail: () => { },
                        })
                    },
                    fail: () => { },
                })
            },
            fail: () => { },
        })
    },

    tuichudenglu(e) {
        wx.clearStorage()
        this.setData({
            "id": "",
            "userid": "",
            "nickname": "登录",
            "level": 0
        })
        wx.navigateTo({
            url: '../head/head',
        })
    },
    noopearte(e) {
        wx.showModal({
            title: '权限不足',
            showCancel: false,
            content: '你没有权限访问',
            success: function (res) { }
        })
    }
})