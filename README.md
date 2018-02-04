# Shelving: Clone

[![Build Status](https://travis-ci.org/dhoulb/shelving-clone.svg?branch=master)](https://travis-ci.org/dhoulb/shelving-clone)

A simple deep-cloning algorithm. This function only works with JSON-friendly values:

- `null`
- Finite numbers (e.g. `123` or `45.158`)
- Strings (e.g. `'abc'`)
- Booleans (e.g. `true` and `false`)
- Plain arrays (e.g. arrays whose constructor is `Array`)
- Plain objects (e.g. objects whose constructor is `Object`)

The function will throw a `CloneError` for values that cannot be represented in JSON, such as:

- `undefined`
- Infinite numbers (e.g. `Infinity`, `-Infinity` and `NaN`)
- `Date` objects
- Complex objects

## Example: Cloning an object

```js
import clone from 'shelving-clone';

// Original value.
const original = {
	str: 'abc',
	obj: {
		str: 'abc',
	},
	arr: [1, 2, 3],
};

// Clone it.
const cloned = clone(original);

// Result: Objects are deep-cloned.
original === cloned; // False.
original.obj === cloned.obj; // False.
original.arr === cloned.arr; // False.

// Result: Properties are the same.
original.str === cloned.str; // True.
original.obj.str === cloned.obj.str; // True.
original.arr.length === cloned.arr.length; // True.
```

## Example: Cloning a primative value

Primative values are not copied by reference in Javascript (so don't need to be cloned). As you'd expect values pass through `clone()` transparently:

```js
123 === clone(123); // True.
true === clone(true); // True.
'abc' === clone('abc'); // True.
```

## Example: Attempting to clone complex value

`clone()` will throw a `CloneError` if it cannot clone the specified value:

```js
import clone from 'shelving-clone';

// Attempt to clone.
clone(class Dog {}()); // Throws CloneError("Value must be JSON-friendly...").
```

## Example: Testing whether value is cloneable

As `clone()` only works on JSON-friendly values, the `cloneable()` function can be used to test whether a value can be cloned _before_ passing it into `clone()` and throwing an error:

```js
import { cloneable } from 'shelving-clone';

// Cloneable values.
cloneable(123); // Returns true.
cloneable('abc'); // Returns true.
cloneable({ prop: 'abc' }); // Returns true.
cloneable([1, 2, 3]); // Returns true.

// Non-cloneable values.
cloneable(new Date); // Returns false.
cloneable(Infinity); // Returns false.
cloneable(NaN); // Returns false.
cloneable(new class Dog {}()); // Returns false.
cloneable(new class OtherArray extends Array {}()); // Returns false.
```