const Boom = require('boom');
const express = require('express');
const router = express.Router();
const { wrap } = require('async-middleware');

router.get('/', wrap(function(req, res) {
  return req.meetup.getUpcomingEventsAsync({urlname: req.meetupUrlName})
    .catch(error => { throw Boom.badGateway(error); })
    .then(result => res.json(result));
}));

module.exports = router;
