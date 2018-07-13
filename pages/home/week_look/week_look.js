var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    week_look_url: "/api/XingluMatch/findMatchList",
    item_status: [],
  },
  showItems: function(e) {
    var that = this;
    var index = e.target.dataset.index;
    var item = this.data.dataSource[index];
    item.hidden = !this.data.dataSource[index].hidden;
    this.data.dataSource[index] = item;
    this.setData({
      dataSource: that.data.dataSource
    })
    
  },
  showDetail: function(e) {
    // console.log(e);
    wx.navigateTo({
      // 官方建议 使用encodeURIComponent()来包裹参数
      url: '../../item_detail/item_detail?id=' + encodeURIComponent(e.currentTarget.dataset.id) + '&colourid=' + encodeURIComponent(e.currentTarget.dataset.colourid),
      // url: "../../item_detail/item_detail?id =555",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.service_host + that.data.week_look_url,
      method: "POST",
      success: function(res) {
        // 将week中的数字替换成对应的星期x
        for (var i = 0; i < res.data.resultData.length; i++) {
          switch (parseInt(res.data.resultData[i].week)) {
            case 0: 
              res.data.resultData[i].week = "星期日 "
              break;
            case 1:
              res.data.resultData[i].week = "星期一 "
              break;
            case 2:
              res.data.resultData[i].week = "星期二 "
              break;
            case 3:
              res.data.resultData[i].week = "星期三 "
              break;
            case 4:
              res.data.resultData[i].week = "星期四 "
              break;
            case 5:
              res.data.resultData[i].week = "星期五 "
              break;
            case 6:
              res.data.resultData[i].week = "星期六 "
              break;
            default :
            break;
          }
          res.data.resultData[i].hidden = true;
          }
        
        // console.log(res);
        that.setData({
          dataSource: res.data.resultData,
          
        })
      },
    });
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