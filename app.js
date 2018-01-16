const Boom = require('boom');
const assert = require('assert');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const meetup = require('./lib/meetup');
const events = require('./routes/events');
const members = require('./routes/members');
const debug = require('debug')('newhavenio-meetup-app:server');

let app = express();
let meetupApiKey = process.env.MEETUP_KEY;
let meetupUrlName = process.env.MEETUP_URLNAME || 'newhavenio';
assert(meetupApiKey, `MEETUP_KEY variable isn't set on environment`);

app.use(logger('dev'));

if (app.get('env') === 'development') {
  app.use(cors());
} else {
  app.use(cors({origin: /\.?newhaven.io\/?$/}));
}

app.use(meetup({
  apiKey: meetupApiKey,
  urlName: meetupUrlName
}));

app.use('/events', events);
app.use('/members', members);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(Boom.notFound('endpoint unavailable'));
});

// error handler
app.use(function(err, req, res, next) {
  Boom.boomify(err);
  debug(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.output.statusCode);
  res.json(err.output.payload);
});

module.exports = app;
