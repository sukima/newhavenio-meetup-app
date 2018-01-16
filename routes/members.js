const Boom = require('boom');
const express = require('express');
const router = express.Router();
const { wrap } = require('async-middleware');
const paramGetter = require('../lib/param-getter');

function membersParams(query) {
  let param = paramGetter(query);
  return {
    sign: param('sign', true),
    offset: param('offset', 0),
    'photo-host': param('photo-host', 'public'),
    page: param('page', 40),
    order: param('order', 'name')
  };
}

router.get('/', wrap(function(req, res) {
  let params = membersParams(req.query);
  params['group_urlname'] = req.meetupUrlName;
  return req.meetup.getMembersAsync(params)
    .catch(error => { throw Boom.badGateway(error); })
    .then(result => res.json(result));
}));

module.exports = router;

