// components/food/food.js
//用的是food云函数
const db = wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      arrObject:{
        type:Object,//传入食物的对象
        value:{}
      },
      empty:{
        type:String,
        value:''
      },
      show:{
        type:String,
        value:'用户'//默认为用户，可传值为食堂，值不同，呈现的效果不同
      },
      num:{
        type:Number,
        value:0
      }
      
  },

  /**
   * 组件的初始数据
   */
  data: {
      showModel:false,
  },

  /**
   * 组件的方法列表
   */
  
  methods: {
      add(e){
        this.setData({
          num:this.data.num+1
        })
         this.triggerEvent('addNum',{type:'+'})
      },
      reduce(){
        this.setData({
          num:this.data.num-1
        })
        this.triggerEvent('addNum',{type:'-'})
     },
     saleLing(e){
       this.setData({
         empty:'在售'
       })
       db.collection('food').doc(e.currentTarget.dataset.id).update({
        data:{
          empty:'在售'
        },
        success:function(res){
          console.log('更新成功',res)
        }
      })
       
     },
     saleEmpty(e){
      console.log(e.currentTarget.dataset.id)
      db.collection('food').doc(e.currentTarget.dataset.id).update({
        data:{
          empty:'售罄'
        },
        success:function(res){
          console.log('更新成功',res)
        }
      })
      //this.setData()能实时更新properties的值，不推荐，暂无解决办法
      this.setData({
        empty:'售罄'
      })
    },

    //弹出窗口
    dialog(){
       this.setData({
         showModel:true,
       })

       this.triggerEvent('maskShow',{showModel:true})
    },

    guanbiEvent(e){//关闭弹窗
       this.setData({
         showModel:false
       })
    },

    delete(){//删除商品
       
    },

    edit(e){//编辑商品
      console.log(e.currentTarget.dataset.item)
      let item=JSON.stringify(e.currentTarget.dataset.item)//将对象形式序列化
      wx.navigateTo({
        url: '../../pages/edit/edit?arrObject='+item,
      })

      
       

    }
 
  }
})
