const Boom = require('boom');
const express = require('express');
const router = express.Router();
const { wrap } = require('async-middleware');
const paramGetter = require('../lib/param-getter');

function eventsParams(query) {
  let param = paramGetter(query);
  return {
    format: 'json',
    sign: param('sign', true),
    offset: param('offset', 0),
    'limited_events': param('limited_events', 'False'),
    page: param('page', 200),
    order: param('order', 'time')
  };
}

router.get('/', wrap(function(req, res) {
  let params = eventsParams(req.query);
  params.urlname = req.meetupUrlName;
  return req.meetup.getUpcomingEventsAsync(params)
    .catch(error => { throw Boom.badGateway(error); })
    .then(result => res.json(result));
}));

module.exports = router;
