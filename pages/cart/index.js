
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopping_list: [],  // 购物车列表
    is_edit: false, // 是否编辑过, 若编辑过则页面消失时会提交接口
    is_all_selected: false, // 购物车是否全部被选中
    selected_count: 0, // 被选中的数量
    total_money: 0,
  },
  /**
   * 购买操作
   */
  buyAction: function(e) {
    var that = this
    console.log("结算!")
    // 检测是否有勾选商品
    if (!(this.data.selected_count >0)) {
      wx.showToast({
        title: '您还没有选择商品哦',
        icon: "none",
        complete: function () {

        }
      })
      return
    }
    var selected_list = []
    for (var i = 0; i < this.data.shopping_list.length; i++) {
      if (this.data.shopping_list[i].is_selected) {
        selected_list.push(this.data.shopping_list[i])
      }
    }
    // 跳至结算页
    var model = JSON.stringify(selected_list)
    wx.navigateTo({
      url: 'order_pay/order_pay?selected_list=' + model,
    })

  },

  /**
   * 选择按钮 是否选中事件
   */
  selectionAction: function(e) {
    var index = e.currentTarget.dataset.index
    var cur_cell = this.data.shopping_list[index]
    cur_cell.is_selected = !cur_cell.is_selected
    this.setData({
      shopping_list: this.data.shopping_list,
      is_edit: true // 编辑过
    })
    // 判断是否全部选中
    this.isAllSelected()
    console.log(index)
  },
  /** 
   * 全选按钮
   */
  selectedAllAction: function (e) {
    // 设置按钮状态
    this.setData({
      is_all_selected: !this.data.is_all_selected
    })
    if (this.data.is_all_selected) { // 若全选
      this.setIs_selected(this.data.shopping_list, true)
      // 
      this.isAllSelected()
    } else { // 若全部取消
      this.setIs_selected(this.data.shopping_list, false)
      // 
      this.isAllSelected()
    }
  },
  // 设置模型中的is_selected字段
  setIs_selected: function (list, isSelected) {
    for (var i = 0; i < list.length; i++) {
      var item = list[i]
      item.is_selected = isSelected
    }
    this.setData({
      shopping_list: list
    })
  },
  /**
   * 设置属性值
   * 是否全部选中、      选中的数量、      选中商品的总价
   * is_all_selected、selected_count、total_money
   */
  isAllSelected: function() {
    // 循环遍历查看是否全部选中
    var count = 0
    var total_pay = 0
    for (var i = 0; i < this.data.shopping_list.length; i++) {
      // 若选中, 则增加
      if (this.data.shopping_list[i].is_selected) {
        count++
        var price = this.data.shopping_list[i].count * this.data.shopping_list[i].salesPrice
        // 设置售价
        total_pay += price 
      }
    }

    //  赋值总花费、选中数量
    this.setData({
      selected_count: count,
      total_money: total_pay
    })
    // 赋值成员变量selected_count 
    // 若选中的数量count == 购物车列表长度, 则全选;反之, 不全选
    if (count == this.data.shopping_list.length) {
      this.setData({
        is_all_selected: true
      })
    } else {
      this.setData({
        is_all_selected: false
      })
    }
    
  },
  /**
   * 数量+++++
   */
  addAction: function(e) {
    var index = e.currentTarget.dataset.index
    var cur_cell = this.data.shopping_list[index]
    cur_cell.count++
    this.setData({
      shopping_list: this.data.shopping_list,
      is_edit: true // 编辑过
    })

    // 
    this.isAllSelected()
    /**
     * 提交修改后的数据
     * 将修改后的数据提交时机放到页面离开时```
     * /api/XingluShoppingCar/EditAmount
     * 
     */
    console.log("增加")
    console.log(cur_cell)

  },
  /**
   * 数量-----
   */
  subAction: function(e) {
    var index = e.currentTarget.dataset.index
    var cur_cell = this.data.shopping_list[index]
    cur_cell.count > 1 ? cur_cell.count-- : cur_cell.count
    this.setData({
      shopping_list: this.data.shopping_list
    })
    // 
    this.isAllSelected()

    console.log("减少")
    console.log(cur_cell)
  },
  /**
   * 删除购物车中某件商品
   */
  deleteAction: function(e) {
    var that = this
    wx.showModal({
      title: '确定要删除该商品吗',
      confirmColor: "#d32433",
      success: function(res) {
        if (res.confirm) { // 确定
          // 删除该组商品
          var index = e.currentTarget.dataset.index
          that.data.shopping_list.splice(index, 1)
          that.setData({
            shopping_list: that.data.shopping_list
          })
        } else if (res.cancel) { // 取消

        }
        console.log("确定？")
        console.log(res)
      },
      fail: function(err) {
        console.log("失败")
        console.log(err)
      },
      // 完成后, 判断商品是否全部选中, 以便及时更改全选按钮状态
      complete: function() {
        that.isAllSelected()
      }
    })
    

  },
  /**
   * 获取购物车数据
   */
  getShoppingData: function() {
    var that = this;
    wx.request({
      url: app.globalData.service_host + '/api/XingluShoppingCar/myShoppingCarList',
      method: "POST",
      data: { tokenName: "CA17E6EE-BF7C-48CF-83B8-EEC11EC7F0C2" },
      success: function (res) {
        console.log("购物车列表\n")
        console.log(res)
        // 为每组数据添加is_selected 字段
        if (res.data.resultData) {
          that.setIs_selected(res.data.resultData, false)
        }


      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getShoppingData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

    // 获取购物车列表每件商品的id及数量count
    var list = []
    if (this.data.shopping_list) {
      for (var i = 0; i < this.data.shopping_list.length; i++) {
        list.push({ id: this.data.shopping_list[i].id, amount: this.data.shopping_list[i].count })
      }
    }
    
    if (!this.data.is_edit) return
    // 若编辑过，则将状态复原为默认值 false
    // 复原属性值
    this.setData({
      is_edit: false,
      is_all_selected: false,
      total_money: 0
    })
    console.log(list)
    /**
     * 页面隐藏时，提交修改后的购物车数据
     * /api/XingluShoppingCar/EditAmount
     */
    wx.request({
      url: app.globalData.service_host+ '/api/XingluShoppingCar/EditAmount',
      method: "POST",
      data: { tokenName: "CA17E6EE-BF7C-48CF-83B8-EEC11EC7F0C2", list: list},
      success: function(res) {
        console.log(res)
      },
      fail: function(err) {
        console.log("购物车修改提交失败!")
        console.log(err)
      },
    })
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