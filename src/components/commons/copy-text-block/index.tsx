import stylex from "@stylexjs/stylex";
import React, { useEffect, useState } from "react";
import CopyTextIcon from "@src/assets/svgs/clipboard-line.svg";
import { writeText, readText } from "@tauri-apps/plugin-clipboard-manager";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getHighlighter, codeToHtml } from "shiki";
import "./test.css";
const highlighter = await getHighlighter({
	themes: ["github-dark-default", "dark-plus"],
	langs: [
		"javascript",
		"jsx",
		"typescript",
		"tsx",
		"scss",
		"shellscript",
		"go",
		"python",
		"docker",
		"regexp",
		"markdown",
	],
});

const styles = stylex.create({
	copyDisplayBlock: {
		backgroundColor: "var(--background-200)",
		width: "100%",
		textWrap: "wrap",
		wordBreak: "break-all",
		padding: "0.5rem 0.5rem",
		borderRadius: "0.25rem",
		boxSizing: "border-box",
		display: "flex",
		alignItems: "center",
		gap: "0.5rem",
	},

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
		backgroundColor: "transparent",
		":hover": {
			backgroundColor: "var(--color-bg-hover)",
		},
		padding: "0.25rem",
		display: "flex",
		alignItems: "center",
		border: "unset",

		cursor: "pointer",
	},

	reset: {
		padding: 0,
		margin: 0,
		outline: "unset",
		border: "unset",
	},

	textWrap: {
		textWrap: "wrap",
	},
});

interface I_CopyTextBlockProps {
	text: string;
	code?: boolean;
	lang?: string;
}

//TODO add a toast or something saying copied
export default function CopyTextBlock({
	text,
	code,
	lang,
}: I_CopyTextBlockProps) {
	async function handleClick() {
		await writeText(text);
		toast("Copied to clipboard!");
	}

	return (
		<>
			{code ? (
				<div {...stylex.props(styles.copyCodeDisplayBlock)}>
					<pre
						{...stylex.props(styles.textWrap)}
						style={{
							fontFamily: "Roboto",
							fontSize: "1rem",
							padding: "0",
							margin: "0",
							borderRadius: "0.5rem",
							overflow: "auto",
							backgroundColor: "transparent",
						}}
					>
						<code
							style={{
								tabSize: "2rem",
								lineHeight: "1.5rem",
							}}
							// @ts-ignore
							dangerouslySetInnerHTML={{
								__html: highlighter.codeToHtml(text, {
									lang: lang ? lang : "javascript",
									theme: "dark-plus",
								}),
							}}
						/>
					</pre>

					<button
						{...stylex.props(styles.copyIcon)}
						onClick={handleClick}
						type="button"
					>
						<img src={CopyTextIcon} height={16} width={16} alt="copy text" />
					</button>
				</div>
			) : (
				<div {...stylex.props(styles.copyDisplayBlock)}>
					<p {...stylex.props(styles.textWrap)}>{text}</p>

					<button
						{...stylex.props(styles.copyIcon)}
						onClick={handleClick}
						type="button"
					>
						<img src={CopyTextIcon} height={16} width={16} alt="copy text" />
					</button>
				</div>
			)}
		</>
	);
}
