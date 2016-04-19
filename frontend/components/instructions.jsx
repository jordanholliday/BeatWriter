var React = require('react'),
    YoutubeUtil = require('../util/youtube_util'),
    Footer = require('./footer');

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
            <li>Earn points by the typing the right letter.</li>
            <li><em>Lose</em> points by typing the wrong letter.</li>
            <li>The letters move like Bono: with or without you, and roughly in time with the music.</li>
            <li>It's pretty tough at first. Summer Song is a good warm up.</li>
          </ol>
        </div>
        <h2>
          Press <span className="key">SPACE</span> to continue.
        </h2>
        <Footer />
      </div>
    )
  }
});

module.exports = Instructions;
