//app.js
App({
  onLaunch: function () {//应用第一次启动就会触发的事件
    //在应用第一次启动的时候 获取用户的个人信息
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
         env: 'cloud1-9g5ji1nh044d601d',
        traceUser: true,
      })
    }
    //调用getOpenid获取用户id
    this.getOpenid();


    this.globalData = {
      userid:''
    }
  },
  //获取用户openid
  getOpenid(){
     let that=this;
     wx.cloud.callFunction({
      name:'openapi',
      success:res=>{
        console.log(res)
        var usid=res.result.openid
        console.log(usid)
        that.globalData.userid=res.result.openid //把获得的openid赋值到全局变量上
      },
     fail(res){
       console.log("获取失败",res);
      }
     })
  },

  onShow(){
    //应用 被用户看到
    //对应用的数据或者页面效果重置
  },
  onHide(){
    //暂停或者清除定时器
  },
  onError(err){
    //应用的代码发生了报错的时候 就会触发
    //在应用发生代码报错的时候，收集用户的错误信息，通过异步请求，将错误的信息发送到后台上
  },
  onPageNotFound(){
    //应用第一次启动的时候，如果找不到第一个入口页面，才会触发
    wx.navigateTo({//如果页面不存在，通过js的方式来重新跳转页面，重新跳到第二个首页
      //不能跳到tabbar页面，与导航组件类似
      url:''
    });
  }

})
