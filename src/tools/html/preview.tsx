import MonacoBlock from "@src/components/commons/monaco-block";
import stylex from "@stylexjs/stylex";
import React, { useEffect, useRef, useState } from "react";
import FooterHelp from "../footer_help";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";
import ToolbarHelp from "../toolbar_help";

const styles = stylex.create({
	wrapper: {
		height: "100%",
	},

	flex: {
		height: "100%",
		display: "flex",
		gap: "1rem",
	},

	htmlPreview: {
		width: "100%",
		height: "calc(100% - 2.0625rem)",
		backgroundColor: "white",
		borderRadius: "0.25rem",
		border: "0.0625rem solid var(--border-100)",
	},

	block_title: {
		color: "var(--color-text)",
		paddingBottom: "0.5rem",
		fontWeight: "bold",
	},
});

export default function HTMLPreviewer() {
	const [htmlValue, setHTMLValue] = useState("<p>hello world</p>");
	const iframeRef = useRef<HTMLIFrameElement>(null);

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div {...stylex.props(styles.flex)}>
				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>HTML Input</h2>

					<MonacoBlock
						value={htmlValue}
						setValue={setHTMLValue}
						onChange={(value) => setHTMLValue(value)}
						defaultLanguage="html"
					/>
				</div>

				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>Preview</h2>

					<iframe
						{...stylex.props(styles.htmlPreview)}
						title="HTML Preview"
						srcDoc={htmlValue}
					/>
				</div>
			</div>

			<ToolbarHelp toolName="HTML Preview" />
			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is HTML Preview?</h2>
						<p>
							It allows for previewing what given HTML will look like rendered
							in a browser.
						</p>
						<br />
						<p>On Windows a Chromeium (Modern Edge) based browser</p>
						<br />
						<p>On Mac a Safari based browser</p>
						<br />
						<p>On Linux a Firefox based browser</p>
					</div>
				</div>
			</FooterHelp>
		</div>
	);
}
