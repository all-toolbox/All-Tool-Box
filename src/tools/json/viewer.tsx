import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import MonacoBlock from "@src/components/commons/monaco-block";
import FooterHelp from "@src/tools/footer_help";
import ToolbarHelp from "@src/tools/toolbar_help";
import { JSONTree } from "react-json-tree";
import { Map } from "immutable";
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

function JSONTreeView() {
	const [input, setInput] = useState<string>("");
	const [parsedJSON, setParsedJSON] = useState<object | null>(null);

	function onChangeInput(value: string) {
		setInput(value);
		try {
			setParsedJSON(JSON.parse(value));
		} catch (e) {
			console.error(e);
			setParsedJSON(null);
		}
	}

	return (
		<div {...stylex.props(styles.base)}>
			<div {...stylex.props(styles.flex)}>
				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>Input JSON</h2>
					<MonacoBlock
						value={input}
						setValue={setInput}
						onChange={onChangeInput}
						defaultLanguage={"json"}
					/>
				</div>
				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>JSON Tree View</h2>
					<JSONTree data={parsedJSON} />
				</div>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is a JSON Tree Viewer?</h2>
						<p>
							This is a tool that allows you to interactively navigate a JSON
							object.
						</p>

						<h2>How to use.</h2>
						<p>
							Simply enter the json into the left editor. Then naviagate the
							tree structure on the right hand side.
						</p>
					</div>
				</div>
			</FooterHelp>

			<ToolbarHelp>test</ToolbarHelp>
		</div>
	);
}

export default JSONTreeView;
