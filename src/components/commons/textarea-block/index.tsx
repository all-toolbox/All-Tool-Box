import * as stylex from "@stylexjs/stylex";
import { forwardRef, useState } from "react";

import { writeText, readText } from "@tauri-apps/plugin-clipboard-manager";
import { save } from "@tauri-apps/plugin-dialog";
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = stylex.create({
	base: {
		backgroundColor: "var(--editor-background)",
		height: "100%",
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
		height: "calc(100% - 2.5rem)",
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
		backgroundColor: "transparent",
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
	setValue?: (arg: string) => void;
	onChange?: (e: any) => void;
	readOnly?: boolean;
}

const TextareaBlock = forwardRef((props: I_TextareaBlockProps, ref: any) => {
	const [expanded, setExpanded] = useState<boolean>(false);

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

				if (props.setValue) {
					props.setValue(content);
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
								if (props.setValue) {
									props.setValue(res);
								}
							})
							.catch((err) => {
								console.log(err);
							});
						toast("Pasted from clipboard!");
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
						toast("Copied to clipboard!");
					}}
				>
					Copy
				</button>

				<button
					{...stylex.props(styles.btn)}
					type="button"
					onClick={() => {
						if (props.setValue) {
							props.setValue("");
						}
					}}
				>
					Clear
				</button>

				{/* <button
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
				<textarea
					{...stylex.props(styles.textarea)}
					value={props.value}
					onChange={props.onChange}
					readOnly={props.readOnly}
				/>
			</div>
		</div>
	);
});

export default TextareaBlock;
