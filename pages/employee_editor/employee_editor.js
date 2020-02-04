// pages/employee_editor/employee_editor.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

        imgList: [],
        imageMax: 1,

        employeeID:"",
        employee:{},
        store:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {       

        var prePage = app.getPrePage()
        this.setData({
            employeeID: options.employeeID || "",
            store: prePage.data.store
        })
        //

        this.onInit()
    },

    // 初始化
    async onInit(){

        // 没有传入员工id， 新增
        if (this.data.employeeID == "" )
            return 
        
        var employee = await app.db.getSelfEmployee({
            _id: this.data.employeeID
        })
        this.setData({
            employee: employee,
        })

        if (employee.avatar != ""
            && employee.avatar != undefined
            && employee.avatar != null)
            this.setData({
                imgList: [employee.avatar]
            })
    },

    // 保存
    async save(e) {
        // console.log('form发生了submit事件，携带数据为：', e.detail.value)

        // console.log(this.data.imgList)

        var formData = e.detail.value
        formData._id = this.data.employeeID
        formData.storeID = this.data.store._id  

        if (this.data.imgList[0] != this.data.employee.avatar) {
            const filePath = this.data.imgList[0]
            // 上传图片

            if (filePath) {
                var userID = wx.getStorageSync(app.db.KEY_USERID)
                var cloudName = "employee/" + userID + "_" + new Date().getTime()
                console.log(cloudName)
                const cloudPath = cloudName + filePath.match(/\.[^.]+?$/)[0]
                formData.avatar = await app.db.uploadImage({
                    filePath: filePath,
                    cloudPath: cloudPath,
                })
            }else{
                formData.noticeUrl = ""
            }
        }
        console.log(formData)
        
        var r = await app.db.addSelfEmployee(formData)
        
        // 更新用户信息
        wx.showModal({
            title: r.msg,
            showCancel: false,
            success(res) {
                var prePage = app.getPrePage()
                prePage.onInit()

                wx.navigateBack({})
            },
        })
    },

    isDelet(){
        return new Promise((reslove, reject) => {
            wx.showModal({
                title: '是否删除该员工？',
                success(res){
                    if(res.confirm){
                        reslove(true)
                    } else{
                        reslove(false)
                    }
                }
            })
        })
    },

    //删除
    async deleteEmployee() {

        if(await this.isDelet() == false)
            return 

        var r = await app.db.deleteSelfEmployee({
            _id: this.data.employeeID
        })
        wx.showModal({
            title: r.msg,
            showCancel: false,
            success(res) {
                var prePage = app.getPrePage()
                prePage.onInit()

                wx.navigateBack({})
            },
        })
    },


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

    ChooseImage() {
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



})