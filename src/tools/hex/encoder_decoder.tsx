import { useState } from "react";
import * as stylex from "@stylexjs/stylex";

import MonacoBlock from "@src/components/commons/monaco-block";
import FooterHelp from "@src/tools/footer_help";
import ToolbarHelp from "@src/tools/toolbar_help";
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

function HexEncoderDecoder() {
	const [text, setText] = useState<string>("");
	const [decoded, setDecoded] = useState<string>("");

	function HexEncodeUnicode(arg: string): string {
		let hex: string;
		let result = "";

		for (let i = 0; i < arg.length; i++) {
			hex = arg.charCodeAt(i).toString(16);
			result += `000${hex}`.slice(-4);

			// TODO: make this a user option in case the user wants to split or not
			result += " ";
		}

		return result;
	}

	function HexDecodeUnicode(arg: string): string {
		const arg_clean = arg.replaceAll(" ", "");
		const hexes = arg_clean.match(/.{1,4}/g) || [];
		let back = "";

		for (let j = 0; j < hexes.length; j++) {
			back += String.fromCharCode(parseInt(hexes[j], 16));
		}

		return back;
	}

	function onChangeUrl(value: string): void {
		setText(value);
		const decoded = HexDecodeUnicode(value);
		setDecoded(decoded);
	}

	function onChangeDecoded(value: string): void {
		setDecoded(value);
		const encoded = HexEncodeUnicode(value);
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
						defaultLanguage={"text"}
						options={{
							wordWrap: "on",
						}}
					/>
				</div>

				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>Encoded</h2>

					<MonacoBlock
						value={text}
						setValue={setText}
						onChange={onChangeUrl}
						defaultLanguage={"hex"}
						options={{
							wordWrap: "on",
						}}
					/>
				</div>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is Hex Encoder Decoder?</h2>
						<p>
							This tool converts unicode and ascii characters into their hex
							representation and vice versa.
						</p>
					</div>
				</div>
			</FooterHelp>

			<ToolbarHelp>
				<p>Settings</p>
				TODO: toggle for ascii or unicode decoded text
			</ToolbarHelp>
		</div>
	);
}

export default HexEncoderDecoder;
