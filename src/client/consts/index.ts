export const DEFAULT_SUBREDDIT = 'wallpapers';

export const SUB_REDDITS: Array<string> = [
  'cute',
  'photography',
  'pics',
  DEFAULT_SUBREDDIT,
];

export const getApiUrl = () => {
  if (ENV === 'debug') {
    return `http://localhost:${API_PORT}/api`;
  }
  else if (ENV === 'production') {
    return 'https://floating-cliffs-54566.herokuapp.com/api';
  }
  else {
    throw new Error(`Cant resolve env ${ENV}`);
  }
}
