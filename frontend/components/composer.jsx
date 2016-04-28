var React = require('react'),
    ApiUtil = require('../util/api_util'),
    Footer = require('./footer');

var Composer = React.createClass({
  getInitialState: function () {
    return {
      localTime: 0,
      ytTime: 0,
      nextBeat: 0,
      password: null,
      youtubeId: null
    }
  },

  componentDidMount: function () {
    // $(document.body).on('keydown', this.keyDownHandler);
    this.enableIframeApi();
  },

  componentWillUnmount: function () {
    // $(document.body).off('keydown', this.keyDownHandler);
  },

  keyDownHandler: function (e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.which === 32) {
     if (this.getPlayer().getPlayerState() !== 1) {
       this.getPlayer().playVideo();
       this.intervalVar = setInterval(this.playerTimeInterval, 10);
     } else {
       this.getPlayer().pauseVideo();
       clearInterval(this.intervalVar);
     }
    } else if (e.which === 188 || e.which === 190) {
      ApiUtil.addBeat({
        time: this.state.localTime,
        song_id: "12"
      });
    }
  },

  playerTimeInterval: function () {
    var ytTime = this.getPlayer().getCurrentTime();
    if (ytTime === this.state.ytTime) {
      this.setState({ localTime: this.state.localTime + .010 });
    } else {
      this.setState({ localTime: ytTime, ytTime: ytTime });
    }
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
        videoId: "_zPlr-o-YEQ",
        height: window.innerHeight,
        width: window.innerWidth,
        modestBranding: 1,
        showinfo: 0,
        controls: 0,
        fs: 0,
        disablekb: 0
      });
    }

    // make player in scope throughout composer
    this.getPlayer = function () {
      return player;
    }
  },

  updatePassword: function (e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({password: e.currentTarget.value});
  },

  passwordCorrect: function () {
    this.state.password === "gunforhire";
  },

  render: function () {
    return (
      <container className="song-container" id="song-container"> </container>
      <div className="splash-bg">
        <h2 className="statics-title">
          Composer
        </h2>
        <div className="statics-wrapper">
          <label for="youtube-id">YouTube ID</label>
          <input type="text" id="youtube-id" value={this.state.password}/>
          <label for="password">Password</label>
          <input type="password" id="password" onChange={this.updatePassword}/>
        </div>
        <h2>
          Press <span className="key">ENTER</span> to submit
        </h2>
        <Footer />
      </div>
    );
  }
});

module.exports = Composer;
