import axios from 'axios';

const PromiseException = (message) => {
  this.message = message;
  this.name = 'Promise Exception';
};


/**
 * Creates the reddit's API endpoints based on the options received.
 *
 * @param  {Object} [options={}] Check the docs for each
 * fetch_* method for information.
 * @return {String} An endpoint URL.
 */
const redditApiEndpointUrl = (options = {}) => {
  let url = 'https://www.reddit.com/r/{NAME}';
  const {sort, order} = options;

  if (sort) {
    url += `/${order}/.json?sort=${order}&t=${sort}&limit=100&raw_json=1/`;
    return url;
  }

  if (order) {
    url += `/${order}/.json?raw_json=1&limit=100`;
    return url;
  }

  url += '.json?raw_json=1&limit=100';
  return url;
};

/**
 * Checks if the object is null.
 *
 * @param  {Object}  object
 * @return {Boolean}
 */
const isNull = (object) => object === null || object === undefined;

const MIN_IMAGE_ACCEPTABLE_WIDTH = 200;
const MAX_IMAGE_ACCEPTABLE_WIDTH = 640;

const MIN_IMAGE_ACCEPTABLE_HEIGHT = 200;
const MAX_IMAGE_ACCEPTABLE_HEIGHT = 1000;

const isWithinWidthRange = (width) => width >= MIN_IMAGE_ACCEPTABLE_WIDTH && width <= MAX_IMAGE_ACCEPTABLE_WIDTH;
const isWithHeightRange = (height) => height >= MIN_IMAGE_ACCEPTABLE_HEIGHT && height <= MAX_IMAGE_ACCEPTABLE_HEIGHT;

/**
 * Tries to find an acceptable resolution URL from an image.
 *
 * @param  {Object} resolutions
 *  This accepts objects with the format:
 *  {
 *    url: string,
 *    width: number,
 *    height: number
 *  }
 *
 * @return {Object} An object with the width and height appropriate for the app.
 * Check the constants at the end of this file for more information.
 */
export const findAcceptableImageResolutionUrl = (resolutions) => (
  resolutions.find((res) => {
    const {width, height} = res;
    return isWithinWidthRange(width) && isWithHeightRange(height);
  })
);

/**
 * Returns an array of images and the associated information.
 *
 * @param  {Promise} promiseData Raw promise data fetched from axios.
 * @return {Array}
 */
export const fetchImageData = (promiseData) => {
  const {data} = promiseData;
  const innerData = data.data;

  if (isNull(innerData)) {
    throw new PromiseException('Promise has no data!');
  }

  const dataChildren = innerData.children;
  if (isNull(dataChildren)) {
    throw new PromiseException('Promise has no data children!');
  }

  const imageData = [];
  dataChildren.forEach((child) => {
    const childData = child.data;

    if (!isNull(childData)) {
      const {
        title, id, author, score, preview,
      } = childData;

      const object = {
        title,
        id,
        author,
        score,
        url: null,
        fullScreenUrl: null,
      };

      if (!isNull(preview)) {
        const {images} = preview;

        if (!isNull(images)) {
          images.forEach((img) => {
            if (!isNull(img.resolutions)) {
              const filteredResolutionUrl = findAcceptableImageResolutionUrl(img.resolutions);
              if (!isNull(filteredResolutionUrl)) {
                const cleanUrl = filteredResolutionUrl.url.replace(/&amp;/g, '&');
                object.url = decodeURI(cleanUrl);
                if (!isNull(object.url)) {
                  // Ignore any submissions that has no preview available.

                  // Use the selected url as full screen image by default
                  let fullScreenUrl = object.url;
                  if (img.source) {
                    fullScreenUrl = img.source.url;
                  }
                  object.fullScreenUrl = fullScreenUrl;
                  imageData.push(object);
                }
              }
            }
          });
        }
      }
    }
  });

  return imageData;
};

/**
 * Creates the URL request, by replacing the subreddit name in the
 * URL template.
 *
 * @param  {String} name The subreddit name
 * @param  {Object} [options={}] A list of options. Check the docs for each
 * fetch_* method for information.
 * @return {String} A reddit API endpoint URL
 */
export const replaceSubredditName = (subredditName, options = {}) => (
  redditApiEndpointUrl(options).replace('{NAME}', subredditName)
);

