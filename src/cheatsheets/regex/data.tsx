import type { Data } from "../commons";

export const basicsData: Data = {
	title: "Basic Syntax",
	items: [
		{ title: "Literal Characters", cmd: "abc" },
		{ title: "Character Classes", cmd: "[abc]" },
		{ title: "Negated Character Classes", cmd: "[^abc]" },
		{ title: "Dot (Any Character)", cmd: "." },
		{ title: "Anchors", cmd: "^abc$ (start and end of line)" },
		{ title: "Quantifiers", cmd: "a*" },
		{ title: "Alternation (OR)", cmd: "a|b" },
	],
};

export const characterClassesData: Data = {
	title: "Character Classes",
	items: [
		{ title: "Digits", cmd: "\\d (\\D for non-digits)" },
		{ title: "Word Characters", cmd: "\\w (\\W for non-word characters)" },
		{ title: "Whitespace", cmd: "\\s (\\S for non-whitespace)" },
		{ title: "Custom Character Range", cmd: "[0-9]" },
		{ title: "Intersection", cmd: "[a-z&&[aeiou]]" },
		{ title: "Negated Intersection", cmd: "[a-z&&[^aeiou]]" },
	],
};

export const quantifiersData: Data = {
	title: "Quantifiers",
	items: [
		{ title: "Zero or More", cmd: "a*" },
		{ title: "One or More", cmd: "a+" },
		{ title: "Zero or One", cmd: "a?" },
		{ title: "Exactly n Times", cmd: "a{3}" },
		{ title: "Range of Times", cmd: "a{3,5}" },
		{ title: "Lazy Quantifier", cmd: "a*?" },
	],
};

export const assertionsData: Data = {
	title: "Assertions",
	items: [
		{ title: "Positive Lookahead", cmd: "a(?=b)" },
		{ title: "Negative Lookahead", cmd: "a(?!b)" },
		{ title: "Positive Lookbehind", cmd: "(?<=b)a" },
		{ title: "Negative Lookbehind", cmd: "(?<!b)a" },
		{ title: "Word Boundary", cmd: "\\bword\\b" },
		{ title: "Non-Word Boundary", cmd: "\\Bword\\B" },
	],
};

export const groupsData: Data = {
	title: "Groups and Capture",
	items: [
		{ title: "Capturing Group", cmd: "(abc)" },
		{ title: "Non-Capturing Group", cmd: "(?:abc)" },
		{ title: "Named Capturing Group", cmd: "(?<name>abc)" },
		{ title: "Backreference", cmd: "\\1 (refers to first capture group)" },
		{ title: "Inline Modifier", cmd: "(?i)case-insensitive" },
		{ title: "Comment", cmd: "(?#comment)" },
	],
};
