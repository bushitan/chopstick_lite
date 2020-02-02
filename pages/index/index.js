//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        store:{
            logo:"http://img.12xiong.top/coffee_image/upload/QuOY66fZ.jpg",
            name:"琉璃净",
            date:"8:30 -- 15:30",
            address:"	青秀区桃村路2-1号都市绿洲1层10号商铺"
        },

        storeList: [
            {
                storeUUID: "2",  //广告所在店铺
                storeName: "魏婧迪", //店铺名称
                storeLogo: "../../images/logo/1.jpg", //店铺logo
                storeDes: "切配工",  //店铺活动描述
                storeMinScore: 6,  //店铺起始兑换点数
                storeMaxScore: 10,  //店铺最高兑换点数
                myScore: 36.2,    //此店铺已经集的点数
            },
            {
                storeUUID: "3",  //广告所在店铺
                storeName: "李闻雕", //店铺名称
                storeLogo: "../../images/logo/2.jpg", //店铺logo
                storeDes: "掌勺大厨",  //店铺活动描述
                storeMinScore: 6,  //店铺起始兑换点数
                storeMaxScore: 10,  //店铺最高兑换点数
                myScore: 36.8,    //此店铺已经集的点数
            },
            {
                storeUUID: "4",  //广告所在店铺
                storeName: "韦丰", //店铺名称
                storeLogo: "../../images/logo/3.jpg", //店铺logo
                storeDes: "外卖打包员",  //店铺活动描述
                storeMinScore: 6,  //店铺起始兑换点数
                storeMaxScore: 10,  //店铺最高兑换点数
                myScore: 36.9,    //此店铺已经集的点数
            },
        ],

    },
    
    onLoad: function () {
    
    },

    onShareAppMessage(){
        
    },
  
})
