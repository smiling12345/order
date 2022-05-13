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
      },
      material:{
         type:String,
         value:'大米、鸡肉huohuoh' //要在此处设计超过多少字则
      },
      show:{
        type:String,
        value:'用户'//默认为用户，可传值为食堂，值不同，呈现的效果不同
      },
  },

  /**
   * 组件的初始数据
   */
  data: {
       empty:'在售',//判断是在售还是售罄了，默认在售
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
     saleLing(){
       this.setData({
         empty:'在售'
       })
     },
     saleEmpty(){
      this.setData({
        empty:'售罄'
      })
    }
      
  }
})
