const cloneable = require("./cloneable");
const CloneError = require("./CloneError");

/**
 * Deep clone a value.
 * Checks the value first with cloneable() then tries to clone it.
 *
 * @param {mixed} value Value to be cloned.
 * @return {mixed} Clone of the value.
 */
function clone(value) {
	// Check.
	if (!cloneable(value)) throw new CloneError();

	// Use the actual clone function.
	return cloneActual(value);
}

// The actual cloning function.
// Unsafe: Doesn't deep check the value with cloneable()
function cloneActual(value) {
	// Switch.
	if (value instanceof Array) {
		return value.map(cloneActual);
	} else if (value instanceof Object) {
		const cloned = {};
		for (const i in value) cloned[i] = cloneActual(value[i]);
		return cloned;
	} else return value; // No need to clone primatives.
}

// Exports.
module.exports = clone;
