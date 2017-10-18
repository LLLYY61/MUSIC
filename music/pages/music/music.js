Page({
  data: {
    playSongIds: [],
    nodeIndex: 0,
    nowPlay: {
      songId: 0,
      songName: "",
      songImg: "../../img/timg.jpg",
      singer: ""
    },
    //是否显示播放列表
    listShow: false,
    //当前状态
    pauseStatus: true,
    // 当前播放时间
    currentPosition: 0,
    // 歌曲长度
    duration: 0,
    // 当前播放时长
    sliderValue: 0
  },
  //获取播放列表
  onShow: function () {
    this.setData({
      playSongIds: wx.getStorageSync("playList")
    });
  },
  runMusic: function () {
    if (this.data.nowPlay.songId ==0) {
      wx.showToast({
        mask: true,
        title: "暂无歌曲",
        image: "../../img/tip.png"
      });
      return;
    }
    if (this.data.pauseStatus) {
      this.setData({
        pauseStatus: false
      })
      this.play();
    }else{
      //暂停播放音乐
      wx.pauseBackgroundAudio();
      //清空计时器
      clearInterval(this.data.timer);
      this.setData({
        pauseStatus: true
      });
    }
  },
  // 以背景音乐进行播放
  play:function(){
    wx.playBackgroundAudio({
      dataUrl: this.data.nowPlay.songUrl,
      title: this.data.nowPlay.songName
    })
    // let that = this;
    let timer = setInterval(() => {
      this.setDuration();
    }, 1000)
    this.setData({timer:timer})
  },
  //获取播放时间
  setDuration: function () {
    wx.getBackgroundAudioPlayerState({
      success: (res) => {
        let { status, duration, currentPosition } = res
        //status:1是播放中，0是暂停中
        if (status === 1 || status === 0) {
          var that = this;
          this.setData({
            currentPosition: that.stotime(currentPosition),
            duration: that.stotime(duration),
            sliderValue: Math.floor(currentPosition / duration * 100),
          });
          //当播放结束时直接跳到下一首
          if (this.data.currentPosition == this.data.duration) {
            this.bindTapNext();
          }
        }
      }
    })
  },
  //格式化时间
  stotime: function (s) {
    let t = '';
    if (s > -1) {
      //获取时间
      let min = Math.floor(s / 60);
      let sec = s % 60;
      if (min < 10) {
        t += "0";
      }
      t += min + ":";
      if (sec < 10) {
        t += "0";
      }
      t += sec;
    }
    return t;
  },

  //控制音乐的进度，滑块滑动
  bindSliderchange:function(e){
    wx.getBackgroundAudioPlayerState({
      success: (res) => {
        let { status, duration, currentPosition } = res
        if (status === 1 || status === 0) {
          this.setData({
            sliderValue: e.detail.value
          });
          wx.seekBackgroundAudio({
            position: (e.detail.value) / 100 * duration
          })
        //   console.log(this.data.sliderValue);
        //   console.log(this.data.duration);
        //   console.log(this.data.currentPosition);
      }
    }
  })
  },



  //打开列表
  changeList: function () {
    this.setData({
      listShow: !this.data.listShow
    })
  },
  //选择播放歌曲
  chooseMiusc: function ({ currentTarget: { dataset: { index } } }) {
    this.setData({
      nodeIndex: index,
      listShow: false,
      nowPlay: this.data.playSongIds[index],
      pauseStatus :false
    });
    setTimeout(() => {
      if (this.data.pauseStatus === false) {
        this.play()
      }
    }, 1000);
  },
  //选择前一首
  prevMusic:function(){
    if (this.data.nodeIndex == 0) {
       this.data.nodeIndex = this.data.playSongIds.length ;
    };
    this.setData({
      playSongIds: wx.getStorageSync("playList"),
      nowPlay: this.data.playSongIds[--this.data.nodeIndex],
      pauseStatus: false,
    });
   this.play();
  } ,
  //选择后一首
  bindTapNext:function(){
    if (this.data.nodeIndex == this.data.playSongIds.length-1 ) {
      this.data.nodeIndex = -1;
    };
    this.setData({
      playSongIds: wx.getStorageSync("playList"),
      nowPlay: this.data.playSongIds[++this.data.nodeIndex],
      pauseStatus: false,
    });
    this.play();
  },

})