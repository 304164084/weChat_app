
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_page: 0,
    pageSize: 10,
    classifyId: "",
    resultData: [],
  },
  // 按钮点击事件
  itemClicked: function(e) {
    var colourId = e.currentTarget.dataset.colourid
    var id = e.currentTarget.dataset.id
    // 跳转至单品详情页
    wx.navigateTo({
      url: '../item_detail/item_detail?colourid=' + colourId + '&id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.classifyId)
    wx.setNavigationBarTitle({
      title: options.title,
    })
    // 存储id
    this.setData({
      classifyId: options.classifyId
    })
    this.requestDataWithParameters({ classifyId: options.classifyId,
      pageNo: this.data.cur_page,
      pageSize: this.data.pageSize,
      isNewEdition: 1
    })
    
  },
  // 获取商品列表数据
  requestDataWithParameters: function(param) {
    var that = this;
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: app.globalData.service_host + '/api/XingluProduct/findProductList',
      method: "POST",
      data: param,
      success: function (res) {
        console.log(res)
        that.setData({
          resultData: res.data.resultData
        })
        wx.hideLoading()
      },
      fail: function (err) {
        console.log(err)
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
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
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
    console.log("下拉刷新....")
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    that.setData({
      cur_page: 0
    })
    wx.request({
      url: app.globalData.service_host + '/api/XingluProduct/findProductList',
      method: "POST",
      data: {
        classifyId: that.data.classifyId,
        pageNo: this.data.cur_page,
        pageSize: this.data.pageSize,
        isNewEdition: 1
      },
      success: function (res) {
        console.log(res)
        that.setData({
          resultData: res.data.resultData
        })
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
      },
      fail: function (err) {
        console.log(err)
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
      },

    })

    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉拉加载更多...." + this.data.cur_page)
    var that = this;
    // 页数+1  
    this.setData({
      cur_page: that.data.cur_page + 1
    })
    wx.request({
      url: app.globalData.service_host + '/api/XingluProduct/findProductList',
      method: "POST",
      data: {
        classifyId: that.data.classifyId,
        pageNo: that.data.cur_page,
        pageSize: that.data.pageSize,
        isNewEdition: 1
      },
      success: function (res) {
        console.log(res)
        // 回调函数  
        var moment_list = that.data.resultData;
        if (res.data.resultCode == 2001) {
          return
        }
        for (var i = 0; i < res.data.resultData.productLists.length; i++) {
          moment_list.productLists.push(res.data.resultData.productLists[i]);
        }
        
        // 设置数据  
        that.setData({
          resultData: moment_list,
        })

      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})