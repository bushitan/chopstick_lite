//app.js
var db = require('db/db.js')
App({
    db:db,
    onLaunch: function () {
        if (wx.cloud) {
            wx.cloud.init({
                env: "relese-chopstick",
                // env: "test-chopstick",
                traceUser: true
            })
        }
        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let capsule = wx.getMenuButtonBoundingClientRect();
                if (capsule) {
                    this.globalData.Custom = capsule;
                    this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
                } else {
                    this.globalData.CustomBar = e.statusBarHeight + 50;
                }
            }
        })

        // this.test()
    },

    getPrePage(){
        var pre = getCurrentPages()[getCurrentPages().length - 2]
        return pre
    },

    test(){
        // debugger
        wx.cloud.callFunction({
            name: 'store',
            data: {
                a: 12,
                b: 19
            }
        }).then(console.log)
    },

    globalData: {
        userInfo: null
    }
})