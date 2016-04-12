var React = require('react'),
    ReactDOM = require('react-dom'),
    Composer = require('./components/composer'),
    Song = require('./components/song'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory;

var router = (
  <Router history={hashHistory}>
    <Route path="/song" component={Song} />
    <Route path="/composer" component={Composer} />
  </Router>
);


$(document).on('ready', function () {
  ReactDOM.render(
    router, $('.react-root')[0]
  );
});
