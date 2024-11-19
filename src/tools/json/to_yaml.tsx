import React, { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import MonacoBlock from "@src/components/commons/monaco-block";
import FooterHelp from "@src/tools/footer_help";
import ToolbarHelp from "@src/tools/toolbar_help";
import { JSONTree } from "react-json-tree";
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

function jsonToYaml(
	obj: any,
	indent: number = 0,
	isParentArray: boolean = false,
): string {
	if (obj === null) {
		return "null";
	}
	if (typeof obj === "boolean" || typeof obj === "number") {
		return String(obj);
	}
	if (typeof obj === "string") {
		return `${JSON.stringify(obj)}`;
	}
	if (Array.isArray(obj)) {
		return obj
			.map(
				(item) =>
					`\n${" ".repeat(indent)}- ${jsonToYaml(item, indent + 2, true)}`,
			)
			.join("");
	}
	if (typeof obj === "object") {
		return Object.keys(obj)
			.map(
				(key, index) =>
					`${isParentArray && index === 0 ? "" : `\n${" ".repeat(indent)}`}${key}: ${jsonToYaml(obj[key], indent + 2)}`,
			)
			.join("");
	}
	return String(obj);
}

const JSONToYAMLConverter: React.FC = () => {
	const [input, setInput] = useState<string>("");
	const [yamlOutput, setYamlOutput] = useState<string>("");

	function onChangeInput(value: string) {
		setInput(value);
		try {
			const parsed = JSON.parse(value.trim());
			setYamlOutput(jsonToYaml(parsed, 0, Array.isArray(parsed)));
		} catch (e) {
			console.error(e);
			setYamlOutput("");
		}
	}

	function onChangeYaml(e: any): void {
		// Optional: You can implement this if you want the YAML block to be editable
	}

	return (
		<div {...stylex.props(styles.base)}>
			<div {...stylex.props(styles.flex)}>
				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>JSON Input</h2>
					<MonacoBlock
						value={input}
						setValue={setInput}
						onChange={onChangeInput}
						defaultLanguage={"json"}
					/>
				</div>
				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>YAML Output</h2>
					<MonacoBlock
						value={yamlOutput}
						setValue={setYamlOutput}
						onChange={onChangeYaml}
						defaultLanguage={"yaml"}
					/>
				</div>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is a h2?</h2>
						<p>
							This is a simple converter that takes valid json and outputs yaml.
						</p>

						<h2>How to use.</h2>
						<p>
							Simply enter the json you want converted into the left editor. The
							yaml output will be displayed on the editor on the right in real
							time.
						</p>
					</div>
				</div>
			</FooterHelp>

			<ToolbarHelp>
				<div {...stylex.props(styles.toolbar)}>
					<button
						{...stylex.props(styles.toolbarButton)}
						onClick={() => navigator.clipboard.writeText(yamlOutput)}
					>
						Copy YAML Output
					</button>
				</div>
			</ToolbarHelp>
		</div>
	);
};

export default JSONToYAMLConverter;
