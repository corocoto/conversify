const conversify = require('../index');

describe('conversify testing', function () {
	describe('strings testing', function () {
		it('should return """" when set "" as argument', () => {
			expect(conversify('')).toEqual('""');
		});

		it('should return ""random text"" when set "random text" as argument', () => {
			expect(conversify('random text')).toEqual('"random text"');
		});
	});

	describe('numbers testing', function () {
		it('should return "Infinity" when set Infinity as argument', () => {
			expect(conversify(Infinity)).toEqual('Infinity');
		});

		it('should return "Infinity" when set +Infinity as argument', () => {
			expect(conversify(+Infinity)).toEqual('Infinity');
		});

		it('should return "-Infinity" when set -Infinity as argument', () => {
			expect(conversify(-Infinity)).toEqual('-Infinity');
		});

		it('should return "NaN" when set NaN as argument', () => {
			expect(conversify(NaN)).toEqual('NaN');
		});

		it('should return "1" when set 1 as argument', () => {
			expect(conversify(1)).toEqual('1');
		});
	});

	describe('boolean testing', function () {
		it('should return "true" when set true as argument', () => {
			expect(conversify(true)).toEqual('true');
		});

		it('should return "false" when set false as argument', () => {
			expect(conversify(false)).toEqual('false');
		});
	});

	describe('functions testing', function () {
		it('should return array function when it set as argument', () => {
			const func = () => console.log('array function\'s body');
			expect(func).toEqual(func);
		});

		it('should return function when it set as argument', () => {
			const func = function () {
				return 'this is function\'s body';
			};
			expect(func).toEqual(func);
		});
	});

	describe('dates testing', function () {
		it('should return "new Date()" when set new Date() as argument', () => {
			expect(conversify(new Date())).toEqual('new Date()');
		});

		// eslint-disable-next-line max-len
		it('should return "new Date(\'1999-05-02T00:00:00.000Z\')" when set new Date(\'1999-05-02\') as argument', () => {
			expect(conversify(new Date('1999-05-02'))).toEqual('new Date(\'1999-05-02T00:00:00.000Z\')');
		});

		it('should return "new Date(\'Invalid Date\')" when set new Date(\'abcd\') as argument', () => {
			expect(conversify(new Date('abcd'))).toEqual('new Date(\'Invalid Date\')');
		});

		it('should return "Date()" when set Date() as argument', () => {
			expect(conversify(Date())).toEqual('Date()');
		});
	});

	describe('testing undefined and null', function () {
		it('should return "undefined" when set undefined as argument', () => {
			expect(conversify(undefined)).toEqual('undefined');
		});
		it('should return "null" when set null as argument', () => {
			expect(conversify(null)).toEqual('null');
		});
	});
});
