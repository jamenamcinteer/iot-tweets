Demo: [https://iot-tweets.herokuapp.com/](https://iot-tweets.herokuapp.com/)

This project is a React app built with [Create React App](https://github.com/facebook/create-react-app) and a Node.js/Express server.

The Node.js/Express server gets 100 recent tweets with the hashtag #IoT using the Twitter Search API and makes them available to the React app at an API endpoint `/tweets`. The React app displays the 100 recent tweets along with a data visualization of the top twenty words used in those tweets.

## Setting Up a Local Copy

1. Clone the repo

```
git clone git@github.com:jamenamcinteer/iot-tweets.git
cd iot-tweets
```

2. Run `yarn` in the root `iot-tweets` folder

3. Create a file `dev.js` in the `config` folder with your Twitter API variables. It should be in the following format, where `[variable]` is your Twitter API variable:

```
module.exports = {
  TWITTER_API_KEY: [twitter api key],
  TWITTER_API_SECRET: [twitter api secret],
  TWITTER_ACCESS_TOKEN_KEY: [twitter access token key],
  TWITTER_ACCESS_TOKEN_SECRET: [twitter access token secret],
  CORS_URL: "http://localhost:3001/"
};
```

4. Run `yarn dev` to run the app in development mode. The React app will be at `http://localhost:3000` and the Node server will be at `http://localhost:3001`


## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view the React app in the browser and [http://localhost:3001/tweets](http://localhost:3001/tweets) to view the Node server endpoint for accessing tweets.

### `yarn test`

Launches the Jest test runner in watch mode.

### `yarn coverage`

Runs the Jest test runner once (not in watch mode) and displays a table with the project test coverage.

### `yarn client-build`

Builds the React app for production to the `build` folder.

`yarn heroku-postbuild` uses this script. Heroku uses `yarn heroku-postbuild` to build the React app during deployment. It then uses `yarn start` to start the server after the React build is complete.