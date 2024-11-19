import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import MonacoBlock from "@src/components/commons/monaco-block";
import FooterHelp from "@src/tools/footer_help";
import ToolbarHelp from "@src/tools/toolbar_help";
import { minify } from "terser";
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
		borderBottom: "1px solid #ccc",
		backgroundColor: "#f9f9f9",
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

function JSMinifier() {
	const [input, setInput] = useState<string>("");
	const [minified, setMinified] = useState<string>("");

	async function onChangeInput(value: string) {
		setInput(value);
		try {
			const result = await minify(value);
			if (result.code) {
				setMinified(result.code);
			}
		} catch (e) {
			console.error(e);
		}
	}

	function onChangeMinified(e: any): void {
		// Optional: You can implement this if you want the minified block to be editable
	}

	return (
		<div {...stylex.props(styles.base)}>
			<div {...stylex.props(styles.flex)}>
				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>JavaScript Code</h2>
					<MonacoBlock
						value={input}
						setValue={setInput}
						onChange={onChangeInput}
						defaultLanguage={"javascript"}
					/>
				</div>
				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>Minified JavaScript</h2>
					<MonacoBlock
						value={minified}
						setValue={setMinified}
						onChange={onChangeMinified}
						defaultLanguage={"javascript"}
					/>
				</div>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is Javascript Minifer?</h2>
						<p>
							This tool will take javascript code and run it through the terser
							library. Reducing its size for faster browser load times.
						</p>
					</div>
				</div>
			</FooterHelp>

			<ToolbarHelp>test</ToolbarHelp>
		</div>
	);
}

export default JSMinifier;
