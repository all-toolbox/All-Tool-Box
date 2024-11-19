import MonacoBlock from "@src/components/commons/monaco-block";
import stylex from "@stylexjs/stylex";
import React, { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import FooterHelp from "../footer_help";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";

const styles = stylex.create({
	base: {
		height: "100%",
		width: "100%",
	},

	htmlPreview: {
		height: "calc(100% - 2.125rem)",
		width: "100%",
		backgroundColor: "white",
		borderRadius: "0.25rem",
	},

	block_title: {
		color: "var(--color-text)",
		paddingBottom: "0.5rem",
		fontWeight: "bold",
	},
});

function MarkdownPreviewer() {
	const starting_string = "# Title";

	const [rawValue, setValue] = useState(starting_string);
	const [htmlValue, setHTMLValue] = useState(marked.parse(starting_string));

	const iframeRef = useRef<HTMLIFrameElement>(null);

	return (
		<div {...stylex.props(styles.base)}>
			<div
				style={{
					display: "flex",
					height: "100%",
					gap: "1rem",
				}}
			>
				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>Markdown</h2>
					<MonacoBlock
						// @ts-ignore
						value={rawValue}
						setValue={setValue}
						onChange={(value) => {
							setValue(value);
							setHTMLValue(
								marked.parse(value, {
									gfm: true,
								}),
							);
						}}
						defaultLanguage="markdown"
					/>
				</div>

				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>Preview</h2>
					<iframe
						{...stylex.props(styles.htmlPreview)}
						title="HTML Preview"
						// @ts-ignore
						srcDoc={htmlValue}
					/>
				</div>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is Markdown Preview?</h2>
						<p>
							This tool allows you to prefer markdown formatted documents. For
							example previewing github style README.md files.
						</p>
					</div>
				</div>
			</FooterHelp>
		</div>
	);
}

export default MarkdownPreviewer;
