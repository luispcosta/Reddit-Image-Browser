/**
 * Checks if the object is null or undefined.
 *
 * @param  {Object}  object
 * @return {Boolean}
 */
module.exports = {
  isMissing: (object) => object === null || object === undefined,
};
