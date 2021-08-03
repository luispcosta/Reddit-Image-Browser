const {default: axios} = require('axios');
const {isMissing} = require('./tools');
const {findAcceptableImageResolutionUrl} = require('./images');

type Resolution = {
  width: number,
  height: number,
};

type InnerData = {
  children: Array<any>,
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
  url: string,
  fullScreenUrl: string,
};

interface RedditApiImageSource {
  url: string,
};

type RedditApiImage = {
  resolutions: Array<Resolution>,
  source: RedditApiImageSource,
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
  handleResponse: (promiseData: RedditApiPromiseData): Array<RedditImage> => {
    const {data} = promiseData;
    const innerData = data.data;

    if (isMissing(innerData)) {
      throw new Error('Could not fetch data from Reddit API. Please try agian later');
    }

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

        const object = {
          title,
          id,
          author,
          score,
          fullScreenUrl: "",
          url: "",
        };

        if (!isMissing(preview)) {
          const {images} = preview;

          if (!isMissing(images)) {
            images.forEach((img: RedditApiImage) => {
              if (!isMissing(img.resolutions)) {
                const filteredResolutionUrl = findAcceptableImageResolutionUrl(img.resolutions);
                if (!isMissing(filteredResolutionUrl)) {
                  const cleanUrl = filteredResolutionUrl.url.replace(/&amp;/g, '&');
                  object.url = decodeURI(cleanUrl);
                  if (!isMissing(object.url)) {
                    // Ignore any submissions that has no preview available.

                    // Use the selected url as full screen image by default
                    let fullScreenUrl = object.url;
                    if (img.source) {
                      fullScreenUrl = img.source.url;
                    }
                    object.fullScreenUrl = fullScreenUrl;
                    result.push(object);
                  }
                }
              }
            });
          }
        }
      }
    });

    return result;
  },
};
