
class QRCup {
    config = {}   // 配置表
    stepList = [] // 步骤列表
    color = "#1d2a6d"
    constructor() {
        this.config = {
            width: 1240,
            height: 1748, 
            backgroundColor:"#ffffff",
            debug: false,
            pixelRatio: 1,
            blocks: [],
            texts: [],
            images: [{  //头图
                width: 1240,
                height: 1748,
                x: 0,
                y: 0,
                url: '/images/cover/template_bg.png',
            }],
        }
    }
    
    /**
     * @method 获取最后的配置结果
     */
    getConfigData() {
        return this.config
    }

    downCloudImage(fileID){
        return new Promise((resolve, reject) => {
            if (fileID) {
                wx.showLoading({})
                wx.cloud.downloadFile({
                    fileID: fileID,
                    success: res => {
                        wx.hideLoading()
                        console.log(res)
                        resolve(res.tempFilePath)
                    },
                    fail: err => {
                        console.log(err)
                        wx.showModal({
                            title: "下载文件失败",
                        })
                    }
                })
            } else
                resolve("")
        })
    }

    async start(obj) {        
        var qr = await this.downCloudImage(obj.qrUrl)
        var logo = await this.downCloudImage(obj.logo)
        var name = obj.name
        var tel = obj.tel
        this._addQR(qr, logo)
        this._addTitle(name)
        this._addTel(tel)
    }

    _addQR(qrUrl, logo){
        var qr = qrUrl || '../../images/cover/template_qr.png'
        var logo = logo || '../../images/cover/template_logo.jpg'
        var baseX = 445, baseY = 458
        this.config.images.push({ x: baseX, y: baseY, width: 350, height: 350, url: qr, })
        this.config.images.push({ x: baseX + 98, y: baseY + 98, width: 155, height: 155, borderRadius: 155,url: logo, })
    }

    _addTitle(name){
        var name = name || "请输入门店名称"
        this.config.texts.push({
             baseLine: 'middle', textAlign: 'center', color: this.color, fontWeight:"bold",zIndex: 400,
            x: 620, y: 940, text: name, fontSize: 70
        })
    }

    _addTel(tel) {
        var tel = tel || "外卖预定：（请输入电话或微信）"
        this.config.texts.push({
             baseLine: 'middle', textAlign: 'center', color: this.color,  zIndex: 400,
            x: 620, y: 1587, text: tel, fontSize: 40
        })
    }
}

module.exports =  QRCup