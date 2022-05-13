// components/evaluation/evaluation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      starsId:{//接收页面传来的参数，渲染星星个数
        type:Number,
        value:0
      },
      pinglun:{//接收页面传来的评论数据
         type:String,
         value:''
      },
      image:{//接收页面传来的图片fileid
         type:Array,
         value:[]
      },
      select:{
        type:String,
        value:'显示评论'//默认是显示评论 若为商家则是输入框形式
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

  }
})
