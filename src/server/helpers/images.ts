const MIN_IMAGE_ACCEPTABLE_WIDTH = 200;
const MAX_IMAGE_ACCEPTABLE_WIDTH = 640;

const MIN_IMAGE_ACCEPTABLE_HEIGHT = 200;
const MAX_IMAGE_ACCEPTABLE_HEIGHT = 1000;

const isWithinWidthRange = (width: number) => width >= MIN_IMAGE_ACCEPTABLE_WIDTH && width <= MAX_IMAGE_ACCEPTABLE_WIDTH;
const isWithHeightRange = (height: number) => height >= MIN_IMAGE_ACCEPTABLE_HEIGHT && height <= MAX_IMAGE_ACCEPTABLE_HEIGHT;

module.exports = {
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
  findAcceptableImageResolutionUrl: (resolutions: Array<Resolution>) => (
    resolutions.find((res) => {
      const {width, height} = res;
      return isWithinWidthRange(width) && isWithHeightRange(height);
    })
  ),
};
