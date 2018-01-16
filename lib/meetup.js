const Promise = require('bluebird');
const meetup = require('meetup-api');

module.exports = function({ apiKey, urlName }) {
  return function(req, res, next) {
    req.meetupApiKey = apiKey;
    req.meetupUrlName = urlName;
    req.meetup = Promise.promisifyAll(meetup({key: apiKey}));
    next();
  };
};
