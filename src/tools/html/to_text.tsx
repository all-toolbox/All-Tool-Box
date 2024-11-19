import { useState } from "react";
import * as stylex from "@stylexjs/stylex";

import MonacoBlock from "@src/components/commons/monaco-block";
import FooterHelp from "@src/tools/footer_help";
import ToolbarHelp from "@src/tools/toolbar_help";

import { convert } from "html-to-text";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";

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

function HTMLToText() {
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

		const encoded = convert(value, {});
		setText(encoded);
	}

	return (
		<div {...stylex.props(styles.base)}>
			<div {...stylex.props(styles.flex)}>
				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>HTML</h2>

					<MonacoBlock
						value={decoded}
						setValue={setDecoded}
						onChange={onChangeDecoded}
						defaultLanguage={"html"}
					/>
				</div>

				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>Text</h2>

					<MonacoBlock
						value={text}
						setValue={setText}
						onChange={onChangeUrl}
						defaultLanguage={"text"}
					/>
				</div>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is Markdown to Text?</h2>
						<p>
							This tool will convert stripe out all html tags and just leave the
							raw text contents from a given html block.
						</p>
					</div>
				</div>
			</FooterHelp>

			<ToolbarHelp>
				<p>test</p>
			</ToolbarHelp>
		</div>
	);
}

export default HTMLToText;
