
class dbBase  {
    KEY_OPENID = "openid"
    KEY_USERID = "userid"
    constructor() {
    }


    login() {
        return new Promise((reslove, reject) => {
            wx.cloud.callFunction({
                name: 'login',
                success: res => {
                    console.log(res.result)
                    reslove(res.result)
                },
                fail: res => {
                    console.log(res.result)
                    reject(res.result)
                },
            })
        })
    }
}

module.exports = dbBase