// pages/food/food.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        storeID:0,
        storeName:"",
        storeSlogan:"",
        foodList:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.store_id)
        this.setData({
            storeID: options.id,
            storeName: options.name,
            storeSlogan: options.slogan,
        })
        this.onInit()
    },

    async onInit(){
        wx.setNavigationBarTitle({
            title: this.data.storeName + this.data.storeSlogan,
        })

        var foodList = await app.db.getFoodList({
            storeID:this.data.storeID
        })

        this.setData({
            foodList: foodList,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})