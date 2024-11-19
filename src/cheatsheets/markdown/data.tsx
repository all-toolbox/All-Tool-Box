import type { Data } from "../commons";

export const basicFormattingData: Data = {
	title: "Basic Formatting",
	items: [
		{
			title: "Headers",
			cmd: "# H1\n## H2\n### H3",
		},
		{
			title: "Emphasis",
			cmd: "*italic*, **bold**",
		},
		{
			title: "Lists",
			cmd: "Unordered:\n- Item 1\n- Item 2\n\nOrdered:\n1. Item 1\n2. Item 2",
		},
		{
			title: "Links",
			cmd: "[Link text](https://example.com)",
		},
		{
			title: "Images",
			cmd: "![Alt text](image_url)",
		},
	],
};

export const advancedFormattingData: Data = {
	title: "Advanced Formatting",
	items: [
		{
			title: "Code Blocks",
			cmd: "```javascript\nconsole.log('Hello, World!');\n```",
		},
		{
			title: "Tables",
			cmd: "| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |",
		},
		{
			title: "Blockquotes",
			cmd: "> This is a blockquote.",
		},
		{
			title: "Horizontal Rule",
			cmd: "---",
		},
		{
			title: "Escape Characters",
			cmd: "\\*escaped\\*",
		},
	],
};

export const tipsAndTricksData: Data = {
	title: "Tips and Tricks",
	items: [
		{
			title: "Line Breaks",
			cmd: "End a line with two spaces for a line break.",
		},
		{
			title: "Nested Lists",
			cmd: "- Level 1\n  - Level 2\n    - Level 3",
		},
		{
			title: "Task Lists",
			cmd: "- [x] Task 1\n- [ ] Task 2",
		},
		{
			title: "Footnotes",
			cmd: "Here is a footnote[^1].\n\n[^1]: Footnote content.",
		},
	],
};
