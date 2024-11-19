import { useState } from "react";
import * as stylex from "@stylexjs/stylex";

import MonacoBlock from "@src/components/commons/monaco-block";
import FooterHelp from "@src/tools/footer_help";
import ToolbarHelp from "@src/tools/toolbar_help";

import { css_beautify } from "js-beautify";
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

function CSSFormatter() {
	const [text, setText] = useState<string>("");
	const [decoded, setDecoded] = useState<string>("");

	function onChangeUrl(e: any): void {
		// setText(e.target.value);
		// const decoded = decodeURI(text);
		// setDecoded(decoded);
	}

	function onChangeDecoded(value: string): void {
		setDecoded(value);
		const encoded = css_beautify(value);

		// interface CoreBeautifyOptions {
		//     disabled?: boolean | undefined;
		//     eol?: string | undefined;
		//     end_with_newline?: boolean | undefined;
		//     indent_size?: number | undefined;
		//     indent_char?: string | undefined;
		//     indent_level?: number | undefined;
		//     preserve_newlines?: boolean | undefined;
		//     max_preserve_newlines?: number | undefined;
		//     indent_with_tabs?: boolean | undefined;
		//     wrap_line_length?: number | undefined;
		//     indent_empty_lines?: boolean | undefined;
		//     templating?: string[] | undefined;
		// }

		// interface CSSBeautifyOptions extends CoreBeautifyOptions {
		//     selector_separator_newline?: boolean | undefined;
		//     newline_between_rules?: boolean | undefined;
		//     space_around_selector_separator?: boolean | undefined;
		//     space_around_combinator?: boolean | undefined;
		// }

		setText(encoded);
	}

	return (
		<div {...stylex.props(styles.base)}>
			<div {...stylex.props(styles.flex)}>
				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>CSS</h2>

					<MonacoBlock
						value={decoded}
						setValue={setDecoded}
						onChange={onChangeDecoded}
						defaultLanguage={"css"}
					/>
				</div>

				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>Formatted CSS</h2>

					<MonacoBlock
						value={text}
						setValue={setText}
						onChange={onChangeUrl}
						defaultLanguage={"css"}
					/>
				</div>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is CSS Formatter?</h2>
						<p>
							This tool formats HTML by using the js-beautify's library
							css_beautify function.
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

export default CSSFormatter;
