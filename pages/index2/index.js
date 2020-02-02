//index.js
const app = getApp()

Page({
    data: {
        store:{
            logo:"http://img.12xiong.top/coffee_image/upload/QuOY66fZ.jpg",
            name:"琉璃净",
            startTime:"8:30",
            endTime:"15:30",
            count:5,
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
    async onLoad () {
         this.onInit()
    },

    async onInit() {
        var store = await app.db.getStoreInfo()
        var employeeList = await app.db.getEmploeeList()
        var food = await app.db.getCurrentFood()
        
        this.setData({
            store: store,
            food: food,
            employeeList: employeeList,
        })
    },
    
    toMore(){
        wx.navigateTo({
            url: '/pages/food/food?id=' + this.data.store.id + "&name=" + this.data.store.name + "&slogan=" + this.data.store.slogan,
        })
    },
    onShareAppMessage(){
        
    },
  
})
