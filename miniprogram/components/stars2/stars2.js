// components/stars2/stars2.js
Component({
  /**
   * 组件的属性列表
   * 这是数据库评分数据获取渲染页面
   */
  properties: {
     //要接收的数据名称   在父组件(页面)使用<stars2 aaa=''></stars2>实现父组件向子组件传递数据
     description:{
       type:String,
       value:''
     },
     starId:{
       type:Number,
       value:0
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgs:[{
      id:1
    },{
      id:2
    },{
      id:3
    },{
      id:4
    },{
      id:5
    }],
    
  },

  /**
   * 组件的方法列表
   * 这个是用来评分的，将数据传到数据库
   */
  methods: {
  }
})
