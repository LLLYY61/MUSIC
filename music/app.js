//app.js
App({
  onLaunch:function(){
    //缓存数据的初始化
    if (wx.getStorageSync("playList") == "") {
      wx.setStorageSync("playList", [])
    }
  },
  addPlayList(data){

    let playList = wx.getStorageSync("playList");

    for (let i = 0; i < playList.length;i++){
      if (playList[i].id==data.songid){
        wx.showToast({
          title: '歌曲已存在',
          image:'../../img/tip.png'
        })
        return;
      }
    }

    let temp="";
    for(let i=0;i<data.singer.length;i++){
      temp+=data.singer[i].name+" , ";
    }
    temp=temp.substring(0,temp.length-3);

    let song={
      id:data.songid,
      songUrl: 'http://ws.stream.qqmusic.qq.com/'+data.songid+'.m4a?fromtag=46',
      songImg: 'https://y.gtimg.cn/music/photo_new/T002R150x150M000' + data.albummid+'.jpg',
      songName:data.songname,
      singers: temp
    };
    
    playList.push(song);
    wx.setStorageSync('playList', playList);
    wx.showToast({
      title: '歌曲添加成功',
      icon: 'success'
    })
  },

  
  loadSongData(opt) {
    wx.request({
      url: opt.url,
      data: opt.data,
      dataType: "json",
      method: "GET",
      success: opt.callback
    })
  }
  
})