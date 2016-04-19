var React = require('react');

var Footer = React.createClass({
  render: function () {
    return (
      <section className="footer">
        <ul>
          <li>( by Jordan Holliday </li>
          <li><a href="http://github.com/jmhol9" target="_blank">github</a></li>
          <li><a href="http://jordanholliday.com" target="_blank">portfolio</a></li>
          <li><a href="mailto:jordanholliday@gmail.com" target="_blank">email</a> )</li>
        </ul>
      </section>
    )
  }
});

module.exports = Footer;
