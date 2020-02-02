//app.js
var db = require('db/db.js')
App({
    db:db,
    onLaunch: function () {
        if (wx.cloud) {
            wx.cloud.init({
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
    },
    globalData: {
        userInfo: null
    }
})