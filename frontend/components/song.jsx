var React = require('react'),
    ApiUtil = require('../util/api_util'),
    LetterUtil = require('../util/letter_util'),
    Beat = require('./beat'),
    YouTubePlayer = require('youtube-player'),
    YoutubeUtil = require('../util/youtube_util'),
    ReactTransitionGroup = require('react-addons-transition-group'),
    CssUtil = require('../util/css_util');

var Song = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
    },

  componentDidMount: function () {
    YoutubeUtil.loadApiScript()
    $(document.body).on('keydown', this.keyDownHandler);
    ApiUtil.getSongBeats(this.props.params.songId, this.storeSongBeats);
  },

  componentWillUnmount: function () {
    $(document.body).off('keydown', this.keyDownHandler);
    if (this.intervalVar) {clearInterval(this.intervalVar)}
  },

  getInitialState: function () {
    return {
      localTime: 0,
      ytTime: 0,
      nextBeat: 0,
      score: 0,
      playing: false,
      lastStop: 0
    }
  },

  keyDownHandler: function (e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.which === 32) {
      this.togglePlay();
    } else if (e.which === 37 && this.player.getPlayerState() !== 1) {
      this.context.router.push('/track-list');
    } else if (this.state.beats) {
      this.scoreInput(e);
    }
  },

  scoreInput: function (e) {
    // while scoring beats, check no score is already set.
    // if (score), deduct two points for wrong letters - stops button mashing -
    // and then return; immediately return for correct letters
    if (LetterUtil.codeToLowerCase(e) === this.state.beats[this.state.nextBeat].letter) {
      if (this.state.beats[this.state.nextBeat].score) {return;}
      this.updateScore(10);
    } else {
      this.updateScore(-2);
    }
  },

  storeSongBeats: function (song) {
    LetterUtil.assignLetters(song.beats);

    this.setState({
      beats: song.beats,
      name: song.name,
      songId: song.id
    });

    // after storing beats, load YT player
    this.player = YoutubeUtil.loadPlayer(song.youtube_id, this.onPlayerStateChange);
    if (!this.player){
      // if the player did not come back defined,
      // redirect to track listing to reload Youtube API
      this.context.router.push('/track-list');
    }
  },

  togglePlay: function () {
    if (this.player.getPlayerState && this.player.getPlayerState() !== 1) {
      this.player.playVideo();
      this.intervalVar = setInterval(this.playerTimeInterval, 10);
      this.setState({playing: true, localTime: this.state.ytTime});
    } else {
      this.player.pauseVideo();
      clearInterval(this.intervalVar);
      this.setState({playing: false, lastStop: this.state.localTime});
    }
  },

  updateScore: function (points) {
    this.setState({score: this.state.score + points});

    if (points < 0) {
      var score = this.state.beats[this.state.nextBeat].score;
      this.state.beats[this.state.nextBeat].score = score ? score - 2 : -2;
      $('.selected-after').addClass('highlight');
      $('.selected-before').removeClass('highlight');
    } else if (points > 0) {
      this.state.beats[this.state.nextBeat].score = 10;
      $('.selected-before').addClass('highlight');
      $('.selected-after').removeClass('highlight');
    }
  },

  playerTimeInterval: function () {
    if (this.player.getPlayerState() !== 1) {return;}

    var ytTime = this.player.getCurrentTime();
    if (ytTime === this.state.ytTime) {
      this.setState({ localTime: this.state.localTime + .01 });
    } else {
      this.setState({ localTime: ytTime, ytTime: ytTime });
    }

    this.incrementBeat();
  },

  incrementBeat: function () {
    // if the current nextBeat is the final beat, clear interval after .5s and return
    if ((!this.state.beats[this.state.nextBeat + 1])) {
      clearInterval(this.intervalVar);
      return;
    }

    // otherwise update nextBeat
    if (this.state.beats[this.state.nextBeat + 1].time < this.state.localTime + 0.15) {
      var nextBeat = this.state.nextBeat + 1;
      this.setState({
        nextBeat: nextBeat
      });

      CssUtil.removeHighlights();
    }
  },

  checkVideoOver: function () {
    if (this.player.getPlayerState() === 0) {
      clearInterval(this.intervalVar);
      this.context.router.push("/track-list");
    }
  },

  // no animation on video start in sliding-letter mode
  checkVideoStart: function () {
    if (this.player.getPlayerState() === 1) {
      // add one for initial flash to account for empty placeholder beat
      var nextBeat = this.state.nextBeat === 0 ? 1 : this.state.nextBeat;
      CssUtil.flashRules(this.state.beats[nextBeat].time - this.state.localTime - 1.7);
    }
  },

  onPlayerStateChange: function () {
    this.checkVideoOver();
    this.checkVideoStart();
  },

  renderOneBeat: function (i) {
    if (this.state.beats[i]) {
     return (<Beat
        letter={this.state.beats ? this.state.beats[i].letter : null}
        key={i + this.state.beats[i].letter}
        score={this.state.beats[i].score}
      />);
    } else {
      return (<Beat
        letter={null}
        key={i}
      />);
    }
  },

  renderBeats: function () {
    if (!this.state.beats) {return null;}
    if (!this.state.playing) {
      return this.renderPauseMessage();
    }

    var nextBeat = this.state.nextBeat;
    var beatArr = [];
    for (var i = (nextBeat - 10 > 0 ? nextBeat - 10 : 0); i < this.state.beats.length && i < nextBeat + 10; i++) {
      // to display, beat must be within 1.7s of localTime AND at time after last video pause
      if (Math.abs(this.state.beats[i].time - this.state.localTime) < 1.3 && this.state.beats[i].time > this.state.lastStop + 1.0) {
        beatArr.push(this.renderOneBeat(i));
      }
    }

    return beatArr;
  },

  renderPauseMessage: function () {
    return (
      <li className="pause-msg">
        <span className="key">Space</span> to play or pause, <span className="key">←</span> to return to track list
      </li>
    );
  },

  render: function () {
    return (
      <div>
        <div className="game-layer" id="game-layer">
          <ul className="group beat-letters">
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
