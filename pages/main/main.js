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
  },
  
  //点击图片进行预览，长按保存分享图片
  previewImg:function(e){
    wx.showActionSheet({
      itemList: ['保存二维码'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          console.log('保存二维码')
          wx.canvasToTempFilePath({
            canvasId: 'mycanvas',
            success: function (res) {
              var tempFilePath = encodeURI(res.tempFilePath)
              console.log(res)
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function success(res) {
                  console.log('saved::' + res.savedFilePath);
                  wx.showToast({
                    title: '保存成功',
                  })
                }
              })
            },
            fail: function (res) {
              console.log(res);
              wx.showToast({
                title: '保存失败',
                icon: 'loading'
              }),
                setTimeout(function () {
                  wx.hideLoading()
                }, 2000)
            }
          });
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

})