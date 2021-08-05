const express = require('express');
const path = require('path');
const cors = require('cors');
const webpack = require('webpack');
const config = require('../../webpack.config');

const app = express();
const compiler = webpack(config);
const HTML_FILE = path.join(__dirname, '../../public/index.html');

const {redditApi, handleResponse} = require('./helpers/redditApi');

const port = process.env.PORT || 3000;

const allowedOrigins = [`localhost:${port}`, 'https://floating-cliffs-54566.herokuapp.com'];

app.use('/static', express.static(path.join(__dirname, '../..', 'public')));
app.use(cors({
  credentials: true,
  origin: (origin: string, callback: Function) => {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin)
      return callback(null, true);

    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
}));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
}));

app.get('/:subreddit?', (_req: any, res: any) => {
  res.sendFile(HTML_FILE);
});

app.get('/api/:subReddit/images', (req: any, res: any) => {
  const {subReddit} = req.params;
  const {type} = req.query;

  let apiEndpoint = `/r/${subReddit}`;

  if (type !== undefined && type !== null && type !== '') {
    apiEndpoint = `${apiEndpoint}/${type}`;
  }

  apiEndpoint = `${apiEndpoint}.json`;

  redditApi.get(apiEndpoint)
    .then((response: any) => handleResponse(response))
    .then((data: Array<any>) => res.send(data))
    .catch((err: Error) => res.status(400).send(err));
});

app.get('/api/:subReddit/prev_images/:id', (req: any, res: any) => {
  const {subReddit, id} = req.params;
  const {type} = req.query;

  let apiEndpoint = `/r/${subReddit}`;

  if (type !== undefined && type !== null && type !== '') {
    apiEndpoint = `${apiEndpoint}/${type}`;
  }

  apiEndpoint = `${apiEndpoint}.json?before=${id}&count=25&limit=50`;

  redditApi.get(apiEndpoint)
    .then((response: any) => handleResponse(response))
    .then((data: Array<any>) => res.send(data))
    .catch((err: Error) => res.status(400).send(err));
});

app.get('/api/:subReddit/next_images/:id', (req: any, res: any) => {
  const {subReddit, id} = req.params;
  const {type} = req.query;

  let apiEndpoint = `/r/${subReddit}`;

  if (type !== undefined && type !== null && type !== '') {
    apiEndpoint = `${apiEndpoint}/${type}`;
  }

  apiEndpoint = `${apiEndpoint}.json?after=${id}&count=25&limit=50`;

  redditApi.get(apiEndpoint)
    .then((response: any) => handleResponse(response))
    .then((data: Array<any>) => res.send(data))
    .catch((err: Error) => res.status(400).send(err));
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server running on port ${port}, waiting requests...`));
