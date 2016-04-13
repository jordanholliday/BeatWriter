var React = require('react');

var Beat = React.createClass({
  render: function () {
    return <li
        className={this.props.selected ? "selected" : null}
        data-score={this.props.score}
      >
        {this.props.letter ? this.props.letter : "🎧"}
      </li>;
  }
});

module.exports = Beat;
