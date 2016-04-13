var React = require('react');

var SplashPage = React.createClass({
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
