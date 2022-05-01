// components/food/food.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      name:{
        type:String,
        value:'name'
      },
      sale:{
        type:Number,
        value:0
      },
      price:{
        type:Number,
        value:79
      },
      src:{
        type:String,
        value:''
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
     }
      
  }
})
