var React = require('react'),
    ApiUtil = require('../util/api_util'),
    Footer = require('./footer');

var TrackList = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
    },

  getInitialState: function () {
    return {tracks: null};
  },

  setSongsInState: function (tracks) {
    this.setState({
      tracks: tracks,
      selectedTrack: 0
      });
  },

  keyDownHandler: function (e) {
    event.preventDefault();
    var router = this.context.router;

    if (e.which === 38 && this.state.tracks) {
      var selectedTrack = this.state.selectedTrack - 1;
      if (selectedTrack < 0) {selectedTrack = 0;}
      this.setState({selectedTrack: selectedTrack});
    } else if (e.which === 40 && this.state.tracks) {
      var selectedTrack = this.state.selectedTrack + 1;
      if (selectedTrack >= this.state.tracks.length) {selectedTrack = this.state.tracks.length -1;}
      this.setState({selectedTrack: selectedTrack});
    } else if (e.which === 13 && this.state.tracks) {
      var trackId = this.state.tracks[this.state.selectedTrack].song_id
      this.context.router.push("/song/" + trackId);
    }
  },

  componentDidMount: function () {
    ApiUtil.getSongs(this.setSongsInState);
    $(document.body).on('keydown', this.keyDownHandler);
  },

  componentWillUnmount: function () {
    $(document.body).off('keydown', this.keyDownHandler);
  },

  renderTrackList: function () {
    if (this.state.tracks) {
      var trackArr = [];
      var i = 0;
      this.state.tracks.forEach(function (track) {
        trackArr.push(
          <li key={track.song_id}>
            <span className={this.state.selectedTrack === i ? "selected" : null}>
              {track.name}
            </span>
            <span className="bpm">
              ({Math.floor(track.bpm)} bpm)
            </span>
          </li>
        );

        i++;
      }.bind(this))
      return trackArr;
    } else  {
      return <p>loading...</p>;
    }
  },

  render: function () {
    return (
      <div className="splash-bg">
        <h2 className="statics-title">
          Track List
        </h2>
        <div className="statics-wrapper">
          <ol>
            {this.renderTrackList()}
          </ol>
        </div>
        <h2>
          Press <span className="key">↑</span>, <span className="key">↓</span>, or <span className="key">ENTER</span> to select.
        </h2>
        <Footer />
      </div>
    )
  }
});

module.exports = TrackList;
