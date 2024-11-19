import { useState } from "react";

import * as stylex from "@stylexjs/stylex";

import MonacoBlock from "@src/components/commons/monaco-block";
import FooterHelp from "./footer_help";
import ToolbarHelp from "./toolbar_help";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";

const styles = stylex.create({
	base: {
		height: "100%",
		width: "100%",
		boxSizing: "border-box",
	},

	flex: {
		height: "100%",
		flexDirection: "column",
		display: "flex",
		gap: "2rem",
	},
	block: {
		minHeight: "16rem",
		overflow: "auto",
	},
	block_title: {
		color: "var(--color-text)",
		paddingBottom: "0.5rem",
		fontWeight: "bold",
	},
});

function Base64EncoderDecoder() {
	const [encoded, setEncoded] = useState<string>("");
	const [decoded, setDecoded] = useState<string>("");

	function onChangeEncoded(value: string): void {
		setEncoded(value);

		try {
			setDecoded(atob(value));
		} catch (e) {
			setDecoded("Invalid base 64 string");
		}
	}

	function onChangeDecoded(value: string): void {
		setDecoded(value);
		setEncoded(btoa(value));
	}

	return (
		<div {...stylex.props(styles.base, styles.flex)}>
			<div
				{...stylex.props(
					util_styles.display_block_base,
					util_styles.flexGrow,
					styles.block,
				)}
			>
				<h2>Decoded</h2>

				<MonacoBlock
					value={decoded}
					setValue={setDecoded}
					onChange={onChangeDecoded}
					defaultLanguage={"text"}
				/>
			</div>

			<div
				{...stylex.props(
					util_styles.display_block_base,
					util_styles.flexGrow,
					styles.block,
				)}
			>
				<h2>Encoded</h2>

				<MonacoBlock
					value={encoded}
					setValue={setEncoded}
					onChange={onChangeEncoded}
					defaultLanguage={"text"}
				/>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is a Base64 Encoder?</h2>
						<p>
							This is a simple tool to convert input strings to the Base64
							encoding format.
						</p>

						<h2>How to use Base64 Encoder</h2>
						<p>
							Immediately after inputting the raw string in the left editor
							(Decoded) the data will converted into Base64 and displayed in the
							editor to the right (Encoded).
						</p>

						{/* About Encoding Options

                    Encode line by line
                    Base64 encoding is usually converted including the newline code. By enabling this option, the conversion will be done line by line, separated by newlines. This option is useful when you want to convert multiple data at once.

                    Convert in URL-safe format
                    The Base64 encoded string may contain '+' and '/' characters. These characters cannot be included in the URL. Turn on this option if you want to convert characters that cannot be used in URLs to other characters (=URL safe) and perform Base64 encoding. */}
					</div>

					<br />

					<div {...stylex.props(help_styles.block)}>
						<h2>What is Base64 Decoder?</h2>
						<p>
							This is a simple tool to convert Base64 formatted strings into
							decoded raw strings.
						</p>

						<h2>How to use Base64 Decoder</h2>
						<p>
							Immediately after inputting the base64 string in the right editor
							(Encoded) the data will converted into the raw string and
							displayed in the editor to the left (Decoded).
						</p>

						{/* About decoding options

                    Decode line by line

                    Base64 decoding usually includes the newline code in the conversion. By enabling this option, the conversion is performed line by line, separated by newlines. This option is useful when you want to convert multiple data at once. */}
					</div>
				</div>
			</FooterHelp>

			<ToolbarHelp>
				<p>test</p>
			</ToolbarHelp>
		</div>
	);
}

export default Base64EncoderDecoder;
