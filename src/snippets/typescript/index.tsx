import stylex from "@stylexjs/stylex";

import { createRef, useState } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import ts_snippets from "./snippets";
import { snippetStyles } from "../snippets-styles/styles";

import CopyTextIcon from "@src/assets/svgs/clipboard-line.svg";

import { getHighlighter, codeToHtml } from "shiki";
import { toast } from "react-toastify";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
const highlighter = await getHighlighter({
	themes: ["github-dark-default", "dark-plus"],
	langs: ["javascript", "scss", "shellscript"],
});

const styles = stylex.create({
	copyCodeDisplayBlock: {
		backgroundColor: "var(--background-200)",
		width: "100%",
		textWrap: "wrap",
		wordBreak: "break-all",
		padding: "0 0.5rem",
		borderRadius: "0.25rem",
		boxSizing: "border-box",
		display: "flex",
		gap: "0.5rem",
		alignItems: "baseline",
	},

	copyIcon: {
		marginLeft: "auto",
		borderRadius: "0.25rem",

		transition: "background-color var(--transition-speed) ease",

		backgroundColor: "var(--color-bg)",
		":hover": {
			backgroundColor: "var(--color-bg-hover)",
		},
		padding: "0.25rem",
		display: "flex",
		alignItems: "center",
		border: "unset",

		cursor: "pointer",

		position: "absolute",
		right: "3.25em",
		top: "4.5rem",
	},
});

function CodeSnippet(props: any) {
	async function handleClick() {
		await writeText(props.code);
		toast("Copied to clipboard!");
	}

	return (
		<div {...stylex.props(snippetStyles.wrapper)}>
			<p
				style={{
					paddingTop: "0.5rem",
					height: "1.5rem",
					display: "flex",
					alignItems: "center",
					color: "var(--color-text-sub)",
				}}
			>
				{props.title}
			</p>

			<button
				{...stylex.props(styles.copyIcon)}
				onClick={handleClick}
				type="button"
			>
				<img src={CopyTextIcon} height={16} width={16} alt="copy text" />
			</button>

			<pre
				style={{
					fontFamily: "Roboto",
					fontSize: "1rem",
					backgroundColor: "#17171a",
					padding: "0 0.5rem",
					margin: "0.5rem 0",
					borderRadius: "0.5rem",
					overflow: "auto",
				}}
			>
				<code
					style={{
						tabSize: "2rem",
						lineHeight: "1.5rem",
					}}
					// @ts-ignore
					dangerouslySetInnerHTML={{
						__html: highlighter.codeToHtml(props.code, {
							lang: "javascript",
							theme: "dark-plus",
						}),
					}}
				/>
			</pre>
		</div>
	);
}

const title_size = 32;
const line_height = 24;
// const padding = 80;
const padding = 16 + 8 + 16 + 16;
const getItemSize = (index: number) => {
	const lines = (ts_snippets[index].code.match(/\n/g) || "").length + 1;
	return lines * line_height + title_size + padding + 16 + 4;
};

// @ts-ignore
const Row = ({ index, style }) => {
	return (
		<div style={style}>
			<CodeSnippet
				title={ts_snippets[index].title}
				code={ts_snippets[index].code}
			/>
		</div>
	);
};

function SnippetsTypescript() {
	return (
		<div
			className="micro-tool-wrap"
			style={{
				width: "100%",
				height: "100%",
				minHeight: "calc(100vh - 4rem)",
				padding: "1rem 0",
				boxSizing: "border-box",
			}}
		>
			<AutoSizer>
				{({ width, height }) => {
					return (
						<List
							height={height}
							itemCount={ts_snippets.length}
							itemSize={getItemSize}
							width={width}
						>
							{Row}
						</List>
					);
				}}
			</AutoSizer>
		</div>
	);
}
export default SnippetsTypescript;
