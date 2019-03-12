const chai = require('chai'),
    { IntFormat } = require('../index.js');

describe('Should test number format', () => {
	it ("Should test simple valid string", () => {
		let str = new IntFormat({format: "# # #"}).format("123");
		chai.expect(str).to.equal("1 2 3");
	});
	it ("Should test simple valid number", () => {
		let str = new IntFormat({ format: "# # #" }).format(123);
		chai.expect(str).to.equal("1 2 3");
	});
	it ("Should test string backslash", () => {
		let str = new IntFormat({ format: "\\## # #" }).format(123);
		chai.expect(str).to.equal("#1 2 3");
	});
	it ("Should test string backslash", () => {
		let str = new IntFormat({ format: "\\## \\\\# #" }).format(123);
		chai.expect(str).to.equal("#1 \\2 3");
	});
	it ("Should test padding", () => {
		let str = new IntFormat({ format: "\\## \\\\# #" }).format(12);
		chai.expect(str).to.equal("#1 \\2 ");
	});
	it ("Should test padding with ?", () => {
		let str = new IntFormat({ padWith: '?', format: "\\## \\\\# #" }).format(12);
		chai.expect(str).to.equal("#1 \\2 ?");
	});
	it ("Should test backslashes", () => {
		let str = new IntFormat({ format: "\\\\ \\\\# #", padWith: '?' }).format(12);
		chai.expect(str).to.equal("\\ \\1 2");
	});
	it ("Should test backslashes", () => {
		let str = new IntFormat({ format: "\\\\ \\\\\\# #", padWith: '?' }).format(12);
		chai.expect(str).to.equal("\\ \\# 1");
	});
	it ("Should test abnormal end", () => {
		let str = new IntFormat({ format: "#####\\" }).format("12345");
		chai.expect(str).to.equal("12345\\");
	});
	it ("Should test no arguments", () => {
		let str = new IntFormat({format: "asdfghj"}).format("12345");
		chai.expect(str).to.equal("asdfghj");
	});
	it ("Should test backslashes", () => {
		let str = new IntFormat({ format: "# (###)\\ #" }).format("12345");
		chai.expect(str).to.equal("1 (234)\ 5");
	});
	it ("Should test with ! as anchor", () => {
		let str = new IntFormat({ format: "!q!q!q!q!", sigil: '!' }).format("12345");
		chai.expect(str).to.equal("1q2q3q4q5");
	});
	it ("Should test with ! as anchor", () => {
		let str = new IntFormat({ format: "!######!!", anchor: '!' }).format("12345");
		chai.expect(str).to.equal("#12345!");
	});
	it ("Should test padd", () => {
		let str = new IntFormat({ format: "######-#####" }).format("12345");
		chai.expect(str).to.equal("12345-");
	});
	it ("Should test setFormat", () => {
		let str = new IntFormat({ format: "" }).setFormat("######-#####").format("12345");
		chai.expect(str).to.equal("12345-");
	});
	it ("Should test setFormat", () => {
		let str = new IntFormat().setFormat("######-#####").format("12345");
		chai.expect(str).to.equal("12345-");
	});
	it ("Should test string constructor argument", () => {
		let str = new IntFormat("######-#####").format("12345");
		chai.expect(str).to.equal("12345-");
	});
	it ("Should throw error on undefined format", () => {
		let wasErr = false;
		try {
			let str = new IntFormat().format("12345");
		} catch (err) {
			wasErr = true;
		}
		chai.expect(wasErr).to.be.true;
	});
	it ("Should test setPad", () => {
		let str = new IntFormat({ format: "\\## \\\\# #" }).setPad('?').format(12);
		chai.expect(str).to.equal("#1 \\2 ?");
	});
	it ("Should test setSigil", () => {
		let str = new IntFormat({ format: "!q!q!q!q!" }).setSigil('!').format("12345");
		chai.expect(str).to.equal("1q2q3q4q5");
	});
	it ("Should test setAnchor", () => {
		let str = new IntFormat({ format: "!######!!" }).setAnchor('!').format("12345");
		chai.expect(str).to.equal("#12345!");
	});
});



















