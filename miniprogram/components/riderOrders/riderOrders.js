// components/riderOrders/riderOrders.js
Component({
    options: {//组件样式隔离。在自定义组件内外，使用class指定的样式将不会相互影响
        styleIsolation:'isolated'
    },
    /**
     * 组件的属性列表
     */
    properties: {
      orders:{//订单对象
        type:Object,
        value:{}
      },
      user:{
        type:String,
        value:''//区分商家还是骑手从而得到的样式不同
      },
      rider:{//骑手的话，需要传入骑手对应信息，进而修改orderDetail的相关信息
         type:Object,
         value:{}
      }
    },

    /**
     * 组件的初始数据
     */
    data: {
        selected:'',
        unabled:false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
      orderupdate(arr,status,rider){
        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'updateOrder',
          // 传递给云函数的 event 参数
          data: {
            arr: arr,
            status: status,
            rider:rider
          }
        }).then(res => {//调用云函数成功，查看订单是否都正确修改，若是，则输出true，否则输出false
            console.log(res)
        }).catch(err => {
           console.log(err)
        })
      },

       accept(e){
         console.log(e)
          this.setData({
             selected:'接单',
             unabled:true
          })
          let status=e.currentTarget.dataset.index[0].status
          let index=e.currentTarget.dataset.index
          //接受了待接单，将下一刻的状态传去数据库进行改变
          if(status=='待接单'){
              this.orderupdate(index,'商家已接单')
          }else if(status=='商家已接单'){
            this.orderupdate(index,'菜品制作完成')
          }else if(status=='菜品制作完成'){
            //此处当骑手接单后，会在相应的数据库orderDetail里增加对应骑手相关信息的字段，然后再渲染回页面
            this.orderupdate(index,'骑手已接单',this.data.rider)
          }else if(status=='骑手已接单'){
            this.orderupdate(index,'骑手已送达目的地')
          }
          
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
       },

       unaccept(e){
         let that=this
        wx.showModal({
          title: '提示',//提示的标题
          content: '是否确认取消订单？',//提示的内容
          confirmColor:'#bb9340',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定');
               that.setData({
                    selected:'取消接单',
                    unabled:true
               })
               this.orderupdate(e.currentTarget.dataset.index,'订单被取消')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
       }
    }
})
