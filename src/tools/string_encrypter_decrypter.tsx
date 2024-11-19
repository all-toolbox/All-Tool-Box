import { useState } from "react";

import * as stylex from "@stylexjs/stylex";

import MonacoBlock from "@src/components/commons/monaco-block";
import FooterHelp from "./footer_help";
import ToolbarHelp from "./toolbar_help";

import Cryptr from "cryptr";
import CustomSelect from "@src/components/commons/select";
import { util_styles } from "@src/utils/styles";

interface Option {
	value: string;
	label: string;
}
const options = [
	{ value: "hex", label: "hex" },
	// { value: "utf8", label: "utf8" },
	// { value: "utf16le", label: "utf16le" },
	{ value: "latin1", label: "latin1" },
	{ value: "base64", label: "base64" },
	// { value: "base64url", label: "base64url" },
];

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
});

function StringEncrypterDecrypter() {
	const [encoded, setEncoded] = useState<string>("");
	const [decoded, setDecoded] = useState<string>("");

	const [secret, setSecret] = useState<string>("secret");
	const [saltLength, setSaltLength] = useState<number>(64);
	const [pbkdf2Iterations, setPbkdf2Iterations] = useState<number>(10000);
	const [selectedOption, setSelectedOption] = useState(options[0].value);

	// TODO: need an encrypt button to press this is wayyyy too slow for direct feedback
	// const []
	const cryptr = new Cryptr(secret, {
		// @ts-ignore
		encoding: selectedOption,
		pbkdf2Iterations: pbkdf2Iterations,
		saltLength: saltLength,
	});

	function onChangeEncoded(value: string): void {
		setEncoded(value);

		try {
			setDecoded(cryptr.decrypt(value));
		} catch (e) {
			setDecoded("Invalid base 64 string");
		}
	}

	function onChangeDecoded(value: string): void {
		setDecoded(value);
		setEncoded(cryptr.encrypt(value));
	}

	function handleChange(selectedOption: Option) {
		setSelectedOption(selectedOption.value);
	}

	return (
		<div {...stylex.props(styles.base)}>
			<div {...stylex.props(styles.flex)}>
				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>Decoded</h2>

					<MonacoBlock
						value={decoded}
						setValue={setDecoded}
						onChange={onChangeDecoded}
						defaultLanguage={"text"}
					/>
				</div>

				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>Encoded</h2>

					<MonacoBlock
						value={encoded}
						setValue={setEncoded}
						onChange={onChangeEncoded}
						defaultLanguage={"text"}
					/>
				</div>
			</div>

			<FooterHelp>
				<div>
					<p>This child is placed in the document body.</p>
				</div>
			</FooterHelp>

			<ToolbarHelp>
				<p>Settings</p>

				<input
					type="text"
					placeholder="secret"
					value={secret}
					onChange={(e) => {
						setSecret(e.target.value);
					}}
				/>

				<input
					type="number"
					placeholder="pbkd2iteraions"
					value={pbkdf2Iterations}
					onChange={(e) => {
						setPbkdf2Iterations(parseInt(e.target.value));
					}}
				/>

				<input
					type="number"
					placeholder="salt length"
					value={saltLength}
					onChange={(e) => {
						setSaltLength(parseInt(e.target.value));
					}}
				/>

				<CustomSelect
					options={options}
					// @ts-ignore
					value={selectedOption}
					onChange={handleChange}
				/>
			</ToolbarHelp>
		</div>
	);
}

export default StringEncrypterDecrypter;
