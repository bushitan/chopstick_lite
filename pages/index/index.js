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

        employeeList: [],



        longitude: 108,
        latitue: 22,
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
            setTimeout(function () { app.db.addRecordSacn(storeID)} , 7000)
            //记录用户扫码进入坐标
        } else {
            storeID = options.storeID 
            setTimeout(function () { app.db.addRecordNormal(storeID)},7000)  // 记录用户普通进入坐标
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
        // debugger
        this.setData({
            store: data.store,
            employeeList: data.employeeList,
        })

        var that = this
        setTimeout(function () {           
            app.db.checkAuthorUserLocation().then(res=>{
                if(res == true)
                    app.db.getLocation().then(location => {
                        that.setData({
                            longitude: location.longitude,
                            latitude: location.latitude,
                        })
                    })
            })
        },5000)
        
    },
    
    // 点击我的位置时候，记录
    clickSelfLocation(){
        app.db.addRecordMoveSelf(this.data.storeID)  // 记录用户普通进入坐标
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
