import util from '../../utils/util.js';
Page({
  data: {
    imgUrls: ['../../assets/images/banner.png'],
    categoryList:
    [{ id: 1, icon: 'iconfont icon-all', text: '全部' },
    { id: 2, icon: 'iconfont icon-all', text: '服装' },
    { id: 3, icon: 'iconfont icon-all', text: '家居用品' },
    { id: 4, icon: 'iconfont icon-all', text: '儿童婴儿' },
    { id: 5, icon: 'iconfont icon-all', text: '男士圆领T恤' },
    { id: 6, icon: 'iconfont icon-all', text: '女士圆领T恤' }],
    curCategoryIndex: 0,
    curCategoryId: '',
    productList: [],
    loading: true,
    product: {
      hidden: true
    }
  },
  // 获取分类列表
  getCategoryList: function () {
    let that = this;
    util.ajax('https://www.easy-mock.com/mock/5ac5c8dbfa1a38662b8c8990/wxapp-movie/getMovies', null, 'POST').then(function (res) {
      res =
        [{ id: 1, icon: 'iconfont icon-all', text: '全部' },
        { id: 2, icon: 'iconfont icon-all', text: '服装' },
        { id: 3, icon: 'iconfont icon-all', text: '家居用品' },
        { id: 4, icon: 'iconfont icon-all', text: '儿童婴儿' },
        { id: 5, icon: 'iconfont icon-all', text: '男士圆领T恤' },
        { id: 6, icon: 'iconfont icon-all', text: '女士圆领T恤' }];
      let categoryList = res;
      let curIndex = that.data.curCategoryIndex;
      categoryList[curIndex].active = 'active';
      that.setData({
        categoryList: categoryList,
        curCategoryId: categoryList[curIndex].id
      });
    }).catch(function (error) {
      console.log('Promise Rejected ==> ' + error);
    });
  },
  // 分类切换
  switchCategory: function (e) {
    let that = this;
    let curIndex = e.currentTarget.dataset.index,
      curId = e.currentTarget.dataset.id;
    let categoryList = that.data.categoryList;
    for (let i = 0; i < categoryList.length; i++) {
      categoryList[i].active = '';
    }
    categoryList[curIndex].active = 'active';
    that.setData({
      categoryList: categoryList,
      curCategoryIndex: curIndex,
      curCategoryId: curId
    })
  },
  // 获取产品列表
  getProductList: function () {
    let that = this;
    that.setData({ loading: true });
    // util.ajax('https://www.easy-mock.com/mock/5ac5c8dbfa1a38662b8c8990/wxapp-movie/getMovies', null, 'POST').then(function (res) {
    let res =
      [{ id: 1, img: '/assets/images/products/pro1.jpg', text: '杯子', price: '￥55.00' },
      { id: 2, img: '/assets/images/products/pro2.jpg', text: '钱包', price: '￥25.00' },
      { id: 3, img: '/assets/images/products/pro3.jpg', text: '男士圆领T恤', price: '￥35.00' },
      { id: 4, img: '/assets/images/products/pro4.jpg', text: '手机壳', price: '￥15.00' },
      { id: 5, img: '/assets/images/products/pro1.jpg', text: '杯子', price: '￥55.00' },
      { id: 6, img: '/assets/images/products/pro2.jpg', text: '钱包', price: '￥25.00' }];
    let productList = res;
    that.setData({
      productList: productList,
      loading: false
    });
    // });
  },
  // 选择产品
  chooseProduct: function () {
    this.setData({
      'product.hidden': false
    })
  },
  // 隐藏产品
  hideProduct: function () {
    this.setData({
      'product.hidden': true
    })
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {
    this.getCategoryList();
    this.getProductList();
  },
  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    let total = this.data.productList.length;
    let newData =
      [{ id: 11, img: '/assets/images/products/pro1.jpg', text: '杯子', price: '￥55.00' },
      { id: 12, img: '/assets/images/products/pro2.jpg', text: '钱包', price: '￥25.00' },
      { id: 13, img: '/assets/images/products/pro3.jpg', text: '男士圆领T恤', price: '￥35.00' },
      { id: 14, img: '/assets/images/products/pro4.jpg', text: '手机壳', price: '￥15.00' },
      { id: 15, img: '/assets/images/products/pro1.jpg', text: '杯子', price: '￥55.00' },
      { id: 16, img: '/assets/images/products/pro2.jpg', text: '钱包', price: '￥25.00' }];
    // 关于setData:单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据
    let productList = this.data.productList;
    for (let i = 0; i < newData.length; i++) {
      let data = {};
      data[`productList[${total + i}]`] = newData[i];
      this.setData(data);
    }
  },
  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    wx.showLoading();
    this.setData({
      productList: [],
    });
    this.getProductList();
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }, 2000);
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})