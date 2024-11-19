import * as stylex from "@stylexjs/stylex";
import { forwardRef, useEffect, useRef, useState } from "react";

import { writeText, readText } from "@tauri-apps/plugin-clipboard-manager";
import { save } from "@tauri-apps/plugin-dialog";
import { writeTextFile } from "@tauri-apps/plugin-fs";

import Editor, { loader } from "@monaco-editor/react";

const styles = stylex.create({
	base: {
		backgroundColor: "var(--editor-background)",
		height: "calc(100% - 2rem)",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		border: "0.0625rem solid var(--border-100)",
		borderRadius: "0.25rem",
		transition: "border var(--transition-speed) ease",
		boxSizing: "border-box",

		":hover": {
			border: "0.0625rem solid var(--hover-100)",
		},
	},

	fullscreen: {
		height: "calc(100% - 1.25rem)",
		top: 0,

		position: "absolute",
		left: 0,
		width: "100%",
		zIndex: "10000000000000",
	},

	btn: {
		border: "none",
		borderRadius: "0.25rem",
		padding: "0.25rem 0.5rem",
		backgroundColor: "transparent",
		color: "var(--text-100)",
		cursor: "pointer",
		outline: "none",
		transition: "background-color var(--transition-speed) ease",
		":hover": {
			backgroundColor: "var(--background-300)",
		},
	},

	textarea: {
		width: "100%",
		height: "100%",
		overflow: "auto",
		outline: "none",
		border: "none",
		color: "white",
		padding: "0.75rem",
		boxSizing: "border-box",
		resize: "none",
		backgroundColor: "var(--background-100)",
	},

	optionsBar: {
		boxSizing: "border-box",
		display: "flex",
		gap: "0.5rem",
		padding: "0.5rem",
		borderBottom: "1px solid var(--color-border)",
	},
});

interface I_TextareaBlockProps {
	value: string;
	setValue: (arg: string) => void;
	onChange: (e: any) => void;
	defaultLanguage: string;
	options?: any;
}

const MonacoBlock = forwardRef((props: I_TextareaBlockProps, ref: any) => {
	const editorRef = useRef(null);

	const [expanded, setExpanded] = useState<boolean>(false);

	const [mh, setMH] = useState<string>("100%");

	// @ts-ignore
	function handleEditorDidMount(editor, monaco) {
		editorRef.current = editor;

		monaco.editor.defineTheme("myTheme", {
			base: "vs-dark",
			inherit: true,
			rules: [],
			colors: {
				"editor.background": "#151518",
			},
		});
		monaco.editor.setTheme("myTheme");
	}

	function OpenFile(et: any) {
		// TODO: create a global file input comp and just use its ID for ref
		const input = document.createElement("input");
		input.type = "file";

		input.onchange = (e: any) => {
			const file = e.target.files[0];

			const reader = new FileReader();
			reader.readAsText(file, "UTF-8");

			reader.onload = (readerEvent: any) => {
				const content = readerEvent.target.result;
				console.log(content);

				props.setValue(content);

				if (editorRef.current) {
					// @ts-ignore
					editorRef.current.setValue(content);
				}
			};
		};

		input.click();
	}

	async function WriteFile(): Promise<void> {
		const path = await save({
			filters: [
				{
					name: "",
					extensions: ["txt"],
				},
			],
		});

		// TODO: need some kind of notication for success and filaure
		writeTextFile(
			// @ts-ignore
			path,
			props.value,
			{
				createNew: true,
			},
		);
	}

	// @ts-ignore
	function handleEditorChange(value, event) {
		props.onChange(value);
	}

	return (
		<div {...stylex.props(expanded === true ? styles.fullscreen : styles.base)}>
			<div {...stylex.props(styles.optionsBar)}>
				<button {...stylex.props(styles.btn)} type="button" onClick={OpenFile}>
					Load File
				</button>

				<button
					{...stylex.props(styles.btn)}
					type="button"
					onClick={() => {
						readText()
							.then((res) => {
								console.log(res);
								props.setValue(res);
							})
							.catch((err) => {
								console.log(err);
							});
					}}
				>
					Clipboard
				</button>

				<button {...stylex.props(styles.btn)} type="button" onClick={WriteFile}>
					Download
				</button>

				<button
					{...stylex.props(styles.btn)}
					type="button"
					onClick={() => {
						writeText(props.value)
							.then((res) => {
								console.log(res);
							})
							.catch((err) => {
								console.log(err);
							});
					}}
				>
					Copy
				</button>

				<button
					{...stylex.props(styles.btn)}
					type="button"
					onClick={() => {
						props.setValue("");
					}}
				>
					Clear
				</button>

				{/* TODO:
				<button
					{...stylex.props(styles.btn)}
					type="button"
					onClick={() => {
						setExpanded(!expanded);
					}}
				>
					Expand
				</button> */}
			</div>

			<div
				style={{
					height: "100%",
					position: "relative",
				}}
			>
				{/*
NOTE: In App.css there's a css class monaco-editor with position absolute
that allows the automacticLayout resisinzg to work correctly.
*/}

				<Editor
					height="100%"
					defaultLanguage={props.defaultLanguage}
					theme="vs-dark"
					defaultValue={props.value}
					value={props.value}
					onChange={handleEditorChange}
					options={{
						automaticLayout: true,
						...props.options,
					}}
					onMount={handleEditorDidMount}
				/>
			</div>
		</div>
	);
});

export default MonacoBlock;
