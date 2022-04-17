// components/stars/stars.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     //要接收的数据名称   在父组件(页面)使用<stars aaa=''></stars>实现父组件向子组件传递数据
     description:{
       type:String,
       value:''
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
    starId:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
     select(e){
       console.log(e)
       this.data.starId=e.currentTarget.dataset.index;
       this.setData({
         starId:this.data.starId  //表示选择了第几个星星，若大于星星的个数则为灰色
       })
     }
  }
})
