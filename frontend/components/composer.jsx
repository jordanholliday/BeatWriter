var React = require('react'),
    ApiUtil = require('../util/api_util');

var Composer = React.createClass({
  componentDidMount: function () {
   // $('.react-root').tubular({
   //      videoId: this.props.youtubeId,
   //      mute: false
   //    })

    $(document.body).on('keydown', this.keyDownHandler);

    this.enableIframeApi();
  },

  componentWillUnmount: function () {
    $(document.body).off('keydown', this.keyDownHandler);
  },

  keyDownHandler: function (e) {
    e.stopPropagation();
    if (e.which === 32) {
      if (this.getPlayer().getPlayerState() !== 1) {
        this.getPlayer().playVideo();
      }
    } else if (e.which === 188 || e.which === 190) {
      ApiUtil.addBeat({
        time: this.getPlayer().getCurrentTime(),
        song_id: this.props.songId
      });
    }

    console.log(e.which)
    console.log(this.getPlayer().getCurrentTime());
  },

  enableIframeApi: function () {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    var youtubeId = this.props.youtubeId;
    onYouTubeIframeAPIReady = function () {
      player = new YT.Player('song-container', {
        videoId: youtubeId,
        height: window.innerHeight,
        width: window.innerWidth,
        modestBranding: 1,
        showinfo: 0,
        controls: 0,
        fs: 0,
        disablekb: 0,
        events: {
          'onReady': this.onPlayerReady,
          'onStateChange': console.log('state change')
        }
      });
    }

    this.getPlayer = function () {
      return player;
    }
  },

  render: function () {
    return (
      <container className="song-container" id="song-container"> </container>
    );
  }
});

module.exports = Composer;
