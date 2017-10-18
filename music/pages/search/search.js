const app = getApp();
Page({
  data: {
    baseImgUrl: 'https://y.gtimg.cn/music/photo_new/T002R150x150M000',
    song: '',
    songs:[]
  },
  songInput:function(e){
    this.setData({
      song:e.detail.value
    })
  },
  listenerLogin:function(){
    wx.request({
      url:'https://szc.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
      data:{
        format:'json',
        w:this.data.song
      },
      success:({data:{data:{song:{list}}}})=>{
        this.setData({
          songs:list
        })
        console.log(this.data.songs)
      }
    })
  },
  addPlayList({currentTarget :{dataset:{song}}}) {
    app.addPlayList(song);
    console.log(song);
  }
})