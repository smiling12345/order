// components/riderOrders/riderOrders.js
Component({
    options: {//组件样式隔离。有何作用？？
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        orderNum:{//订单号
            type:String,
            value:''
        },
        person:{//收货人姓名
             type:String,
             value:''
        },
        phone:{//收货人电话
             type:String,
             value:''
        },
        address:{//收货人地址
            type:String,
            value:''
        },
        foodName:{//商品名称
             type:String,
             value:''
        },
        foodNumber:{//商品数量
             type:Number,
             value:0
        },
        canteen:{//所在X园取餐
            type:String,
            value:''
        },
        louhao:{//位于几楼
            type:String,
            value:''
        },
        dishes:{//位于哪个窗口
            type:String,
            value:''
        },
        remark:{//备注
            type:String,
            value:''
        }


    },

    /**
     * 组件的初始数据
     */
    data: {
        selected:''
    },

    /**
     * 组件的方法列表
     */
    methods: {
       accept(){
          this.setData({
             selected:'接单'
          })
       },
       unaccept(){
        this.setData({
            selected:'取消接单'
         })
       }
    }
})
