const express = require('express');
const path = require('path');
const cors = require('cors');
const webpack = require('webpack');
const config = require('../../webpack.config');

const app = express();
const compiler = webpack(config);
const HTML_FILE = path.join(__dirname, '../../public/index.html');

const {redditApi, handleResponse} = require('./helpers/redditApi');

app.use('/static', express.static(path.join(__dirname, '../..', 'public')));
app.use(cors({
  credentials: true,
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
app.listen(3000, () => console.log('Server running on port 3000, waiting requests...'));
