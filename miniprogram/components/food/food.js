// components/food/food.js
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
          console.log('更新成功',res.data)
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
          console.log('更新成功',res.data)
        }
      })
      //this.setData()能实时更新properties的值，不推荐，暂无解决办法
      this.setData({
        empty:'售罄'
      })
    }
      
  }
})
