Page({
  bindGetUserInfo: function(res) {
    console.log(res)

    this.setData({
      userInfo: res.detail.userInfo,
      is_login: res.detail.userInfo?true:false
    })
    console.log(this.data.is_login)
  },
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    is_login: false,
    order_list: ["待付款", "待发货", "待收货", "已完成", "全部订单"],
    list: ["购买指南", "邀请有礼", "意见反馈"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("1111")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("222")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("3333")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("4444")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("5555")
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