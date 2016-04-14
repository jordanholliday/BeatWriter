var YoutubeUtil = {
  loadApiScript: function () {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },

  loadPlayer: function (youtubeId) {
    return new YT.Player('song-container', {
      videoId: youtubeId,
      height: window.innerHeight,
      width: window.innerWidth,
      modestBranding: 1,
      showinfo: 0,
      controls: 0,
      fs: 0,
      disablekb: 0,
      rel:0,
      wmode: "transparent"
    });
  }
};

module.exports = YoutubeUtil;
