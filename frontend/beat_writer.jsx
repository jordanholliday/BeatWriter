var React = require('react'),
    ReactDOM = require('react-dom'),
    Song = require('./components/song');

$(document).on('ready', function () {
  ReactDOM.render(
    <Song youtubeId="Zbhc6ypLnuw" songId="1" />, $('.react-root')[0]
  );
});
