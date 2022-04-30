// components/riderOrders/riderOrders.js
Component({
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        orderNum : Number,
        person : String,
        phone : String 
    },

    /**
     * 组件的初始数据
     */
    data: {
        count:0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        addCount(){
            //定义的max就想data中定义的变量一样，可以使用
            //通过max来控制count的最大值
            if( this.data.count>this.properties.max) return;
            this.setData({
                count : this.data.count+2
            })
            this._show()
        },

        _show(){
            wx.showToast({
              title: 'count:'+this.data.count,
              icon: 'none'
            })
        }
    }
})