/**
 * The default subreddit to fetch images from.
 * @type {String}
 */
export const DEFAULT_SUBREDDIT = 'earthporn';

export const SORT_OPTIONS = [
  {
    label: 'All Time',
    link: 'all',
  },
  {
    label: 'Last year',
    link: 'year',
  },
  {
    label: 'Last month',
    link: 'month',
  },
  {
    label: 'Last week',
    link: 'week',
  },
  {
    label: 'Last day',
    link: 'day',
  },
  {
    label: 'Last hour',
    link: 'hour',
  },
];

/**
 * Fetches the hot images from a subreddit.
 *
 * @param  {String}  [subreddit=DEFAULT_SUBREDDIT]
 * The subreddit to fetch images from.
 * @return {Promise}
 */
export async function fetchImages(subreddit = DEFAULT_SUBREDDIT) {
  try {
    const url = replaceSubredditName(subreddit);
    const result = await axios.get(url);
    return fetchImageData(result);
  } catch (error) {
    return `An error occurred trying to fetch images from ${subreddit}. Error: ${error}`;
  }
}

/**
 * Fetches new images from a subreddit
 *
 * @param  {String}  [subreddit=DEFAULT_SUBREDDIT]
 * The subreddit to fetch images from.
 * @return {Promise}
 */
export async function fetchNewImages(subreddit = DEFAULT_SUBREDDIT) {
  try {
    const url = replaceSubredditName(subreddit, {order: 'new'});
    const result = await axios.get(url);
    return fetchImageData(result);
  } catch (error) {
    return `An error occurred trying to fetch new images from ${subreddit}. Error: ${error}`;
  }
}

/**
 * Fetches the rising images from a subreddit
 *
 * @param  {String}  [subreddit=DEFAULT_SUBREDDIT]
 * The subreddit to fetch images from.
 * @return {Promise}
 */
export async function fetchRisingImages(subreddit = DEFAULT_SUBREDDIT) {
  try {
    const url = replaceSubredditName(subreddit, {order: 'rising'});
    const result = await axios.get(url);
    return fetchImageData(result);
  } catch (error) {
    return `An error occurred trying to fetch rising images from ${subreddit}. Error: ${error}`;
  }
}

/**
 * Fetches the hot images from a subreddit
 *
 * @param  {String}  [subreddit=DEFAULT_SUBREDDIT]
 * The subreddit to fetch images from.
 * @return {Promise}
 */
export async function fetchHotImages(subreddit = DEFAULT_SUBREDDIT) {
  try {
    const url = replaceSubredditName(subreddit, {order: 'hot'});
    const result = await axios.get(url);
    return fetchImageData(result);
  } catch (error) {
    return `An error occurred trying to fetch rising images from ${subreddit}. Error: ${error}`;
  }
}

/**
 * Fetches the top images from a subreddit.
 *
 * @param  {String}  [subreddit=DEFAULT_SUBREDDIT]
 * The subreddit to fetch images from.
 * @param  {String}  [sort=null]
 *         The sorting option. See the object SORT_OPTIONS at the top
 *         of this file for information
 * @return {Promise}
 */
export async function fetchTopImages(subreddit = DEFAULT_SUBREDDIT, sort = null) {
  try {
    const url = replaceSubredditName(subreddit, {order: 'top', sort});
    const result = await axios.get(url);
    return fetchImageData(result);
  } catch (error) {
    return `An error occurred trying to fetch top images from ${subreddit}. Error: ${error}`;
  }
}

/**
 * Fetches the controversial images from the specified subreddit.
 *
 * @param  {String}  [subreddit=DEFAULT_SUBREDDIT]
 * The subreddit to fetch images from.
 * @param  {String}  [sort=null]
 *         The sorting option. See the object SORT_OPTIONS at the top
 *         of this file for information
 * @return {Promise}
 */
export async function fetchControversialImages(subreddit = DEFAULT_SUBREDDIT, sort = null) {
  try {
    const url = replaceSubredditName(subreddit, {order: 'controversial', sort});
    const result = await axios.get(url);
    return fetchImageData(result);
  } catch (error) {
    return `An error occurred trying to fetch top images from ${subreddit}. Error: ${error}`;
  }
}
