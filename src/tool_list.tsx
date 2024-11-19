export const tags_list = {
	strings: "Strings",
	numbers: "Numbers",

	json: "JSON",
	yaml: "YAML",
	toml: "TOML",

	css: "CSS",
	javascript: "Javascript",
	html: "HTML",

	minifer: "Minifer",
	formatter: "Formatter",

	images: "Images",
	color: "Color",

	hex: "Hex",
	ascii: "ASCII",
	unicode: "Unicode",
	text: "Text",

	markdown: "Markdown",

	converter: "Converter",

	media: "Media",

	generator: "Generator",

	ip: "IP",
	cron: "CRON",
};

// NOTE: All ids are UUID v4 you can use the toolbox itself to generate them 👀
export const tools = {
	"Heading Extractor": {
		id: "11bac128-9b68-4279-8b41-e7b33e2b71fc",
		title: "Heading Extractor",
		link: "/tool/html/heading_extractor",
		description: "Extract all headings from a website",
		tags: [tags_list["html"]],
	},

	"Text Difference Checker": {
		id: "96d7026e-2550-4005-862d-a4444ccf1cfd",
		title: "Text Difference Checker",
		link: "/tool/text-difference-checker",
		description: "Compares two texts to show the differences",
		tags: [tags_list["text"]],
	},

	"String Case Converter": {
		id: "ee650de7-b66f-4eb3-be83-07f1e51a4906",
		title: "String Case Converter",
		link: "/tool/string/stringcase",
		description: "Converts string into different case(s)",
		tags: [tags_list["strings"]],
	},

	"Base64 - Encoder / Decoder": {
		id: "0f7cb04e-c3a9-403a-ba5d-536ab70e6784",
		title: "Base64 - Encoder / Decoder",
		link: "/tool/base64-encoder-decoder",
		description: "Encode / decode text with Base64 encoding.",
		tags: [],
	},

	"Number Base Converter": {
		id: "5c3f5165-dfe4-42ae-8718-33cfcfe10222",
		title: "Number Base Converter",
		link: "/tool/number-base-converter",
		description: "Converts a number into different bases",
		tags: [tags_list["numbers"]],
	},

	"Hash Generator": {
		id: "4975eb4e-3315-4fd0-80a6-eed66eef7787",
		title: "Hash Generator",
		link: "/tool/hash/generator",
		description: "Convert string into various hashs",
		tags: [],
	},

	"HMAC Generator": {
		id: "e7dbb30f-537f-4413-b5a7-da7e10ab3c41",
		title: "HMAC Generator",
		link: "/tool/hmac/generator",
		description: "Convert string and key into HMAC values",
		tags: [],
	},

	"Uuid Generator": {
		id: "96d17f2f-68f5-44a9-a153-29bb84b35bb5",
		title: "Uuid Generator",
		link: "/tool/uuid/generator",
		description: "Generate uuids (v1 and v4)",
		tags: [],
	},

	"Jwt Decoder": {
		id: "02a2c61f-a212-48ca-bb36-eb250f825278",
		title: "Jwt Decoder",
		link: "/tool/jwt/decoder",
		description: "Decodes Json Web Tokens (header and payload)",
		tags: [],
	},

	"Pomodoro Timer": {
		id: "cbcb2d1b-22a3-483c-966c-efcc6e274128",
		title: "Pomodoro Timer",
		link: "/tool/pomodoro/",
		description: "Timer to help with productivity",
		tags: [],
	},

	"HTML Previewer": {
		id: "f168f515-fef4-4e29-b7e2-b9a01617f1b2",
		title: "HTML Previewer",
		link: "/tool/html/preview",
		description: "Provides a preview of html text.",
		tags: [tags_list["html"]],
	},

	"Keycode Info": {
		id: "6569b2d6-e574-465f-aab2-58cf7b561a1a",
		title: "Keycode Info",
		link: "/tool/keycode-info",
		description: "Get details for pressed key",
		tags: [],
	},

	"IP Info": {
		id: "c37c051d-65b4-44d1-b4db-10ce14fe56df",
		title: "IP Info",
		link: "/tool/ip-info",
		description: "Get current Public IP",
		tags: [tags_list["ip"]],
	},

	"Cron Parser": {
		id: "6b643ef4-9d41-498d-90fd-7f0e9f613674",
		title: "Cron Parser",
		link: "/tool/cron-parser",
		description: "Get details for pressed key",
		tags: [tags_list["cron"]],
	},

	"URL Parser": {
		id: "71225f15-086c-49ab-8be8-7f70d709b877",
		title: "URL Parser",
		link: "/tool/url/parser",
		description: "Parses URLs into a tree view.",
		tags: [],
	},

	"URI Encoder/Decoder": {
		id: "fbb04f1c-f563-4aa9-b4ff-1aef1b5b7ae0",
		title: "URI Encoder/Decoder",
		link: "/tool/url/encode-decode",
		description: "Decode/Encode URI.",
		tags: [],
	},

	"CSS Cursors": {
		id: "431fa7df-777f-4315-9cd8-e20f0831ae0f",
		title: "CSS Cursors",
		link: "/tool/css/cursors",
		description: "Custom CSS cursors",
		tags: [],
	},

	"Word Counter": {
		id: "b6aea8e9-2810-4efb-9225-c97bce244710",
		title: "Word Counter",
		link: "/tool/string/word-count",
		description: "Counts the words, characters, and lines in a piece of text.",
		tags: [],
	},

	"Javascript Formatter": {
		id: "c37aca59-e706-414c-933b-6c80376191b3",
		title: "Javascript Formatter",
		link: "/tool/js/formatter",
		description: "Formats Javascript",
		tags: [tags_list["javascript"], tags_list["formatter"]],
	},

	"CSS Formatter": {
		id: "bbb53c1d-f927-4589-8058-ecfad38fb13b",
		title: "CSS Formatter",
		link: "/tool/css/formatter",
		description: "Formats CSS",
		tags: [tags_list["css"], tags_list["formatter"]],
	},

	"CSS Minifier": {
		id: "8ab0708b-23fe-4c72-8ab2-e9537a119ecb",
		title: "CSS Minifier",
		link: "/tool/css/minifier",
		description: "Minify CSS",
		tags: [tags_list["css"]],
	},

	"HTML Formatter": {
		id: "9bd1c500-f924-4a3e-8dcc-0bc5a1b361dc",
		title: "HTML Formatter",
		link: "/tool/html/formatter",
		description: "Formats HTML",
		tags: [tags_list["html"], tags_list["formatter"]],
	},

	"Lorem Ipsum": {
		id: "67e3516d-3bcc-4948-8c7e-cc3cd8e1e310",
		title: "Lorem Ipsum",
		link: "/tool/faker/lorem-ipsum",
		description: "Generate lorem upsum data",
		tags: [],
	},

	"QR Code Generator": {
		id: "75e14333-592d-4852-bef0-9014af6062d9",
		title: "QR Code Generator",
		link: "/tool/qrcode/generator",
		description: "Generate QR Codes",
		tags: [],
	},

	"HEX Encoder / Decoder": {
		id: "da834f0b-8ad4-4cae-9a2d-a9f99127070b",
		title: "HEX Encoder / Decoder",
		link: "/tool/hex/encode-decoder",
		description: "Hex to ascii or unicode encoding and decoding",
		tags: [tags_list["hex"], tags_list["ascii"], tags_list["unicode"]],
	},

	"Markdown Preview": {
		id: "e55e20b3-352b-4f13-a506-5c7ae020aba8",
		title: "Markdown Preview",
		link: "/tool/markdown/preview",
		description: "Preview markdown",
		tags: [tags_list["markdown"]],
	},

	"HTML Sanitizer": {
		id: "0fa23b9b-9649-4400-a0b2-26ecab179e27",
		title: "HTML Sanitizer",
		link: "/tool/html/sanitizer",
		description: "Sanitize dangerous html",
		tags: [tags_list["html"]],
	},

	"HTML To Text": {
		id: "914b2a13-73b6-4f09-946c-5b3fe69ab066",
		title: "HTML To Text",
		link: "/tool/html/to-text",
		description: "HTML to text",
		tags: [tags_list["html"], tags_list["text"]],
	},

	"HTML To Markdown": {
		id: "ff77431f-9da6-49f0-b632-b2e9643be869",
		title: "HTML To Markdown",
		link: "/tool/html/to-markdown",
		description: "HTML to markdown",
		tags: [tags_list["html"], tags_list["markdown"]],
	},

	"Markdown to HTML": {
		id: "dff972d5-201c-4e76-a424-6b4d1cd80934",
		title: "Markdown to HTML",
		link: "/tool/markdown/to-html",
		description: "Markdown to HTML",
		tags: [tags_list["html"], tags_list["markdown"]],
	},

	"HTML Entities Encoder Decoder": {
		id: "a5059401-df6b-4e8a-9913-b2e835f45f59",
		title: "HTML Entities Encoder Decoder",
		link: "/tool/html/entities",
		description: "HTML Entities cahracters encoder and decoder",
		tags: [tags_list["html"]],
	},

	"Image Extractor": {
		id: "1dd536c7-aa94-45fc-a0ae-b694ed3acd3b",
		title: "Image Extractor",
		link: "/tool/image/extractor",
		description: "Pull all the images from a website",
		tags: [tags_list["images"]],
	},

	"String encrypt decrypt": {
		id: "f5c504f9-652b-4159-92dc-966605330b11",
		title: "String Encrypt Decrypt",
		link: "/tool/string/encrypt-decrypt",
		description: "String encrypter and decrpyter",
		tags: [tags_list["strings"]],
	},

	"Border Radius Generator": {
		id: "17f0ad87-8cee-4c22-93c0-23354413950d",
		title: "Border Radius Generator",
		link: "/tool/css/border-radius",
		description: "Generate border radius",
		tags: [tags_list["css"]],
	},

	"Unit Converter": {
		id: "bd88ea56-5529-4542-ad33-8f1471a2790c",
		title: "Unit Converter",
		link: "/tool/unit-converter",
		description: "Convert one unit to another",
		tags: [tags_list["converter"]],
	},

	"Media Info": {
		id: "c0f4b758-2201-4661-b229-ca0558e72bd7",
		title: "Media Info",
		link: "/tool/media/info",
		description:
			"Find details on video, music, and other media types of files.",
		tags: [tags_list["media"]],
	},

	"CSS Unit Converter": {
		id: "31a65311-a081-480e-8679-86b5963e7f44",
		title: "CSS Unit Converter",
		link: "/tool/css/unit-converter",
		description: "Convert between different CSS units",
		tags: [tags_list["css"], tags_list["converter"]],
	},

	"JSON Formatter": {
		id: "b046fe64-9baf-4dac-a682-d31093e31ee1",
		title: "JSON Formatter",
		link: "/tool/json/formatter",
		description: "Formats JSON",
		tags: [tags_list["json"]],
	},

	"Javascript Minifier": {
		id: "7b6b6a8b-9ce4-472f-89fe-002b329315f9",
		title: "Javascript Minifier",
		link: "/tool/js/minifier",
		description: "Minify Javascript",
		tags: [tags_list["javascript"]],
	},

	"Color Palette Generator": {
		id: "e4c1498f-fa40-4625-beef-2eb15efd56e0",
		title: "Color Palette Generator",
		link: "/tool/colors/color-palette-generator",
		description: "Generate random color palettes",
		tags: [tags_list["color"], tags_list["generator"]],
	},

	"Color Code Converter": {
		id: "85f17666-5a96-4e38-9b8e-d2a8bb76a9d2",
		title: "Color Code Converter",
		link: "/tool/colors/color-code-converter",
		description: "Converts between various color codes",
		tags: [tags_list["color"], tags_list["generator"]],
	},

	"JSON Viewer": {
		id: "de4d5ec5-1ac7-4202-9742-0854e89bbb8f",
		title: "JSON Viewer",
		link: "/tool/json/viewer",
		description: "View JSON in a tree view",
		tags: [tags_list["json"]],
	},

	"JSON to YAML": {
		id: "e91c6a5e-2164-406e-b32e-39ee4ff3961a",
		title: "JSON to YAML",
		link: "/tool/json/to-yaml",
		description: "Convert JSON to YAML",
		tags: [tags_list["json"], tags_list["yaml"]],
	},

	"JSON to TOML": {
		id: "561e819a-dfdd-4f1a-a6bc-56878a18773b",
		title: "JSON to TOML",
		link: "/tool/json/to-toml",
		description: "Convert JSON to TOML",
		tags: [tags_list["json"], tags_list["toml"]],
	},

	"CSS Box Shadow Generator": {
		id: "db5453ec-9854-413a-ba89-a5eae9b95d5c",
		title: "CSS Box Shadow Generator",
		link: "/tool/css/box-shadow",
		description: "Generate box shadows",
		tags: [tags_list["css"], tags_list["generator"]],
	},
};

export const tools_mapped = Object.entries(tools).map((x) => {
	return {
		tool: x,
	};
});
