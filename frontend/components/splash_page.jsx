var React = require('react');

var SplashPage = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
    },

  componentDidMount: function () {
    $(document.body).on('keydown', this.keyDownHandler);

    // load YouTube API
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },

  componentWillUnmount: function () {
    $(document.body).off('keydown', this.keyDownHandler);
  },

  keyDownHandler: function (e) {
    event.preventDefault();
    var router = this.context.router;

    if (e.which === 32) {
      this.context.router.push("/song");
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
          Press <span className="key">SPACE</span> for track list or <span className="key">?</span> for instructions.
        </h2>
      </div>
    );
  }
});

module.exports = SplashPage;
