/**
 * Checks if the object is null or undefined.
 *
 * @param  {Object}  object
 * @return {Boolean}
 */
module.exports = {
  isMissing: (object: any) => object === null || object === undefined,
};
