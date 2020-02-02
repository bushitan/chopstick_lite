// components/header/header.js
const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        logo: { // 属性名
            type: String,
            value: ''
        },
        name: { // 属性名
            type: String,
            value: ''
        },
        slogan: { // 属性名
            type: String,
            value: ''
        },
        
    },
    options: {
        styleIsolation: 'apply-shared'
    },
    /**
     * 组件的初始数据
     */
    data: {

        CustomBar: app.globalData.CustomBar,
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
