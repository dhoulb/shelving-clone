const clone = require("../lib/clone");
const CloneError = require("../lib/CloneError");

describe("clone()", () => {
	test("Primatives can be cloned", () => {
		expect(clone(true)).toEqual(true);
		expect(clone(false)).toEqual(false);
		expect(clone(null)).toEqual(null);
		expect(clone(123)).toEqual(123);
		expect(clone(-123)).toEqual(-123);
		expect(clone(1.5)).toEqual(1.5);
		expect(clone(-1.5)).toEqual(-1.5);
		expect(clone("")).toEqual("");
		expect(clone("a")).toEqual("a");
		expect(clone("abc")).toEqual("abc");
	});
	test("Plain arrays can be cloned", () => {
		const arr = [1, 2, 3];
		expect(clone(arr)).toEqual(arr);
		expect(clone(arr)).not.toBe(arr);
	});
	test("Plain objects can be cloned", () => {
		const obj = { a: 1, b: 2, c: 3 };
		expect(clone(obj)).toEqual(obj);
		expect(clone(obj)).not.toBe(obj);
	});
	test("Deep plain arrays can be cloned", () => {
		const arr = [[1, 2, 3]];
		const arrClone = clone(arr);
		expect(arrClone[0]).toEqual(arr[0]);
		expect(arrClone[0]).not.toBe(arr[0]);
	});
	test("Deep plain objects can be cloned", () => {
		const obj = { deep: { a: 1, b: 2, c: 3 } };
		const objClone = clone(obj);
		expect(objClone.deep).toEqual(obj.deep);
		expect(objClone.deep).not.toBe(obj.deep);
	});
	test("Undefined cannot be cloned", () => {
		expect(() => clone(undefined)).toThrow(CloneError);
	});
	test("Symbols cannot be cloned", () => {
		expect(() => clone(Symbol("abc"))).toThrow(CloneError);
	});
	test("Infinite numbers cannot be cloned", () => {
		expect(() => clone(Infinity)).toThrow(CloneError);
		expect(() => clone(-Infinity)).toThrow(CloneError);
		expect(() => clone(NaN)).toThrow(CloneError);
	});
	test("Non-JSON values cannot be cloned", () => {
		expect(() => clone(new class Something {}())).toThrow(CloneError);
		expect(() => clone(new class Megarray extends Array {}())).toThrow(CloneError);
		expect(() => clone(new String("abc"))).toThrow(CloneError);
		expect(() => clone(new Date())).toThrow(CloneError);
		expect(() => clone(() => {})).toThrow(CloneError);
	});
	test("Deep infinite numbers cannot be cloned", () => {
		expect(() => clone({ nonfinite: Infinity })).toThrow(CloneError);
		expect(() => clone({ nonfinite: -Infinity })).toThrow(CloneError);
		expect(() => clone({ nonfinite: NaN })).toThrow(CloneError);
	});
	test("Deep complex objects cannot be cloned", () => {
		expect(() => clone({ complex: new class Something {}() })).toThrow(CloneError);
		expect(() => clone({ arr: new class Megarray extends Array {}() })).toThrow(CloneError);
		expect(() => clone({ str: new String("abc") })).toThrow(CloneError);
		expect(() => clone({ date: new Date() })).toThrow(CloneError);
		expect(() => clone({ func: () => {} })).toThrow(CloneError);
	});
	test("Circular references in objects cannot be cloned", () => {
		const obj = {};
		obj.circular = obj;
		expect(() => clone(obj)).toThrow(CloneError);
	});
	test("Circular references in arrays cannot be cloned", () => {
		const arr = [];
		arr.push(arr);
		expect(() => clone(arr)).toThrow(CloneError);
	});
});
