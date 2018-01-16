# newhavenio-meetup-app

A Node.js/Express app built to proxy some meetup.com API endpoints. This is so
the API keys can stay secure behind a server instead of exposed in the client.
Try it at http://knees.herokuapp.com/.

## Local

Fork and clone the repository:

```
git clone git@github.com:newhavenio/newhavenio-meetup-app.git
```

Use `yarn` to install the latest dependencies:

```
cd newhavenio-meetup-app && yarn
```

Get your API key at https://secure.meetup.com/meetup_api/key/

Start locally and go to http://localhost:3000/ to see it in action.

```
DEBUG="newhavenio-meetup-app" MEETUP_KEY=bada55apikey00000000000000000 yarn start
```

## Heroku

We host the app on Heroku. You can, too. Just setup your [Heroku credentials
for Node.js](https://devcenter.heroku.com/articles/nodejs) and make sure you
update your `MEETUP_KEY` as a Heroku `config` variable:

```
heroku config:set MEETUP_KEY=bada55apikey00000000000000000
```
