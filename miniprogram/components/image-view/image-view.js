// components/image-view/image-view.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      src:{//图片url
        type:String,
        value:''
      },
      imageList:{//所有图片，方便预览
        type:Array,
        value:[]
      },
      size:{//图片默认占屏幕宽度的比例，默认是屏幕的三分之一（除去padding）
        type:Number,
        value:3
      },
      add:{//是否为添加
        type:Boolean,
        value:false
      },
      add_limit:{//上传图片上限，默认3
         type:Number,
         value:3
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
     addImg(){
       wx.chooseImage({
         count:this.data.add_limit,
         success:res=>{//tempFilePaths可以作为img标签的src属性显示图片
          console.log(res.tempFilePaths)//返回的是装有很多图片地址的数组
           this.triggerEvent('addImg',res.tempFilePaths);
           //将res.tempFilePaths传递给父组件，父组件通过bind:addImg绑定自定义事件获取传递过来的值
         },
       })
     },
     deleteImg(){
       let that=this;
       that.triggerEvent('deleteImg',that.data.src);
     },
     //图片预览
     showImg(){
       let that=this;
       wx.previewImage({
          urls:that.data.imageList.length>0?that.data.imageList:[that.data.src],
          current:that.data.src
       })
     }
  }
})
