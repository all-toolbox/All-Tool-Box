import { useEffect, useRef, useState } from "react";

import * as stylex from "@stylexjs/stylex";

import MonacoBlock from "@src/components/commons/monaco-block";
import FooterHelp from "../footer_help";
import ToolbarHelp from "../toolbar_help";

import mediaInfoFactory from "mediainfo.js";
import type { MediaInfo, ReadChunkFunc } from "mediainfo.js";
import TextareaBlock from "@src/components/commons/textarea-block";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";

export const META_ENV_PROD = import.meta.env.PROD;

function makeReadChunk(file: File): ReadChunkFunc {
	return async (chunkSize: number, offset: number) =>
		new Uint8Array(await file.slice(offset, offset + chunkSize).arrayBuffer());
}

const styles = stylex.create({
	base: {
		height: "100%",
	},

	grid: {
		height: "100%",
		display: "grid",
		gridTemplateRows: "minmax(2rem, 2rem) 1fr",
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
});

function MediaInfoViewer() {
	const [text, setText] = useState<string>("");

	const mediaInfoRef = useRef<MediaInfo<"text">>();
	const [result, setResult] = useState("");

	const [fileName, setFileName] = useState("");

	useEffect(() => {
		mediaInfoFactory({
			format: "text", // setting output formats
			// full: true,  // setting toggle

			locateFile(path, prefix) {
				if (META_ENV_PROD) {
					return `${path}`;
				}

				return `../../../node_modules/mediainfo.js/dist/${path}`;
			},
		})
			.then((mi) => {
				mediaInfoRef.current = mi;
			})
			.catch((error: unknown) => {
				console.error(error);
			});

		return () => {
			if (mediaInfoRef.current) {
				mediaInfoRef.current.close();
			}
		};
	}, []);

	function OpenFile(et: any) {
		// TODO: create a global file input comp and just use its ID for ref
		const input = document.createElement("input");
		input.type = "file";

		input.onchange = async (e: any) => {
			const file = e.target.files[0];

			if (mediaInfoRef.current) {
				setFileName(file.name);

				mediaInfoRef.current
					.analyzeData(file.size, makeReadChunk(file))
					.then(setResult)
					.catch((error: unknown) => {
						console.error(error);
					});
			}
		};

		input.click();
	}

	return (
		<div {...stylex.props(styles.base)}>
			<div
				{...stylex.props(util_styles.display_block_base)}
				style={{
					minHeight: "4rem",
					height: "fit-content",

					display: "flex",
					flexDirection: "column",
				}}
			>
				<h2>Input File</h2>
				<button
					onClick={OpenFile}
					type="button"
					{...stylex.props(util_styles.button)}
					style={{
						maxWidth: "fit-content",
					}}
				>
					Select File
				</button>

				<p>{fileName}</p>
			</div>

			<div
				style={{
					padding: "0.5rem",
				}}
			/>

			<div
				{...stylex.props(util_styles.display_block_base)}
				style={{
					height: "calc(100% - 5rem)",
				}}
			>
				<h2>File Information</h2>
				<TextareaBlock value={result} setValue={() => {}} onChange={() => {}} />
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is a MediaInfo?</h2>
						<p>
							This is a tool powered by the mediainfo library, that accepts
							various media file types and will output various information about
							them. Including but not limited to the video format audio format
							the meta data of the file and other information appropriate for
							the filetype.
						</p>
					</div>
				</div>
			</FooterHelp>

			<ToolbarHelp>
				<p>test</p>
			</ToolbarHelp>
		</div>
	);
}

export default MediaInfoViewer;
