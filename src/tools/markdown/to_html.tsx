import { useState } from "react";
import * as stylex from "@stylexjs/stylex";

import MonacoBlock from "@src/components/commons/monaco-block";
import FooterHelp from "@src/tools/footer_help";
import ToolbarHelp from "@src/tools/toolbar_help";

import showdown from "showdown";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";
const converter = new showdown.Converter();

const styles = stylex.create({
	base: {
		height: "100%",
	},

	flex: {
		height: "100%",
		display: "flex",
		gap: "1rem",
	},

	block: {
		backgroundColor: "#1E1E1E",
		borderRadius: "0.25rem",
		padding: "1rem 1rem",
		boxSizing: "border-box",
		width: "100%",
		height: "100%",
	},

	block_title: {
		color: "var(--color-text)",
		paddingBottom: "0.5rem",
		fontWeight: "bold",
	},
});

function MarkdownToHTML() {
	const [text, setText] = useState<string>("");
	const [decoded, setDecoded] = useState<string>("");

	function onChangeUrl(value: string): void {
		// setText(e.target.value);
		// const decoded = decodeURI(text);
		// setDecoded(decoded);
	}

	function onChangeDecoded(value: string): void {
		setDecoded(value);

		// const options = {
		//     wordwrap: 130,
		//     // ...
		//   };

		const encoded = converter.makeHtml(value);
		setText(encoded);
	}

	return (
		<div {...stylex.props(styles.base)}>
			<div {...stylex.props(styles.flex)}>
				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>Markdown</h2>

					<MonacoBlock
						value={decoded}
						setValue={setDecoded}
						onChange={onChangeDecoded}
						defaultLanguage={"markdown"}
					/>
				</div>

				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>HTML</h2>

					<MonacoBlock
						value={text}
						setValue={setText}
						onChange={onChangeUrl}
						defaultLanguage={"html"}
					/>
				</div>
			</div>

			<ToolbarHelp>
				<p>test</p>
			</ToolbarHelp>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is Markdown to HTML?</h2>
						<p>
							This tool will convert markdown text into its equalivent HTML
							form.
						</p>
					</div>
				</div>
			</FooterHelp>
		</div>
	);
}

export default MarkdownToHTML;
