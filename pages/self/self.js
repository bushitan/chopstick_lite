// pages/self/self.js
const app = getApp()
import Poster from '../../components/poster/poster';
const QRCup = require("../../utils/qr_cup.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        store: {
            // id : 1,
            // logo: "http://img.12xiong.top/coffee_image/upload/QuOY66fZ.jpg",
            // name: "琉璃净",
            // startTime: "8:30",
            // endTime: "15:30",
            // count: 5,
            // bg_color: "#ef5830",
            // notice: "公告：这里是店铺的通知公告",
        },

        employeeList:[],


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.login()
        this.onInit()
    },
    
    // 登陆
    async login(){
        var res = await app.db.login()
        if (res.code == 0)
            wx.setStorageSync(app.db.KEY_USERID, res.data.userID)        
    },

    // 初始化
    async onInit(){      
        var res = await app.db.getSelfStore()
        if( res.code == -1)
            return
        this.setData({
            store: res.data.store,
            employeeList: res.data.employeeList,
        })

        // var store = await app.db.getSelfStore()
        // var employeeList = await app.db.getSelfEmployeeList({
        //     storeID:store._id
        // })
        // this.setData({
        //     store: store,
        //     employeeList: employeeList,
        // })


        // this.getTempRage() //设置员工基本温度
    },


    /****员工****/

    // 上传员工体温
    async saveTemp(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)

        console.log(this.data.imgList)

        var formData = e.detail.value

        var obj = {
            storeID:this.data.store._id,
            map: formData,
        }
        
        var r = await app.db.updateSelfTemp(obj)
        wx.showModal({
            title: r.msg,
            showCancel: false,
        })

        this.setData({
            employeeList:[],
        })
        this.getNewEmployeeList()

    },

    async getNewEmployeeList(){
        var employeeList = await app.db.getSelfEmployeeList({
            storeID: this.data.store._id
        })
        this.setData({
            employeeList: employeeList,
        })
    },
    


    deleteEmployee(){},


    aa(){},

    /****获取二维码*****/
    // 获取合成后的卡片


    async getCard() { 
        var qrCup = new QRCup()
        await qrCup.start(this.data.store)
        var data = qrCup.getConfigData()
        console.log(data)
        wx.showToast({
            title: '生成中',
        })
        this.setData({ posterConfig: data }, () => {
            Poster.create(true);    // 入参：true为抹掉重新生成
        });
    },
    //合成成功
    onPosterSuccess(e) {
        const { detail } = e;
        console.log(e)
        wx.previewImage({
            current: detail,
            urls: [detail]
        })
    },
    //合成失败
    onPosterFail(e) {
        console.log("合成失败",e)
    },

    // 获取二维码
    getQR() { 
        wx.previewImage({
            urls: [this.data.store.qrUrl],
            current: this.data.store.qrUrl
        });
        
    },

    /**********路由***********/
    toStoreView(){
        wx.redirectTo({
            url: '/pages/index/index?storeID=' + this.data.store._id,
        })
    },
    toStoreEditor(){
        wx.navigateTo({
            url: '/pages/editor/editor',
        })
    },

    addEmployeer(){
        wx.navigateTo({
            url: '/pages/employee_editor/employee_editor',
        })
    },
    editorEmployee(e){
        var employeeID = e.currentTarget.dataset.employee_id
        wx.navigateTo({
            url: '/pages/employee_editor/employee_editor?employeeID=' + employeeID,
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})