//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    title:"热门歌曲",
    topid:26,
    song_num:9,
    song_begin:0,
    songUrl:'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
    baseImgUrl:'https://y.gtimg.cn/music/photo_new/T002R150x150M000',
    songList:[],
  },
  onLoad(){
    this.loadList();
    wx.request({
      url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
      success: ({ data: { data: { slider } } }) => {
        this.setData({
          'imgUrls': slider,
        })
      }
    })
  },
  onReachBottom(){
    this.loadList();
  },

  loadList(){
    app.loadSongData({
      url: this.data.songUrl,
      data: {
        topid:this.data.topid,
        song_num:this.data.song_num,
        song_begin:this.data.song_begin
      },
      dataType: "json",
      method: "GET",
      callback: ({ data: { songlist } }) => {
        this.setData({
          'songList':this.data.songList.concat(songlist),
          'song_begin':this.data.song_num + this.data.song_begin
        })
      }
    })    
  },
  addPlayList({currentTarget:{dataset:{song:{data}}}}){
    app.addPlayList(data) 
  }
})
