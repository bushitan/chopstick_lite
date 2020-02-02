// components/food_current/food_current.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        text:{
            type:String,
            value: "食材来源",
        }
    },
    options: {
        styleIsolation: 'apply-shared'
    },
    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        toFood() {
            this.triggerEvent('more')           
        }
    }
})
