// pages/main/main.js

var QR = require("../../utils/qrcode.js");
Page({
  data:{
    placeholder:'https://github.com/zhangzhaopds'
  },
  onLoad:function(options){

    this.setData({
      inputContent: options['msg']
    })
    console.log(this.data['inputContent'].length)
    if (this.data['inputContent'].length > 300) {
      wx.showLoading({
        title: '亲，你是在摧残我啊！！！',
      })
      QR.qrApi.draw(this.data.inputContent, 'mycanvas', 300, 300)
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    } else {
      QR.qrApi.draw(this.data.inputContent, 'mycanvas', 300, 300)
    }
    
    // 
    
  },
  
  //点击图片进行预览，长按保存分享图片
  previewImg:function(e){
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log(res)
					wx.previewImage({
      			current: tempFilePath, // 当前显示图片的http链接
      			urls: [tempFilePath] // 需要预览的图片http链接列表
    			})
      },
      fail: function (res) {
          console.log(res);
      }
    });
    
  },

})