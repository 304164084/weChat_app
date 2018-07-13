
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftData: [],
    selected_is_special: false, // 当前左侧被选中的分组
    showStatus: false // 特惠区中的特惠品类若无数据则不显示顶图
  },
  // 特惠专区item 点击事件
  specialItemClicked: function(e) {
    console.log("特惠\n")
    console.log(e)
    var info = e.currentTarget.dataset.info
    // 跳转至单品详情页
    wx.navigateTo({
      url: '../item_detail/item_detail?colourid=' + info.color+'&id='+info.id,
    })
  },
  // 鞋服配item 点击事件
  ordinaryItemClicked: function(e) {
    console.log("鞋服配\n")
    console.log(e)
    var info = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '../product_list/product_list?classifyId=' + info.id + "&title=" + info.productName,
    })
  },

  // 左侧item 点击事件
  clickedLeftItem: function(e) {
    var that = this
    // console.log(e)
    // 获取当前点击的角标
    var index = e.currentTarget.dataset.index
    // 循环遍历， 将所有的selected 状态 设置为 false
    for (var i = 0; i < this.data.leftData.length; i++) {
      this.data.leftData[i].selected = false
    }
    // 当前被选中角标的selected 状态
    var cur_selected = this.data.leftData[index].selected
    cur_selected = !cur_selected
    this.data.leftData[index].selected = cur_selected
    this.setData({
      leftData: that.data.leftData,
      selected_is_special: index==3?true:false
    })
    console.log(this.data.selected_is_special)
    // 通过选中角标，为右侧获取相应数据
    this.getRightDataWithType(String(index+1))
  },
  // 获取右侧数据
  getRightDataWithType: function(type_id) {
    var that = this

    var data = wx.getStorageSync(type_id)
    if(data) {
      this.setData({
        rightData: data
      })
      return
    }
    // 向服务器获取数据
    this.requestDataWithIndex(type_id)
  },
  // 向服务器获取数据
  requestDataWithIndex: function (type_id) {
    var that = this;
    
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: app.globalData.service_host + '/api/XingluClassify/findClassify',
      method: "POST",
      data: { typeId: type_id },
      success: function (res) {
        console.log("右侧列表\n")
        console.log(res)
        // 设置特惠区中顶图是否显示
        for (var i = 0; i< res.data.resultData.length; i++) {
          res.data.resultData[i].list ? res.data.resultData[i].showStatus = true : res.data.resultData[i].showStatus = false
          
        }
        // 缓存数据
        wx.setStorageSync(type_id, res.data.resultData)
        that.setData({
          rightData: res.data.resultData
        })
        wx.hideLoading()
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取左侧列表
    wx.request({
      url: app.globalData.service_host +"/api/XingluMenu/findMenuList",
      method: "POST",
      success: function(res) {
        console.log("左侧列表\n")
        console.log(res)
        // 为数据添加selected 是否被选中的字段, 默认选中第0个
        for (var i = 0; i <res.data.resultData.length; i++) {
          i == 0 ? res.data.resultData[i].selected = true : res.data.resultData[i].selected = false
        }
        // 获取右侧默认选中时显示的数据(角标为0时的数据)
        that.getRightDataWithType(String(1))
        that.setData({
          leftData: res.data.resultData
        })
        
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
    console.log("缓存清除暂时放在当前类中!")
    // 清除缓存
    for (var i = 0; i < this.data.leftData.length; i++) {
      wx.removeStorageSync(String(i+1))
    }
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