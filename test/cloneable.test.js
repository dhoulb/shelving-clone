const cloneable = require("../lib/cloneable");

describe("cloneable()", () => {
	test("Primatives can be cloned", () => {
		expect(cloneable(true)).toBe(true);
		expect(cloneable(false)).toBe(true);
		expect(cloneable(null)).toBe(true);
		expect(cloneable(123)).toBe(true);
		expect(cloneable(-123)).toBe(true);
		expect(cloneable(1.5)).toBe(true);
		expect(cloneable(-1.5)).toBe(true);
		expect(cloneable("")).toBe(true);
		expect(cloneable("a")).toBe(true);
		expect(cloneable("abc")).toBe(true);
	});
	test("Plain arrays can be cloned", () => {
		const arr = [1, 2, 3];
		expect(cloneable(arr)).toBe(true);
	});
	test("Plain objects can be cloned", () => {
		const obj = { a: 1, b: 2, c: 3 };
		expect(cloneable(obj)).toBe(true);
	});
	test("Deep plain arrays can be cloned", () => {
		const arr = [[1, 2, 3]];
		expect(cloneable(arr)).toEqual(true);
	});
	test("Deep plain objects can be cloned", () => {
		const obj = { deep: { a: 1, b: 2, c: 3 } };
		expect(cloneable(obj)).toEqual(true);
	});
	test("Undefined cannot be cloned", () => {
		expect(cloneable(undefined)).toBe(false);
	});
	test("Symbols cannot be cloned", () => {
		expect(cloneable(Symbol("abc"))).toBe(false);
	});
	test("Infinite numbers cannot be cloned", () => {
		expect(cloneable(Infinity)).toBe(false);
		expect(cloneable(-Infinity)).toBe(false);
		expect(cloneable(NaN)).toBe(false);
	});
	test("Complex objects cannot be cloned", () => {
		expect(cloneable({ complex: new class Something {}() })).toBe(false);
		expect(cloneable({ arr: new class Megarray extends Array {}() })).toBe(false);
		expect(cloneable({ str: new String("abc") })).toBe(false);
		expect(cloneable({ date: new Date() })).toBe(false);
		expect(cloneable({ func: () => {} })).toBe(false);
	});
	test("Circular references in objects cannot be cloned", () => {
		const obj = {};
		obj.circular = obj;
		expect(cloneable(obj)).toBe(false);
	});
	test("Circular references in arrays cannot be cloned", () => {
		const arr = [];
		arr.push(arr);
		expect(cloneable(arr)).toBe(false);
	});
});
