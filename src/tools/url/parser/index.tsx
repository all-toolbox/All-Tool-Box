/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useReducer, useState } from "react";
import * as stylex from "@stylexjs/stylex";

import Navbar from "@src/components/navbar";
import Sidebar from "@src/components/sidebar";
import FooterHelp from "@src/tools/footer_help";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";
import TextareaBlock from "@src/components/commons/textarea-block";

// import './index.scss';\
const styles = stylex.create({
	wrapper: {
		display: "flex",
		gap: "1rem",
		boxSizing: "border-box",
		height: "100%",
		width: "100%",
		flexDirection: {
			default: "row",
			"@media (max-width: 1200px)": "column",
		},
	},
});
function UrlParser() {
	const [text, setText] = useState<string>(
		"http://example.com/path/index.html?message=hello&who=world",
	);
	const [parsedUrl, setParsedUrl] = useState<string>("");

	useEffect(() => {
		try {
			const url = new URL(text);
			var dictStr = ``;
			url.searchParams.forEach((value, key) => {
				dictStr += `  ${key}: "${value}"\n`;
			});

			setParsedUrl(`hostname: "${url.hostname}"
protocol: "${url.protocol}"
origin: "${url.origin}"
path: "${url.pathname}"
search (${url.searchParams.size} fields):
${dictStr}host: "${url.host}"`);
		} catch (error) {
			console.log(error);
		}
	}, [text]);

	function onChangeText(e: any): void {
		setText(e.target.value);
	}

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div
				{...stylex.props(
					util_styles.display_block_base,
					util_styles.flex_column,
				)}
			>
				<h2>URL</h2>
				<TextareaBlock
					value={text}
					onChange={onChangeText}
					setValue={setText}
				/>
			</div>

			<div
				{...stylex.props(
					util_styles.display_block_base,
					util_styles.flex_column,
				)}
			>
				<h2>Tree View</h2>
				<TextareaBlock value={parsedUrl} readOnly={true} />
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is URL Parser?</h2>
						<p>
							This tool takes in a URL, and parses out in a tree view the
							various protions that make up a URL. For example detailing but not
							limited to the protocol, domain, origin, and query params.
						</p>
					</div>
				</div>
			</FooterHelp>
		</div>
	);
}

export default UrlParser;
