//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    screenHeight: wx.getSystemInfoSync().windowHeight,
    screenWidth: wx.getSystemInfoSync().windowWidth,
    service_host: "http://a.musthave.com.cn:8080/xinglu",
    html_header: "<html><head><meta charset=\"utf-8\"><meta id=\"viewport\" name=\"viewport\" content=\"width= device - width, initial-scale=1.0,maximum-scale=1.0,user-scalable=false\" /><meta name=\"apple-mobile - web - app - capable\" content=\"yes\" /><meta name=\"apple- mobile - web - app - status - bar - style\" content=\"black\" /><meta name=\"black\" name=\"apple- mobile - web - app - status - bar - style\" />",
    
  }
})