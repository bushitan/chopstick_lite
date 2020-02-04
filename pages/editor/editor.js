// pages/editor/editor.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgList: [],
        imageMax:1,


        logoList: [],

        store:{
            // bg_color: '#e54d42'
        },
        bgColor:"",

        ColorList: [
            {
                title: '嫣红',
                name: 'red',
                color: '#e54d42'
            },
            {
                title: '桔橙',
                name: 'orange',
                color: '#f37b1d'
            },
            {
                title: '明黄',
                name: 'yellow',
                color: '#fbbd08'
            },
            {
                title: '橄榄',
                name: 'olive',
                color: '#8dc63f'
            },
            {
                title: '森绿',
                name: 'green',
                color: '#39b54a'
            },
            {
                title: '天青',
                name: 'cyan',
                color: '#1cbbb4'
            },
            {
                title: '海蓝',
                name: 'blue',
                color: '#0081ff'
            },
            {
                title: '姹紫',
                name: 'purple',
                color: '#6739b6'
            },
            {
                title: '木槿',
                name: 'mauve',
                color: '#9c26b0'
            },
            {
                title: '桃粉',
                name: 'pink',
                color: '#e03997'
            },
            {
                title: '棕褐',
                name: 'brown',
                color: '#a5673f'
            },
            {
                title: '墨黑',
                name: 'black',
                color: '#333333'
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
    },

    async onInit(){
        var res = await app.db.getSelfStore()

        var store = res.data.store
        this.setData({
            store: store ,
            bgColor: store.bgColor,
        })

        if (store.noticeUrl != "" 
            && store.noticeUrl != undefined
            && store.noticeUrl != null )
            this.setData({
                imgList: [store.noticeUrl ]
            })

        if (store.logo != ""
            && store.logo != undefined
            && store.logo != null)
            this.setData({
                logoList: [store.logo]
            })
        
    },

    // 保存
    async save(e) {
        // console.log('form发生了submit事件，携带数据为：', e.detail.value)

        // console.log(this.data.imgList)

        var formData = e.detail.value
        
        var userID = wx.getStorageSync(app.db.KEY_USERID)        
        // 上传logo
        if (this.data.logoList[0] != this.data.store.logo) {
            // todo 验证图片是否为新上传的
            const filePath = this.data.logoList[0]
            if (filePath) {
                var cloudName = "logo/" + userID + "_" + new Date().getTime()
                console.log(cloudName)
                // 上传图片
                const cloudPath = cloudName + filePath.match(/\.[^.]+?$/)[0]
                formData.logo = await app.db.uploadImage({
                    filePath: filePath,
                    cloudPath: cloudPath,
                })
            } else {
                formData.logo = ""
            }
        }
        // 上传公共图片
        if (this.data.imgList[0] != this.data.store.noticeUrl) {
            // todo 验证图片是否为新上传的
            const filePath = this.data.imgList[0]

            if (filePath){
                var cloudName = "notice/" + userID + "_" + new Date().getTime()
                console.log(cloudName)
                // 上传图片
                const cloudPath = cloudName + filePath.match(/\.[^.]+?$/)[0]
                formData.noticeUrl = await app.db.uploadImage({
                    filePath: filePath,
                    cloudPath: cloudPath,
                })
            } else{
                formData.noticeUrl = ""
            }            
        }


        // debugger    
        formData.bgColor = this.data.bgColor || "#e54d42"
        var r = await app.db.editorSelfStore(formData)
        wx.showModal({
            title: r.msg,
            showCancel:false,
            success(res){
                var prePage = app.getPrePage()
                prePage.onInit()
                wx.navigateBack({}) 
            },
        })
    },

    // 选择颜色
    colorChange(e){
        var color = e.detail.value
        // var store = this.data.store
        // store.bgColor = color
        this.setData({
            bgColor: color
        })
    },


    /***********上传logo图片***********/
    DelLogo(e) {
        wx.showModal({
            title: '确定要删除这长图片?',
            success: res => {
                if (res.confirm) {
                    this.data.logoList.splice(e.currentTarget.dataset.index, 1);
                    this.setData({
                        logoList: this.data.logoList
                    })
                }
            }
        })
    },
    ViewLogo(e) {
        wx.previewImage({
            urls: this.data.logoList,
            current: e.currentTarget.dataset.url
        });
    },
    async ChooseLogo() {
        wx.chooseImage({
            count: this.data.imageMax, //默认9
            sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
            // sourceType: ['album'], //从相册选择
            success: (res) => {
                if (this.data.logoList.length != 0) {
                    this.setData({
                        logoList: this.data.logoList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        logoList: res.tempFilePaths
                    })
                }
            }
        });
    },

    /****** 上传公告图片 ******/
    DelImg(e) {
        wx.showModal({
            title: '确定要删除这长图片?',
            // content: '？',
            success: res => {
                if (res.confirm) {
                    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
                    this.setData({
                        imgList: this.data.imgList
                    })
                }
            }
        })
    },
    ViewImage(e) {
        wx.previewImage({
            urls: this.data.imgList,
            current: e.currentTarget.dataset.url
        });
    },

    async ChooseImage() {
        wx.chooseImage({
            count: this.data.imageMax, //默认9
            sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
            // sourceType: ['album'], //从相册选择
            success: (res) => {
                if (this.data.imgList.length != 0) {
                    this.setData({
                        imgList: this.data.imgList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        imgList: res.tempFilePaths
                    })
                }
            }
        });
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})