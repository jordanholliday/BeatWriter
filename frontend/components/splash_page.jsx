var React = require('react'),
    YoutubeUtil = require('../util/youtube_util');

var SplashPage = React.createClass({
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
      this.context.router.push("/instructions");
    } else if (false) {
      null;
    }
  },

  render: function () {
    return (
      <div className="splash-bg">
        <h1>
          BeatWriter<span className="cursor">|</span>
        </h1>
        <h2>
          Press <span className="key">SPACE</span> to continue.
        </h2>
      </div>
    );
  }
});

module.exports = SplashPage;
