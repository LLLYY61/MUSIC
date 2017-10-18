const app = getApp()
Page({
  data: {
    topid:0,
    song_num: 40,
    song_begin: 0,
    songUrl: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
    baseImgUrl: 'https://y.gtimg.cn/music/photo_new/T002R150x150M000',
    songList: [],
    Img:'../../img/1.png',
    ListName: "",
    update_time:""
  },
  onLoad: function ({topid}) {
    this.setData({
      'topid':topid
    }),
      this.listDetail(),
      this.lists()
  },
  onReachBottom() {
    this.listDetail();
  },
  listDetail(){
    app.loadSongData({
      url: this.data.songUrl,
      data: {
        topid: this.data.topid,
        song_num: this.data.song_num,
        song_begin: this.data.song_begin
      },
      dataType: "json",
      method: "GET",
      callback: ({data:{songlist}}) => {
        this.setData({
          'songList': this.data.songList.concat(songlist),
          'song_begin': this.data.song_num + this.data.song_begin,
          'Img': this.data.baseImgUrl + songlist[0].data.albummid+'.jpg'
        })
      }
    })
  },
  lists(){
    wx.request({
      url: this.data.songUrl ,
      data: {
        topid: this.data.topid,
        song_num: this.data.song_num,
        song_begin: this.data.song_begin
      },
      dataType: "json",
      method: "GET",
      success:({data})=>{
        this.setData({
          ListName: data.topinfo.ListName,
          update_time: data.update_time
        })
      }
    })
  },
  addPlayList({ currentTarget: { dataset: { song: { data } } } }) {
    app.addPlayList(data);
    console.log(data);
  }

})