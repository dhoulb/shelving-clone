// Keep track of the stack for infinite loop protection.
const stack = [];

/**
 * Detect JSON-friendly values (deeply).
 * Has to be a separate function as it recurses into itself and has infinite loop detection.
 *
 * @param {mixed} value Value that possibly is JSON-friendly.
 * @return {boolean} True if the value is JSON friendly, false otherwise.
 */
function cloneable(value) {
	if (value === undefined) {
		return false; // Undefined not allowed in JSON.
	} else if (value === null) {
		return true;
	} else if (typeof value === "boolean") {
		return true;
	} else if (typeof value === "string") {
		return true;
	} else if (typeof value === "number") {
		return Number.isFinite(value);
	} else if (value instanceof Array) {
		// Stop if not plain Array.
		if (value.constructor !== Array) return false;

		// Stop if circular reference.
		if (stack.indexOf(value) !== -1) return false;

		// Keep track of circular references.
		stack.push(value);

		// Check each item individually.
		for (let i = 0; i < value.length; i++) if (!cloneable(value[i])) return false;

		// Keep track of circular references.
		stack.pop();

		// Everything was fine.
		return true;
	} else if (value instanceof Object) {
		// Only plain Objects.
		if (value.constructor !== Object) return false;

		// Stop if circular reference.
		if (stack.indexOf(value) !== -1) return false;

		// Keep track of circular references.
		stack.push(value);

		// Check each property individually.
		for (const i in value) if (!cloneable(value[i])) return false;

		// Keep track of circular references.
		stack.pop();

		// Everything was fine.
		return true;
	} else {
		// Any other types.
		return false;
	}
}

// Exports.
module.exports = cloneable;
