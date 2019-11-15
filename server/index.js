var config = require("universal-config");
var path = require("path");
var bodyParser = require("body-parser");
var compression = require("compression");
var sslRedirect = require("heroku-ssl-redirect");
var express = require("express");
var cors = require("cors");
var Twitter = require('twitter');

var app = express();

app.use(compression());

app.use(sslRedirect());

app.use(bodyParser.json());

var whitelist = [
  "http://localhost:3000/",
  "http://localhost:3001/",
  config.get("CORS_URL")
];

var corsOptions = {
  origin: function(origin, callback) {
    // console.log(origin);
    // console.log(whitelist.indexOf(origin));
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));

app.get("/ping", function(req, res) {
  res.send("pong");
});

var client = new Twitter({
  consumer_key: config.get("TWITTER_API_KEY"),
  consumer_secret: config.get("TWITTER_API_SECRET"),
  access_token_key: config.get("TWITTER_ACCESS_TOKEN_KEY"),
  access_token_secret: config.get("TWITTER_ACCESS_TOKEN_SECRET")
});

var params = {
  q: '#iot',
  count: 100,
  result_type: 'recent',
  lang: 'en',
  truncated: false
}

app.get("/tweets", function(req, res) {
  client.get('search/tweets', params, function(error, data, response) {
    if(!error) {
      var cleanData = [];
      for (var i=0; i<data.statuses.length; i++) {
        cleanData.push({
          created_at: data.statuses[i].created_at,
          id: data.statuses[i].id,
          text: data.statuses[i].text,
          user_name: data.statuses[i].user.name,
          user_screen_name: data.statuses[i].user.screen_name,
          user_profile_image_url_https: data.statuses[i].user.profile_image_url_https
        })
      }
      res.send(cleanData)
    }
    else {
      res.status(422).send(error);
    }
  });
})

//production mode
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "..", "build"))); //
//   app.get("*", (req, res) => {
//     res.sendfile(path.join((__dirname, "..", "build/index.html")));
//   });
// } else {
//   //build mode
//   app.use(express.static(path.join(__dirname, "..", "public")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "public/index.html"));
//   });
// }

app.listen(process.env.PORT || 3001, function() {});