var React = require('react'),
    YoutubeUtil = require('../util/youtube_util');

var Instructions = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
    },

  componentDidMount: function () {
    $(document.body).on('keydown', this.keyDownHandler);

    // load YouTube API
    YoutubeUtil.loadApiScript();
  },

  componentWillUnmount: function () {
    $(document.body).off('keydown', this.keyDownHandler);
  },

  keyDownHandler: function (e) {
    event.preventDefault();
    var router = this.context.router;

    if (e.which === 32) {
      this.context.router.push("/track-list");
    } else if (false) {
      null;
    }
  },

  render: function () {
    return (
      <div className="splash-bg">
        <h2 className="statics-title">
          Instructions
        </h2>
        <div className="statics-wrapper">
          <ol>
            <li>BeatWriter is a typing tutor. Music plays and you type to the beat.</li>
            <li>Type the letter shown between the arrows.</li>
            <li>You earn points for the typing the right letter.</li>
            <li>Regrettably, you <em>lose</em> points for typing the wrong letter.</li>
            <li>The letters advance like Bono—with or without you—and roughly in time with the music.</li>
          </ol>
        </div>
        <h2>
          Press <span className="key">SPACE</span> to continue.
        </h2>
      </div>
    )
  }
});

module.exports = Instructions;
