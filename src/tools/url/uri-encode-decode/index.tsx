import { useState } from "react";
import * as stylex from "@stylexjs/stylex";

import TextareaBlock from "@src/components/commons/textarea-block";
import FooterHelp from "@src/tools/footer_help";
import ToolbarHelp from "@src/tools/toolbar_help";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";

const styles = stylex.create({
	base: {
		display: "flex",
		gap: "1rem",
		boxSizing: "border-box",
		height: "100%",
		width: "100%",
	},

	flex: {
		height: "100%",
		width: "100%",
		display: "grid",
		boxSizing: "border-box",
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

	textArea: {
		boxSizing: "border-box",
		maxHeight: "100%",
	},
});

function URIEncoderDecoder() {
	const [text, setText] = useState<string>("");
	const [decoded, setDecoded] = useState<string>("");

	function onChangeUrl(e: any): void {
		setText(e.target.value);
		const decoded = decodeURI(text);
		setDecoded(decoded);
	}

	function onChangeDecoded(e: any): void {
		setDecoded(e.target.value);
		const encoded = encodeURI(e.target.value);
		setText(encoded);
	}

	return (
		<div {...stylex.props(styles.base)}>
			<div
				{...stylex.props(
					util_styles.display_block_base,
					util_styles.flex_column,
				)}
			>
				<h2>Decoded</h2>
				<TextareaBlock
					value={decoded}
					setValue={setDecoded}
					onChange={onChangeDecoded}
				/>
			</div>

			<div
				{...stylex.props(
					util_styles.display_block_base,
					util_styles.flex_column,
				)}
			>
				<h2>Encoded</h2>
				<TextareaBlock value={text} setValue={setText} onChange={onChangeUrl} />
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is URI Encode Decode?</h2>
						<p>This tool converts raw strings into a URI or vice versa.</p>
					</div>
				</div>
			</FooterHelp>

			<ToolbarHelp>
				<p>test</p>
			</ToolbarHelp>
		</div>
	);
}

export default URIEncoderDecoder;
