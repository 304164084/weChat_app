import wxParse from '../wxParse/wxParse.js';
var app = getApp();
var views = ["banner", "detail", "matchs"];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: ["商品介绍", "图文详情", "推荐搭配"],
    toView: "banner",
    margin_left: 85, 
    introduceHeight: 0, // 商品介绍的高度(px)
    matchHeight: 0,     // 推荐搭配的高度(px)
    previewImageUrls: [],  // 预览图片数组
    size_name: "尺码",
    animation: {}, // 动画
    animation_mask: {}, // 动画
    showModalStatus: false, // modal是否需要渲染
    colour: "", // 默认选中的款色模型
    sell_price: "",
    tag_price: "",

  },
  // 加入购物车
  addCart: function(e) {
    console.log("加入购物车\n")
    console.log(e)
    if (this.data.size_name == "尺码") { // 未选中尺码
      // 展示尺码列表
      this.modalSizeList()
      return
    }

  },
  // 立即购买
  buyNow: function(e) {
    console.log("立即购买\n")
    console.log(e)
    if (this.data.size_name == "尺码") { // 未选中尺码
      // 展示尺码列表
      this.modalSizeList()
      return
    }
    console.log("吃屎")
  },
  itemClicked: function(e) {
    var that = this;
    // 指示器移动
    var index = e.target.dataset.index;
    var left = this.data.margin_left;
    left = index * 250 +85;
    this.setData({
      margin_left: left,
    })
    //切换页面
    var cur_view = views[index]
    this.setData({
      toView: cur_view
    })
    if(index == 2) { // 推荐搭配
      // that.getMatchInfo(当前选中款色的productNo)
    }
  },
  // 图片预览
  previewImage: function(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.previewImageUrls,
    })
  },
  // 选择款色
  selectedColor: function(e) {
    var colour = e.target.dataset.info.colour
    var id = e.target.dataset.info.productId
    this.setData({
      colour: colour
    })
    // 获取对应款色的轮播图详情
    this.getBannerImages(id, colour)
  },
  // 方法封装
  // 获取图文详情
  getImageDetail: function(id) {
    var that = this;
    wx.request({
      url: app.globalData.service_host + '/api/XingluProductNew/findProductImageText',
      method: "POST",
      data: {id: id},
      success: function(res) {
        console.log("图文详情\n")
        console.log(res)
        var image_detail = app.globalData.html_header + res.data.resultData.imageTexts
        wxParse.wxParse('image_detail', 'html', image_detail, that, 5);
      }
    })
  },
  // 获取搭配信息
  getMatchInfo: function (productNo) {
    var that = this;
    wx.request({
      url: app.globalData.service_host + '/api/XingluProductNew/findPro',
      method: "POST",
      data: { productNo: productNo },
      success: function (res) {
        console.log("搭配信息\n")
        console.log(res)
        that.setData({
          // matchs{responsePro:[], topImage:""}
          matchs: res.data.resultData
        })
      }
    })
  },
  // 商品轮播图
  getBannerImages: function(id, colour) {
    var that = this;
    // 商品轮播图
    wx.request({
      url: app.globalData.service_host + '/api/XingluProductNew/findProductIntroduce',
      method: "POST",
      data: { id: id, colourId: colour },
      success: function (res) {
        console.log("轮播图\n")
        console.log(res)
        var images = [];
        // if (res.data.resultCode == 2001) {
        //   return
        // }
        for (var i = 0; i < res.data.resultData.length; i++) {
          images.push(res.data.resultData[i].imageUrl)
        }

        that.setData({
          banner_images: res.data.resultData,
          previewImageUrls: images,
        })
      },
    });
  },
  showSizeList: function(e) {
    // 展示尺码列表
    this.modalSizeList()
    //

  },
  // 隐藏尺码列表
  hiddenSizeList: function(e) {
    var that = this;
    this.animation_list.height(0).step()
    this.animation_mask.opacity(0).step()
    that.setData({
      animation: this.animation_list.export(),
      animation_mask: this.animation_mask.export()
    })
    // 设置定时器 500ms后移除遮罩
    setTimeout(function () {
      // 渲染遮罩
      that.setData({
        showModalStatus: false
      })
    }, 500)
  },
  // 选中尺码
  selectedSize: function (e) {
    console.log(e)
    var size = e.target.dataset.size.split("|")[0]
    this.setData({
      size_name: size
    })
    this.hiddenSizeList()
  },
  // 展示尺码列表
  modalSizeList: function () {
    var that = this;

    this.animation_list = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation_mask = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
    })
    if (!this.data.showModalStatus) { // 未渲染 展示尺码列表
      // 渲染遮罩
      this.setData({
        showModalStatus: true
      })
      // 当前选中款色所拥有的所有尺码
      var height = 41 * this.data.colors[0].size.length
      this.animation_list.height(height).step()
      this.animation_mask.opacity(0.2).step()
      that.setData({
        animation: that.animation_list.export(),
        animation_mask: that.animation_mask.export()
      })
    } else {  // 已渲染 隐藏尺码列表
      this.animation_list.height('0rpx').step()
      this.animation_mask.opacity(0).step()
      that.setData({
        animation: that.animation_list.export(),
        animation_mask: that.animation_mask.export()
      })
      setTimeout(function () {
        // 渲染遮罩
        this.setData({
          showModalStatus: false
        })
      }, 500)
    }
  },
  // scroll view 滚动
  scrollViewDidScroll: function(e) {
    console.log(e.detail)
    var offsetY = e.detail.scrollTop
    var introduceHeight = this.data.introduceHeight
    var margin_bottom = e.detail.scrollHeight - this.data.matchHeight
    if (offsetY >= introduceHeight && offsetY < margin_bottom){
      this.setData({
        margin_left: 335,
      })
    } else if(offsetY >= margin_bottom) {
      this.setData({
        margin_left: 585,
      })
    } else {
      this.setData({
        margin_left: 85,
      })
    }
  },
  // 循环遍历出当前款色对应的colourid 并返回productNo
  findProNoByColour: function(data, cur_colour) {
    var index = 0;
    for(var i= 0; i < data.length; i++) {
      if (data[i].colour == cur_colour){
         index = i;
      }
    }
    return data[index].productNo
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // px与 rpx 的转换比例
    var scale = app.globalData.screenWidth / 750
    // 计算商品介绍在当前设备上的高度(px)
    var introduceHeight = scale * 796
    // 计算推荐搭配在当前设备上的高度(px)
    var matchHeight = scale *1900
    this.setData({
      introduceHeight: introduceHeight,
      matchHeight: matchHeight
    })
    // 计算推荐搭配在当前设备上的高度(px)
    var matchHeight = scale * 55

    // console.log(options.id, options.colourid)

    // 存储colourid 用于选中款色模型
    this.setData({
      colour: options.colourid
    })
    var that = this;
    // 获取单品详情数据
    wx.showLoading({
      title: '',
    })
    // 商品详情
    wx.request({
      url: app.globalData.service_host +"/api/XingluProductNew/findProductDetail",
      method: "POST",
      data: {id: options.id, colour: options.colourid},
      success: function(res) {
        console.log("商品详情\n")
        console.log(res);
        var sell_price = res.data.resultData[0].size[0].salesPrice.split(".")[0]
        var tag_price = res.data.resultData[0].size[0].tagPrice.split(".")[0]
        that.setData({
          colors: res.data.resultData,
          sell_price: sell_price,
          tag_price: tag_price
        });
        
        // 设置选中款色
        var productNo = that.findProNoByColour(res.data.resultData, options.colourid)
        console.log(productNo)
        that.getMatchInfo(productNo)
        // 设置导航条标题为商品名
        wx.setNavigationBarTitle({
          title: res.data.resultData[0].productName,
        })
        wx.hideLoading();
      },
    });
    // 商品详情轮播图
    this.getBannerImages(options.id, options.colourid)
    this.getImageDetail(options.id)
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