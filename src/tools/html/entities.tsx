import { useState } from "react";
import * as stylex from "@stylexjs/stylex";

import MonacoBlock from "@src/components/commons/monaco-block";
import FooterHelp from "@src/tools/footer_help";
import ToolbarHelp from "@src/tools/toolbar_help";

import { encode, decode } from "html-entities";
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

function HTMLEntitiesEncoderDecoder() {
	const [text, setText] = useState<string>("");
	const [decoded, setDecoded] = useState<string>("");

	function onChangeUrl(value: string): void {
		setText(value);
		const decoded = decode(value);
		setDecoded(decoded);
	}

	function onChangeDecoded(value: string): void {
		setDecoded(value);
		const encoded = encode(value);
		setText(encoded);
	}

	return (
		<div {...stylex.props(styles.base)}>
			<div {...stylex.props(styles.flex)}>
				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>Decoded</h2>

					<MonacoBlock
						value={decoded}
						setValue={setDecoded}
						onChange={onChangeDecoded}
						defaultLanguage={"html"}
					/>
				</div>

				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>Encoded</h2>

					<MonacoBlock
						value={text}
						setValue={setText}
						onChange={onChangeUrl}
						defaultLanguage={"html"}
					/>
				</div>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is a HTML Entities Encoder?</h2>
						<p>
							This tool will convert special reserved HTML characters such as
							"&lt;" into their entity name such as "&lt.;".
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

export default HTMLEntitiesEncoderDecoder;
