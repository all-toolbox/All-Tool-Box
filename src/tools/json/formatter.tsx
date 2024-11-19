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
	toolbar: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "0.5rem 1rem",
		backgroundColor: "transparent",
	},
	toolbarButton: {
		cursor: "pointer",
		padding: "0.5rem 1rem",
		borderRadius: "0.25rem",
		border: "1px solid #ccc",
		backgroundColor: "#fff",
		transition: "background-color 0.3s",
	},
	toolbarButtonActive: {
		backgroundColor: "#e0e0e0",
	},
});

function JSONFormatter() {
	const [text, setText] = useState<string>("");
	const [decoded, setDecoded] = useState<string>("");
	const [pretty, setPretty] = useState<boolean>(true);

	function onChangeUrl(e: any): void {
		// setText(e.target.value);
		// const decoded = decodeURI(text);
		// setDecoded(decoded);
	}

	function onChangeDecoded(value: string): void {
		setDecoded(value);
		try {
			const parsed = JSON.parse(value);
			const formatted = pretty
				? JSON.stringify(parsed, null, 2)
				: JSON.stringify(parsed);
			setText(formatted);
		} catch (e) {
			console.error(e);
		}
	}

	function toggleFormat() {
		setPretty(!pretty);
		if (decoded) {
			try {
				const parsed = JSON.parse(decoded);
				const formatted = !pretty
					? JSON.stringify(parsed, null, 2)
					: JSON.stringify(parsed);
				setText(formatted);
			} catch (e) {
				console.error(e);
			}
		}
	}

	return (
		<div {...stylex.props(styles.base)}>
			<div {...stylex.props(styles.flex)}>
				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>JSON</h2>
					<MonacoBlock
						value={decoded}
						setValue={setDecoded}
						onChange={onChangeDecoded}
						defaultLanguage={"json"}
					/>
				</div>
				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>Formatted JSON</h2>
					<MonacoBlock
						value={text}
						setValue={setText}
						onChange={onChangeUrl}
						defaultLanguage={"json"}
					/>
				</div>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is a JSON Formatter?</h2>
						<p>
							This is a tool that takes JSON and formats it against the VSCode
							JSON language server default formatting options.
						</p>
					</div>
				</div>
			</FooterHelp>

			<ToolbarHelp>
				<div {...stylex.props(styles.toolbar)}>
					<button
						{...stylex.props(
							styles.toolbarButton,
							pretty && styles.toolbarButtonActive,
						)}
						onClick={toggleFormat}
					>
						{pretty ? "Compact" : "Pretty"}
					</button>
				</div>
			</ToolbarHelp>
		</div>
	);
}

export default JSONFormatter;
