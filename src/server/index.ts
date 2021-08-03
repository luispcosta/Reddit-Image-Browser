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

app.get('/', (_req: any, res: any) => {
  res.sendFile(HTML_FILE);
});

app.get('/api/:subReddit/images', (req: any, res: any) => {
  const {subReddit} = req.params;
  const {order, sort} = req.query;

  redditApi.get(`/r/${subReddit}.json?sort=${sort}&order=${order}`)
    .then((response: any) => handleResponse(response))
    .then((data: Array<any>) => res.send(data))
    .catch((err: Error) => res.status(400).send(err));
});

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Server running on port 3000, waiting requests...'));