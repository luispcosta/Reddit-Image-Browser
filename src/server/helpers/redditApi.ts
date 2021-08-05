const {default: axios} = require('axios');
const {isMissing} = require('./tools');
const {findAcceptableImageResolutionUrl} = require('./images');

type Resolution = {
  width: number,
  height: number,
};

type InnerData = {
  children: Array<any>,
  after: string,
  before: string,
};

type RedditApiData = {
  data: InnerData,
};

type RedditApiPromiseData = {
  data: RedditApiData,
};

type RedditImage = {
  title: string,
  id: string,
  author: string,
  score: number,
  fullScreenUrl: string,
};

interface RedditApiImageSource {
  url: string,
};

type RedditApiImage = {
  resolutions: Array<Resolution>,
  source: RedditApiImageSource,
};

interface RedditApiResponse {
  images: Array<RedditImage>
  before?: string
  after?: string
};


/**
 * Returns an array of images and the associated information.
 *
 * @param  {Promise} promiseData Raw promise data fetched from axios.
 * @return {Array}
 */
module.exports = {
  redditApi: axios.create({
    baseURL: 'https://www.reddit.com',
    responseType: 'json',
    timeout: 3000,
  }),
  handleResponse: (promiseData: RedditApiPromiseData): RedditApiResponse => {
    const {data} = promiseData;
    const innerData = data.data;

    if (isMissing(innerData)) {
      throw new Error('Could not fetch data from Reddit API. Please try agian later');
    }

    const {before, after} = innerData;

    const dataChildren = innerData.children;
    if (isMissing(dataChildren)) {
      throw new Error('Could not fetch data from Reddit API. Please try again later');
    }

    const result : Array<RedditImage> = [];
    dataChildren.forEach((child) => {
      const childData = child.data;
      if (!isMissing(childData)) {
        const {
          title, id, author, score, preview,
        } = childData;

        let fullScreenUrl = '';

        if (preview) {
          const previewImage = preview.images[0];
          if (previewImage) {
            fullScreenUrl = previewImage.source.url.replace(/&amp;/g, '&');

            result.push({
              title,
              id,
              author,
              score,
              fullScreenUrl,
            });
          }
        }
      }
    });


    return {
      images: result,
      before,
      after,
    };
  },
};
