import React, { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import MonacoBlock from "@src/components/commons/monaco-block";
import FooterHelp from "@src/tools/footer_help";
import ToolbarHelp from "@src/tools/toolbar_help";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";

const styles = stylex.create({
	base: {
		height: "100%",
		width: "100%",
	},

	flex: {
		height: "100%",
		width: "100%",
		display: "flex",
		gap: "1rem",
	},

	block: {
		backgroundColor: "var(--background-100)",
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

function jsonToToml(obj: any, indent: string = "", parent?: string): string {
	let toml: { content: string; type: string }[] = [];
	let parentStr = parent ? parent + "." : "";
	for (const key in obj) {
		if (Array.isArray(obj[key])) {
			let arrayVal: string[] = [];

			obj[key].forEach((item: any, index: number) => {
				if (typeof item === "object" && !Array.isArray(item)) {
					toml.push({
						content: `${indent}[[${key}]]\n${jsonToToml(item, indent, parentStr + key)}`,
						type: "complex",
					});
				} else {
					arrayVal.push(`${jsonToTomlValue(item)}`);
				}
			});

			if (arrayVal.length > 0) {
				toml.push({
					content: `${indent}"${key}" = [\n${arrayVal.join(",\n")}\n]\n`,
					type: "simple",
				});
			}
		} else if (typeof obj[key] === "object" && obj[key] !== null) {
			toml.push({
				content: `\n${indent + "  "}[${parentStr}${key}]\n${jsonToToml(obj[key], indent + "  ", (parent ? parent + "." : "") + key)}\n`,
				type: "complex",
			});
		} else {
			toml.push({
				content: `${indent}"${key}" = ${jsonToTomlValue(obj[key])}\n`,
				type: "simple",
			});
		}
	}

	// Arrange simple values to the beginning of the object to avoid spacing issue
	let complex: string[] = [];
	let simple: string[] = [];
	toml.forEach((item) => {
		if (item.type === "complex") {
			complex.push(item.content);
		} else {
			simple.push(item.content);
		}
	});
	return simple.join("") + complex.join("");
}

function jsonToTomlValue(value: any): string {
	if (typeof value === "string") {
		return JSON.stringify(value);
	} else if (typeof value === "number" || typeof value === "boolean") {
		return String(value);
	} else if (Array.isArray(value)) {
		return `[${value.map(jsonToTomlValue).join(", ")}]`;
	} else if (value === null) {
		return "null";
	} else {
		return String(value);
	}
}

const JSONToTOMLConverter: React.FC = () => {
	const [input, setInput] = useState<string>("");
	const [tomlOutput, setTomlOutput] = useState<string>("");

	function onChangeInput(value: string) {
		setInput(value);
		try {
			const parsed = JSON.parse(value.trim());
			setTomlOutput(jsonToToml(parsed));
		} catch (e) {
			console.error(e);
			setTomlOutput("");
		}
	}

	function onChangeToml(e: any): void {
		// Optional: You can implement this if you want the TOML block to be editable
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
					<h2>TOML Output</h2>
					<MonacoBlock
						value={tomlOutput}
						setValue={setTomlOutput}
						onChange={onChangeToml}
						defaultLanguage={"toml"}
					/>
				</div>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is a JSON to TOML?</h2>
						<p>
							This is a simple converter that takes valid json and outputs toml.
						</p>

						<h2>How to use.</h2>
						<p>
							Simply enter the json you want converted into the left editor. The
							toml output will be displayed on the editor on the right in real
							time.
						</p>
					</div>
				</div>
			</FooterHelp>

			<ToolbarHelp>
				<div {...stylex.props(styles.toolbar)}>
					<button
						{...stylex.props(styles.toolbarButton)}
						onClick={() => navigator.clipboard.writeText(tomlOutput)}
						type="button"
					>
						Copy TOML Output
					</button>
				</div>
			</ToolbarHelp>
		</div>
	);
};

export default JSONToTOMLConverter;
