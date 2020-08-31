#!/usr/bin/env node

/**
 * @version v1.0.1
 * @author Artem Gusev <gusev2014russia@mail.ru> (corocoto)
 * @copyright 2020 - present Artem Gusev. All Rights Reserved.
 * @licence MIT License
 *
 * Copyright (c) 2020 - present Artem Gusev
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

/**
 * Replacer for `JSON.stringify` method.
 * Used to change entries values (if it needs).
 *
 * >[Detailed information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) about it.
 * @param {string} name - name of property (if we're work with object)
 * @param {*} value - item value
 * @return {string|string} original or converted value
 */
function replacer (name, value) {
	if (value && value.constructor === Function) {
		/* Check is it method */
		value = name ? `"${value}"`.replace(name, 'function') : `"${value}"`;
	} else if (value && value.constructor === String) {
		if (isValidDateFormat(value)) {
			/* Checking is date contains current date and time. And if it is - return "new Date" */
			value = new Date().getTime() - new Date(value).getTime() <= 1000
				? '"new Date()"'
				: `"new Date('${value}')"`;
		} else if (isInvalidDateFormat(value)) {
			value = '"new Date(\'Invalid Date\')"';
		} else if (isStrDate(value)) {
			value = '"Date()"';
		}
	} else if (Number.isNaN(value) || value === Infinity || value === -Infinity || value === undefined) {
		value = `"${value}"`;
	}
	return value;
}


/**
 * Helper who determines whether the date format is valid or not.
 * @param {string} value - expected date format
 * @return {boolean} whether the parameter contains the valid date format or not
 */
function isValidDateFormat (value) {
	return /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})((\+(\d{2}):(\d{2}))|Z)?$/.test(value);
}

/**
 * Helper who determines whether the date format is invalid.
 * @param {string} value - expected date format
 * @return {boolean} whether the parameter contains the invalid date format
 */
function isInvalidDateFormat (value) {
	return value === 'NaN-NaN-NaNTNaN:NaN:NaN.NaN-NaN:NaN';
}

/**
 * Helper who determines whether the date object is invalid or not.
 * @param {*} value - expected date value
 * @return {boolean} whether the parameter contains the invalid date or not
 */
function isInvalidDateObj (value) {
	return value && value.constructor === Date && Number.isNaN(value.getTime());
}

/**
 * Helper who determines whether parameter value doesn't `Date` instance, but created by `Date()` syntax.
 * @param {string} value - expected string value of date
 * @return {boolean} whether the parameter value created by `Date()` syntax or not
 */
function isStrDate (value) {
	return /^([A-Z][a-z]{2})\s([A-Z][a-z]{2})\s(\d{2})\s(\d{4})\s(\d{2}):(\d{2}):(\d{2})\sGMT/.test(value);
}

/**
 * Finds invalid Date object and set it necessary template.
 * @param {*} value - value that will be checked
 * @return {*} new/old result
 */
function setTemplateForInvalidDate (value) {
	if (value && value.constructor === Array) {
		value = value.map(item => setTemplateForInvalidDate(item));
	} else if (value && value.constructor === Object) {
		for (const key in value) {
			value[key] = setTemplateForInvalidDate(value[key]);
		}
	} else if (isInvalidDateObj(value)) {
		value = 'NaN-NaN-NaNTNaN:NaN:NaN.NaN-NaN:NaN';
	}
	return value;
}

/**
 * Main function that runs all necessary processes and forming output value.
 * @param {*} value - input value
 * @param {number|string|undefined} space - a `String` or `Number` object that's used to insert white space into the output JSON string for readability purposes.
 * @return {string} result.
 */
module.exports = (value, space) => {
	/*
	 * Determines whether `value` contains an `Invalid Date {}`.
	 * Because inside of `replacer` function we get this value as `null`.
	 */
	value = setTemplateForInvalidDate(value);

	return JSON.stringify(value, replacer, space)
		.replace(/\"\\"|\\"\"/g, '')
		.replace(/\\r/g, '\r')
		.replace(/\\n/g, '\n')
		.replace(/\\t/g, '\t');
};