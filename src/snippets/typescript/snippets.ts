export const ts_snippets = [
	{
		title: "Fire an event listener only once",
		code: `const el = document.getElementById("btn");

function myClickHandler(){
    console.log("This click will only fire once.")
}

el.addEventListener("click", myClickHandler, {
    once: true,
});`,
	},

	{
		title: "Calculate SHA-256",
		code: `const hashValue = (val) => crypto.subtle
    .digest("SHA-256", new TextEncoder("utf-8").encode(val))
    .then(h => {
        let hexes = [],
        view = new DataView(h);
        for (let i = 0; i < view.byteLength; i += 4) {
            hexes.push(("00000000" + view.getUint32(i).toString(16)).slice(-8));
        }
        return hexes.join("");
    });

hashValue(
    JSON.stringify({ a: "a", b: [1, 2, 3, 4], foo: { c: "bar" } })
).then(console.log);
// '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'`,
	},

	{
		title: "Fixed-point notation without trailing zeros",
		code: `const toOptionalFixed = (num, digits) => \`\${Number.parseFloat(num.toFixed(digits))}\`;

toOptionalFixed(1, 2); // "1"
toOptionalFixed(1.001, 2); // "1"
toOptionalFixed(1.500, 2); // "1.5"`,
	},

	{
		title: "Round number to given precision",
		code: `const round = (n, decimals = 0) => Number(\`\${Math.round(\`\${n}e\${decimals}\`)}e-\${decimals}\`);

round(1.005, 2); // 1.01`,
	},

	{
		title: "The Asynchronous Clipboard API",
		code:
`const copyToClipboard = (str) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(str);
    }
    return Promise.reject("The Clipboard API is not available.");
};`,
	},
];

export default ts_snippets;
