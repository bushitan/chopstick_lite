//index.js
const app = getApp()

Page({
    data: {

        storeID:"",
        store:{
            logo:"",
            name:"",
            startTime:"8:30",
            endTime:"15:30",
            count:5,
            bg_color:"#ef5830",
            notic:"公告：这里是店铺的通知公告",

        },

        TabCur: 0,
        tabbar: [
            {  name: "实时监控",},
            // {  name: "店铺公告",},
            {  name: "更多菜品",}
        ],

        employeeList: [],
        food:null,

        noticList:[1,2,3,4],
    },

    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
        
    },
    async onLoad (options) {
        var storeID = ""

        if (options.hasOwnProperty("scene")){
            storeID = decodeURIComponent(options.scene)
        } else {
            storeID = options.storeID || "d9ea35c25e39a3530a59ebd5267d4424"
        }
        
        this.setData({
            storeID: storeID
        })
        this.onInit()
    },

    async onInit() {
        var data = await app.db.getStoreInfo({
            storeID: this.data.storeID
        })

        this.setData({
            store: data.store,
            employeeList: data.employeeList,
        })
    },
    
    /*************路由************/
    toMore(){
        wx.navigateTo({
            url: '/pages/food/food?id=' + this.data.store.id + "&name=" + this.data.store.name + "&slogan=" + this.data.store.slogan,
        })
    },

    toSelf(){
        wx.redirectTo({
            url: '/pages/self/self'
        })
    },
    onShareAppMessage(){
        return {
            title: this.data.store.name  ,
            path: '/pages/index/index?storeID=' + this.data.store._id
        }
    },
  
})
