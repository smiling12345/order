// components/login/login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {//外部传入的数据
      outData:{
         type:Array,
         value:[],
      },
      prove:{//adminPage/deliveryPage
        type:String,
        value:'',
      },
      canteen:{
        type:String,
        value:'',
      },
      louhao:{
        type:String,
        value:'',
      },
      dishes:{
        type:String,
        value:'',
      }

  },

  /**
   * 组件的初始数据
   */
  data: {
      inAccount:'',
      inPassword:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取输入的账号
    getAccount(event){
      //console.log('账号',event)
      this.setData({
         inAccount:event.detail.value
      })
    },

    //获取输入的密码
    getPassword(event){
      //console.log('密码',event)
      this.setData({
        inPassword:event.detail.value
     })
    },
    //点击登陆
    login(){
      // console.log(this.data.outData)//注意要用this.data.形式获取到值

      let inAccount=this.data.inAccount
      let inPassword=this.data.inPassword
      let outData=this.data.outData
      let prove=this.data.prove
      let canteen=this.data.canteen
      let louhao=this.data.louhao
      let dishes=this.data.dishes
      console.log('账号',inAccount,'密码',inPassword)
      if(inAccount.length<4){
        wx.showToast({
           icon:'none',
           title:'账号至少4位',
        })
        return
      }
      if(inPassword.length<4){
        wx.showToast({
           icon:'none',
           title:'密码至少4位',
        })
        return
      }

      for(let i=0;i<outData.length;i++){
        if(inAccount==outData[i].user&&inPassword==outData[i].code)
        {
          if(prove=='deliveryPage'){
                console.log('骑手登陆成功')
                wx.showToast({
                    title:'骑手登陆成功'
                })
              setTimeout(function(){
                wx.navigateTo({
                  url: '../../pages/'+prove+'/'+prove+'?name='+outData[i].name+'&phone='+outData[i].phone+'&id='+outData[i]._id,
                 })
              },100)
              return
          }else{
             if(canteen==outData[i].canteen&&louhao==outData[i].louhao&&dishes==outData[i].dishes){
                console.log('商家登陆成功')
                wx.showToast({
                  title:'商家登陆成功'
                })
                setTimeout(function(){
                  wx.navigateTo({
                    url: '../../pages/'+prove+'/'+prove+'?id='+outData[i].user+'&canteen='+canteen+'&louhao='+louhao+'&dishes='+dishes,
                  })
                }, 100);
                return
             }else{
                wx.showToast({
                  icon:'none',
                  title:'选择管理窗口错误'
                })
                return
             }
          } 
      }else{
          console.log('登陆失败')
          wx.showToast({
             icon:'none',
             title:'账号/密码错误'
          })
          return
       }
    }
  }
}
})
