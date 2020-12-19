# [conversify](https://www.npmjs.com/package/conversify)

![NPM bundle size](https://img.shields.io/bundlephobia/min/conversify?style=flat-square)
![NPM bundle size (minzip)](https://img.shields.io/bundlephobia/minzip/conversify?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/corocoto/conversify?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/corocoto/conversify?style=flat-square)
![npm downloads](https://img.shields.io/npm/dt/conversify?style=flat-square)
![License](https://img.shields.io/npm/l/conversify?style=flat-square)

## Description

<img src="https://user-images.githubusercontent.com/37180024/89704181-64d22880-d95a-11ea-9593-42a2381f0e82.png" width="120" align="right">

**converisy** is a package that represents an advanced implementation of `JSON.stringify` method.

It allows you to correctly convert JSON unsupported values to string. 

Such as `Date` value, `+/-Infinity`, `undefined`, `NaN` and function realization in `Array` or `Object`.

## Installation

```
npm install conversify
```

## Example of using

```js
const conversify = require('conversify');

const stringifiedObj = conversify({
    name: 'Ivan', 
    surname: 'Ivanov',
    fullname() {
        return `${this.name} ${this.surname}`                            
    },
    birthday: new Date('1999-05-02')
}, 4); //Second argument is optional. It used to insert white space into the output JSON string for readability purposes.
console.log(stringifiedObj);

/* 
 * Output:
 * {
 *     "name": "Ivan",
 *     "surname": "Ivanov",
 *     "fullname": function () {
 *                 return `${this.name} ${this.surname}`;
 *         },
 *     "birthday": new Date('1999-05-02T00:00:00.000Z')
 *  }
 */
```

## Comparison

Array that will be used for comparison two methods (`JSON.strinigfy` and `conversify`):

```js
const testArr = [
	NaN,
	undefined,
	null,
	new Date(),
	Date(),
	new Date('2020-02-01'),
	new Date('abcd'),
	'some text',
	3.14,
	15845,
	-Infinity,
	Infinity,
	() => console.log(`It's function body`),
	{
		name: 'Ivan',
		surname: 'Ivanov',
		fullname () {
			return `${this.name} ${this.surname}`;
		},
		birthday: new Date('1999-05-02'),
	},
];
```

**Result**:

| `JSON.stringify` | `conversify` |  
|------------------|--------------|
| <img alt="convert array using JSON.stringify" src="https://user-images.githubusercontent.com/37180024/89712958-e9459b00-d99c-11ea-8cca-ed41bb7b2d77.png"> | <img alt="convert array using conversify package" src="https://user-images.githubusercontent.com/37180024/89712954-e64aaa80-d99c-11ea-8ddc-55553c625c86.png"> |

## License 

**conversify** package is open-sourced software licensed under the MIT License (MIT). Please see [License File](LICENSE) for more information.

## Changelog 

Detailed changes for each release are documented in the [release notes](CHANGELOG.md).

## Contributing

I'm thanks all the people, that who contributed or who want to contribute to **conversify**.

If you want to contribute, make sure to read the [Contributing Guide](CONTRIBUTING.md) before making a pull request, thanks.

## Conclusion

If you still have questions about the work of this package :grey_question: or you have cool ideas for improvement :boom:, please write to me :email:.

If you find a bug :bug:, please create an appropriate issue with detailed information about it :speech_balloon:.

Thanks!
