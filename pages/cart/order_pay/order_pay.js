Page({

  /**
   * 页面的初始数据
   */
  data: {
    total_price: 5423, // 需支付总金额
    buy_count: 0, // 购买数量
    addrs: [], // 地址-富文本
    pay_way: "", // 支付方式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 支付方式
    this.setData({
      pay_way: "微信支付"
    })
    // 设置rich-text数据
    var is_default = true
    var default_adrs = is_default ? "默认" : ""
    var address = "广东省广州市天河区棠下街道学院后门菜鸟驿站"
    var style = is_default ? "padding-left: 8px; padding-right: 8px; background-color: red; color: #fff; font-size: 12px; border-radius: 9px;" : ""
    var data = [{
      name: "div",
      attrs: {
        style: "width: 100%; margin-top:0; padding-top: -20px;",
        class: "ad"
      },
      children: [
        {
          name: "b",
          attrs: {
            style: style,
            class: "bf"
          },
          children: [{
            type: "text",
            text: default_adrs
          }],
        },
        {
          name: "b",
          attrs: {
            style: "margin-left: 5px; margin-right: 5px;color: #000; font-size: 12px;",
            class: "af"
          },
          children: [{
            type: "text",
            text: address
          }],
        }
      ]
    }]

    this.setData({
      addrs: data
    })
    console.log(this.data.addrs)

    if (!options.selected_list) return
    var list = JSON.parse(options.selected_list)
    console.log(list)
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