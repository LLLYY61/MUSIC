Page({
  data: {
    texts:[],
  },
  onLoad: function () {
    this.topList();
  },
  onPullDownRefresh:function(){
    this.setData({
      texts:[]
    }),
      this.topList();
  },
  topList(){
    wx.request({
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
      data: {
        format: 'json',
      },
      success: ({ data: { data: { topList } } }) => {
        for(let i=0;i<topList.length-1;i++){
          //topList[i].id为201是MV，此地址获取不到，直接从数组中剔除
          if (topList[i].id==201){
            topList.splice(i,1)
          }
        }
        this.setData({
          'texts': this.data.texts.concat(topList),
        })
      }
    })
  }
})
