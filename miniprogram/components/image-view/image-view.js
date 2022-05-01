// components/image-view/image-view.js 
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     
  },

  /**
   * 组件的初始数据
   */
  data: {
      fileList:[],//存放有图片地址的图片数组
  },

  /**
   * 组件的方法列表
   */
  methods: {//此处只是将上传的图片放到临时本地存储中，
    //在调用这个组件的页面上真正要上传的时候，先保存数据到云存储，获得每个图片唯一的fileid，
    //再保存到云数据库中，到时通过调用云数据库将信息显示在别的页面上
     addImg(){//只能一个个上传
      let that=this
      let fileList=that.data.fileList
      let count=9-fileList.length
       wx.chooseImage({//上传图片的第一步：选择图片
         count:count,//限制上传图片的张数
         success:res=>{//tempFilePaths可以作为img标签的src属性显示图片
             console.log(res.tempFilePaths)//返回的是装有很多图片地址的数组
             var tempFilePaths=res.tempFilePaths
             var fileList=that.data.fileList//先获取本地已存储的数组，后面再增加地址，则用push更新数组
             for(let i=0;i<tempFilePaths.length;i++){
                fileList.push(tempFilePaths[i])
             }
             that.setData({
                  fileList:fileList,
             })
             that.triggerEvent('addImg',that.data.fileList);
             console.log(that.data.fileList)
         },
       })
     },
    deleteImg(res){
       let that=this
       console.log(res)    //res.currentTarget.dataset.index是图片所在数组中的索引
       let index=res.currentTarget.dataset.index
       let images=that.data.fileList
       images.splice(index, 1);//删除数组中的某个元素，第一参数为删除第一个数的位置，
       //第二个参数为删除几个
       console.log(images)
       that.setData({
         fileList:images,
       })
       console.log(that.data.fileList)
       that.triggerEvent('deleteImg',that.data.fileList);
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
