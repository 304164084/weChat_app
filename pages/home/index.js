
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    local_must_have: "must_have/must_have",
    local_week_look: "week_look/week_look",
    current:0,
    banner_type:0,
    classifies: [],
    mustBuyList: {},
    newsActivity: {},
    xingluMatch: {},
    xingluScenes: [],
    xingluVideo: {},

  },
  // 轮播图
  itemClicked: function(event){
  var that = this;
  that.setData({
    banner_type:event.target.dataset.type
  }),
  wx.navigateTo({
    url: '../web/web?id='+event.target.id,
  })
  },
  // 必买清单 一周搭配
  match_itemClicked: function(e) {
    var url = e.target.dataset.title == this.data.mustBuyList.title ? this.data.local_must_have : this.data.local_week_look;
    wx.navigateTo({
      url: url + "?url=" + this.data.mustBuyList.title,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // banner data
    wx.request({
      url: app.globalData.service_host+'/api/XingluBroadcasting/findAllNews',
      method: 'POST',
      success: function(res) {
        // console.log(res)
        that.setData({
          banner_data: res.data.resultData
        })
      },
    })
    // 必买清单 一周搭配  match 
    wx.request({
      url: app.globalData.service_host +'/api/XingluIndex/findIndex',
      method: 'POST',
      success: function(res) {
        // console.log(res);
        that.setData({
          classifies: res.data.resultData.classifies,
          mustBuyList: res.data.resultData.mustBuyList,
          newsActivity: res.data.resultData.newsActivity,
          xingluMatch: res.data.resultData.xingluMatch,
          xingluScenes: res.data.resultData.xingluScenes,
          xingluVideo: res.data.resultData.xingluVideo,
        });
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})