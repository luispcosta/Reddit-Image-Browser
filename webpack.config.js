const path = require('path');
const webpack = require('webpack');

const resolveApiUrl = () => {
  const port = process.env.PORT || 3000;

  if (process.env.NODE_ENV === 'debug') {
    return `http://localhost:${port}/api`;
  }

  if (process.env.NODE_ENV === 'production') {
    return 'https://floating-cliffs-54566.herokuapp.com/api';
  }

  throw new Error(`Cant resolve env ${process.env.NODE_ENV}`);
};

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', `${path.resolve(__dirname, 'src/client')}/index.tsx`],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(resolveApiUrl()),
    }),
  ],
};
