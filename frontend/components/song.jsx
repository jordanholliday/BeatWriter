var React = require('react'),
    ApiUtil = require('../util/api_util'),
    LetterUtil = require('../util/letter_util'),
    Beat = require('./beat');

var Song = React.createClass({
  getInitialState: function () {
    return {
      localTime: 0,
      ytTime: 0,
      nextBeat: 0,
      score: 0
    }
  },

  componentDidMount: function () {
    $(document.body).on('keydown', this.keyDownHandler);
    this.enableIframeApi();
    ApiUtil.getSongBeats("1", this.storeSongBeats);
  },

  componentWillUnmount: function () {
    $(document.body).off('keydown', this.keyDownHandler);
  },

  keyDownHandler: function (e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.which === 32) {
      this.togglePlay();
    } else if (this.state.beats) {
      this.scoreInput(e);
    }
  },

  scoreInput: function (e) {
    // while scoring beats, check no score is already set. this rejects inputs
    // if that letter has already been scored
    if (this.state.beats[this.state.nextBeat].score) {return;}
    if (LetterUtil.codeToLowerCase(e) === this.state.beats[this.state.nextBeat].letter) {
      this.state.beats[this.state.nextBeat].score = 10;
      this.setState({score: this.state.score + 10});
    } else {
      this.state.beats[this.state.nextBeat].score = -2;
      this.setState({score: this.state.score - 2});
    }
  },

  storeSongBeats: function (song) {
    LetterUtil.assignLetters(song.beats);

    this.setState({
      beats: song.beats,
      name: song.name,
      songId: song.id
    });
  },

  togglePlay: function () {
    if (this.getPlayer().getPlayerState() !== 1) {
      this.getPlayer().playVideo();
      this.intervalVar = setInterval(this.playerTimeInterval, 10);
    } else {
      this.getPlayer().pauseVideo();
      clearInterval(this.intervalVar);
    }
  },

  playerTimeInterval: function () {
    if (this.getPlayer().getPlayerState() !== 1) {return;}

    var ytTime = this.getPlayer().getCurrentTime();
    if (ytTime === this.state.ytTime) {
      this.setState({ localTime: this.state.localTime + .01 });
    } else {
      this.setState({ localTime: ytTime, ytTime: ytTime });
    }

    this.incrementBeat();
  },

  incrementBeat: function () {
    var nextBeat = this.state.nextBeat;
    if (this.state.beats[nextBeat + 1].time < this.state.localTime + 0.03) {
      this.setState({
        nextBeat: this.state.nextBeat + 1
      });
    }

    if (nextBeat === this.state.beats.length - 1) {
      clearInterval(this.intervalVar);
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
        videoId: "KEI4qSrkPAs",
        height: window.innerHeight,
        width: window.innerWidth,
        modestBranding: 1,
        showinfo: 0,
        controls: 0,
        fs: 0,
        disablekb: 0,
        wmode: "transparent"
      });
    }

    // make player in scope throughout composer
    this.getPlayer = function () {
      return player;
    }
  },

  renderOneBeat: function (i) {
    if (this.state.beats[i]) {
     return (<Beat
        letter={this.state.beats ? this.state.beats[i].letter : null}
        selected={this.state.nextBeat === i}
        key={this.state.nextBeat + i}
        score={this.state.beats[i].score}
      />);
    } else {
      return (<Beat
        letter={null}
        selected={this.state.nextBeat === i}
        key={this.state.nextBeat + i}
      />);
    }
  },

  renderBeats: function () {
    if (!this.state.beats) {return null;}
    var nextBeat = this.state.nextBeat;
    var beatArr = [];

    for (var i = nextBeat - 4; i < this.state.beats.length + 3 && i < nextBeat + 5; i++) {
      beatArr.push(this.renderOneBeat(i));
    }

    return beatArr;
  },

  render: function () {
    return (
      <div>
        <div className="game-layer" id="game-layer">
          <ul className="beat-letters">
            <div className="selected-before"></div>
            {this.renderBeats()}
            <div className="selected-after"></div>
          </ul>
          <section className="scoreboard">
            <h1>Score</h1>
            <h2>{this.state.score}</h2>
          </section>
        </div>
        <container className="song-container" id="song-container">
        </container>
      </div>
    );
  }
});

module.exports = Song;
