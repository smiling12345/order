// components/food-dialog/food-dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
       foodName:{
         type:String,
         value:'这里放菜名'
       },
       jiage:{
         type:Number,
         value:10//属性默认值
       },
       zhuliao:{
         type:String,
         value:'牛肉、洋葱、豆芽、香葱，豆腐，牛肉、洋葱、'
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
         guanbi(){//关闭弹窗传值
            this.triggerEvent('guanbiEvent',{showModel:false})
         }
  }
})
