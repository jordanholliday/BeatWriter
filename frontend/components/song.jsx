var React = require('react'),
    ApiUtil = require('../util/api_util'),
    LetterUtil = require('../util/letter_util'),
    Beat = require('./beat'),
    YouTubePlayer = require('youtube-player'),
    YoutubeUtil = require('../util/youtube_util');

var Song = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
    },

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
    ApiUtil.getSongBeats(this.props.params.songId, this.storeSongBeats);
  },

  componentWillUnmount: function () {
    $(document.body).off('keydown', this.keyDownHandler);
    if (this.intervalVar) {clearInterval(this.intervalVar)}
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
      $('.selected-before').addClass('highlight');
    } else {
      this.state.beats[this.state.nextBeat].score = -2;
      this.setState({score: this.state.score - 2});
      $('.selected-after').addClass('highlight');
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
    this.player = YoutubeUtil.loadPlayer(song.youtube_id);
  },

  togglePlay: function () {
    if (this.player.getPlayerState() !== 1) {
      this.player.playVideo();
      this.intervalVar = setInterval(this.playerTimeInterval, 10);
    } else {
      this.player.pauseVideo();
      clearInterval(this.intervalVar);
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
    var nextBeat = this.state.nextBeat;
    console.log("next beat time " + this.state.beats[nextBeat + 1].time);
    console.log("local time " + this.state.localTime);
    console.log("//");
    if (this.state.beats[nextBeat + 1].time < this.state.localTime + 0.03) {
      var timeTillNextBeat = this.state.beats[nextBeat + 2].time - this.state.beats[nextBeat + 1].time;
      $('.selected-before')[0].style.transitionDuration = timeTillNextBeat + "s";
      $('.selected-after')[0].style.transitionDuration = timeTillNextBeat + "s";

      this.setState({
        nextBeat: this.state.nextBeat + 1
      });

      $('.selected-before').addClass("new-beat")
                             .delay(25)
                             .queue(function() {
                                 $(this).removeClass("new-beat");
                                 $(this).dequeue();
                             });

      $('.selected-after').addClass("new-beat")
                             .delay(25)
                             .queue(function() {
                                 $(this).removeClass("new-beat");
                                 $(this).dequeue();
                             });

      this.removeHighlights();
    }

    if (nextBeat === this.state.beats.length) {
      clearInterval(this.intervalVar);
    }
  },

  removeRules: function () {
    $('.selected-before').addClass('new-beat');
    $('.selected-after').addClass('new-beat');
  },

  addRules: function () {
    $('.selected-before').removeClass('new-beat');
    $('.selected-after').removeClass('new-beat');
  },

  removeHighlights: function () {
    $('.selected-before').removeClass('highlight');
    $('.selected-after').removeClass('highlight');
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
