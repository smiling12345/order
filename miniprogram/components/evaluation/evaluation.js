// components/evaluation/evaluation.js
const db=wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      select:{
        type:String,
        value:'显示评论'//默认是显示评论 若为商家则是输入框形式
      },   
      item:{
        type:Object,
        value:{}
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
     value:''//textare的内容
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputData(e){//获取textare里的内容
      console.log(e)
      this.setData({
        value:e.detail.value
      })

    },

    answer(){//点击回复评论，将数据存入数据库中
       let that=this
        let value=this.data.value
        console.log(value)
        wx.showModal({
          title: '回复评论',
          content:'确定回复此评论吗？',
          cancelText:'否',//默认是否
          cancelColor:'gray',
          confirmText:'是',//确定
          confirmColor:'skyblue',
          success:function(res){
            if(res.confirm){
              //根据传进来的item信息可以保存到相应的数据库中
              console.log('用户点击确定')
              console.log(that.data.item)
              db.collection('comment').doc(that.data.item._id).update({
                data:{
                  adminComment:that.data.value
                }
              })
              .then(res=>{
                console.log('存储数据成功',res)
                wx.showToast({
                   title:"回复成功",
                   icon:"success",
                   duration:2000,
                   success:function(){
                     console.log('弹窗成功')
                   },
                   fail:function(){
                     console.log('弹窗失败')
                   }
                })
              })
              .catch(err=>{
                console.log('存储数据失败',err)
              })


            }
            if(res.cancel){//默认隐藏弹窗
              console.log('用户点击取消')
            }
          }
        })
    }

  }
})
