/**
 * Checks if the object is null or undefined.
 *
 * @param  {Object} any object
 * @return {Boolean}
 */
module.exports = {
  isMissing: (object: any) => object === null || object === undefined,
};
