
var dbFather = require('db_base.js')
class dbStore extends dbFather{
    constructor() {
        super()
    } 

    // 获取店铺信息
    getStoreInfo(obj){
        return new Promise((reslove,reject)=>{

            var data = {
                id:1,
                logo: "http://img.12xiong.top/coffee_image/upload/QuOY66fZ.jpg",
                name: "大三元",
                slogan: "豆乳好食材",
                startTime: "8:30",
                endTime: "15:30",
                count: 5,
                notic: "公告：这里是店铺的告",
            }
            reslove(data)
        })
    }

    /**
     * @method 获取当前的食物
     */
    getCurrentFood(obj){
        return new Promise((reslove, reject) => {
            var data = {
                id: "2",  //id
                name: "豆乳火锅",  //职位
                image_url: "../../images/bg/wa.jpg", //名称
                des: "选择西班牙牛蛙，干净的辣椒等食材，配合严格的监控加工环境", //头像
                summary: "西班牙1号地食材",    //体温
                mark:"麻辣",
            }
            reslove(data)
        })
    }

    /**获取菜品 */
    getFoodList(obj) {
        return new Promise((reslove, reject) => {
            var data = [
                {
                    id: "2",  //id
                    name: "豆乳火锅",  //职位
                    image_url: "../../images/bg/wa.jpg", //名称
                    des: "选择西班牙牛蛙，干净的辣椒等食材，配合严格的监控加工环境", //头像
                    summary: "西班牙1号地食材",    //体温
                    mark: "麻辣",
                }
            ]
            reslove(data)
        })
    }



    getEmploeeList(obj){
        return new Promise((reslove, reject) => {

            var data = [
                {
                    id: "2",  //id
                    name: "魏婧迪", //名称
                    avatar: "../../images/logo/1.jpg", //头像
                    post: "切配工",  //职位
                    temperature: 36.2,    //体温
                },
                {
                    id: "2",  //id
                    name: "魏婧迪", //名称
                    avatar: "../../images/logo/1.jpg", //头像
                    post: "切配工",  //职位
                    temperature: 36.2,    //体温
                },
            ]
            reslove(data)
        })
    }

}

module.exports = dbStore