
var app = getApp();
import wxParse from '../wxParse/wxParse.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
  },

  wxParseTagATap: function(e){
    console.log('图片点击图片点击')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.id)
    this.setData({
      id: options.id,
    })
    wx.request({
      url: app.globalData.service_host+'/api/XingluImageText/getContentById',
      method: 'POST',
      data: {id: options.id},
      success: function(res) {
        
        var article = app.globalData.html_header + res.data.resultData.content
        
        wxParse.wxParse('article', 'html', article, that, 5);
      }
    })
    
  },

})