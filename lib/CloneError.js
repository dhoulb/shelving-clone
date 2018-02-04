/**
 * CloneError
 * Something went wrong while cloning a value (usually attempting to clone a complex value).
 */
class CloneError extends TypeError {}
CloneError.prototype.name = "CloneError";
CloneError.prototype.message = "Value must be JSON-friendly, e.g. null, boolean, finite number, string, plain object, plain array";

// Export.
module.exports = CloneError;
