[![Codecov Coverage](https://img.shields.io/codecov/c/github/ssypachev/secval/master.svg?style=flat-square)](https://codecov.io/gh/ssypachev/int-format/)

# int-format

Helper library for formatting integer numbers

```js
let str = new IntFormat("# # #").format("123");
//1 2 3
```

# Installation

```
npm install int-format
```

# Constructor

```js
IntFormat({
	format,
	padWith,
	sigil,
	anchor
})
```
or
```js
IntFormat(format)
```

# Options
`format` - the format
`padWith` - which symbol to use to pad empty placeholders, default empty string
`sigil` - symbol to substitute, default `#`
`anchor` - symbol to escape sigil, default is backslash

# Methods
`setFormat`
`setSigil`
`setAnchor`
`setPad`
`format` - takes string or number as argument

# Examples
```js
let str = new IntFormat({ padWith: '?', format: "\\## \\\\# #" }).format(12);
//#1 \\2 ?
```


























