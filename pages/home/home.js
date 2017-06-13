// pages/home/home.js
Page({
  data:{
    qrMsg: '',
    recognizeMsg: '',
    isShowMsg: false,
    isShowResult: false,
    showClear: true,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      isShowMsg: false,
      isShowResult: true,
    })
  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  // 生成二维码
  makeQrcode: function(e) {
    this.setData({
      isShowMsg: false,
      isShowResult: true,
    })
    console.log(this.data.qrMsg + "家")
    if (this.data.qrMsg == "") {
      wx.showToast({
        title: '二维码内容不能为空',
        icon: 'loading',
        duration: 500
      })
      return
    }
    var that = this
    wx.navigateTo({
      url: '../main/main?msg=' + that.data.qrMsg,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  bindInput: function(e) {
    console.log(e.detail.value)
    this.setData({
      qrMsg: e.detail.value
    })
    if (this.data['qrMsg'].length > 1) {
      this.setData({
        showClear: false
      })
    } else {
      this.setData({
        showClear: true
      })
    }
  },

  // 清空
  bindClearAll: function(res) {
    wx.redirectTo({
      url: '../home/home',
    })
  },

  // 识别二维码
  recognizeCode: function() {
    this.setData({
      isShowMsg: true,
      isShowResult: false,
      recognizeMsg: "",
    })
    var that = this
    wx.scanCode({
      success: function(res){
        // success
        console.log(res)
        that.setData({
          recognizeMsg: res["result"]
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  
})
