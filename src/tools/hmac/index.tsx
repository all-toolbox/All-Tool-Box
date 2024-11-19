import React, { useEffect, useState } from "react";
import {
	createHMAC,
	createMD4,
	createMD5,
	createSHA1,
	createSHA224,
	createSHA256,
	createSHA512,
} from "hash-wasm";
import TextareaBlock from "@src/components/commons/textarea-block";
import stylex from "@stylexjs/stylex";
import CopyTextBlock from "@src/components/commons/copy-text-block";
import ToolbarHelp from "../toolbar_help";
import FooterHelp from "../footer_help";
import { help_styles } from "@src/components/footer/help/styles";
import Input from "@src/components/commons/input";
import { util_styles } from "@src/utils/styles";

const styles = stylex.create({
	outputsBlock: {
		display: "flex",
		flexDirection: "column",
		padding: "0.5rem",
		maxWidth: "100%",
		height: "100%",
	},

	twoColumn: {
		display: "flex",
		gap: "1rem",
		height: "100%",
	},
	wrapper: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "100%",
		gap: "2rem",
		boxSizing: "border-box",
		overflow: "auto",
	},

	textBox: {},
	displayBlock: {
		display: "flex",
		gap: "1rem",
		flexDirection: "column",
	},

	inputBlock: {
		display: "flex",
		flexDirection: "column",
		height: "100%",
		width: "100%",
		boxSizing: "border-box",
		gap: "1rem",
		minHeight: "16rem",
	},
	outputCard: {
		display: "flex",
		flexDirection: "column",
		//backgroundColor: "var(--navbar-color-bg)",
		width: "100%",
		height: "100%",
		padding: "1rem",
		boxSizing: "border-box",
		gap: "1rem",
	},
});
export default function HmacGenerator() {
	const [text, setText] = useState<string>("Hello, world!");
	const [key, setKey] = useState("your_secret_key");
	const [md4Text, setMd4Text] = useState<string>("");
	const [md5Text, setMd5Text] = useState<string>("");
	const [sha1Text, setSha1Text] = useState<string>("");
	const [sha224Text, setSha224Text] = useState<string>("");
	const [sha256Text, setSha256Text] = useState<string>("");
	const [sha512Text, setSha512Text] = useState<string>("");

	const generateMD5HMAC = async () => {
		const hashFunc = createMD5();
		const hmac = await createHMAC(hashFunc, key);

		hmac.init();
		hmac.update(text);
		const hmacValue = hmac.digest("hex"); // Convert to hex string for display

		setMd5Text(hmacValue);
	};

	const generateMD4HMAC = async () => {
		const hashFunc = createMD4();
		const hmac = await createHMAC(hashFunc, key);

		hmac.init();
		hmac.update(text);
		const hmacValue = hmac.digest("hex"); // Convert to hex string for display

		setMd4Text(hmacValue);
	};

	const generateSHA1HMAC = async () => {
		const hashFunc = createSHA1();
		const hmac = await createHMAC(hashFunc, key);

		hmac.init();
		hmac.update(text);
		const hmacValue = hmac.digest("hex"); // Convert to hex string for display

		setSha1Text(hmacValue);
	};
	const generateSHA224HMAC = async () => {
		const hashFunc = createSHA224();
		const hmac = await createHMAC(hashFunc, key);

		hmac.init();
		hmac.update(text);
		const hmacValue = hmac.digest("hex"); // Convert to hex string for display

		setSha224Text(hmacValue);
	};

	const generateSHA256HMAC = async () => {
		const hashFunc = createSHA256();
		const hmac = await createHMAC(hashFunc, key);

		hmac.init();
		hmac.update(text);
		const hmacValue = hmac.digest("hex"); // Convert to hex string for display

		setSha256Text(hmacValue);
	};
	const generateSHA512HMAC = async () => {
		const hashFunc = createSHA512();
		const hmac = await createHMAC(hashFunc, key);

		hmac.init();
		hmac.update(text);
		const hmacValue = hmac.digest("hex"); // Convert to hex string for display

		setSha512Text(hmacValue);
	};

	useEffect(() => {
		generateMD5HMAC();
		generateMD4HMAC();
		generateSHA1HMAC();
		generateSHA224HMAC();
		generateSHA256HMAC();
		generateSHA512HMAC();
	});

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div {...stylex.props(styles.twoColumn)}>
				<div
					{...stylex.props(styles.inputBlock, util_styles.display_block_base)}
				>
					<h2>Key</h2>
					<TextareaBlock
						value={key}
						setValue={setKey}
						onChange={(e) => setKey(e.target.value)}
						{...stylex.props(styles.textBox)}
					/>
				</div>
				<div
					{...stylex.props(styles.inputBlock, util_styles.display_block_base)}
				>
					<h2>Text</h2>
					<TextareaBlock
						value={text}
						setValue={setText}
						onChange={(e) => setText(e.target.value)}
						{...stylex.props(styles.textBox)}
					/>
				</div>
			</div>
			<div
				{...stylex.props(styles.displayBlock, util_styles.display_block_base)}
			>
				<h2>Output</h2>
				<div>
					MD4:
					{/* <OutputDisplayBlock text={md4Text} /> */}
					<CopyTextBlock text={md4Text} />
				</div>
				<div>
					MD5:
					<CopyTextBlock text={md5Text} />
				</div>
				<div>
					SHA1:
					<CopyTextBlock text={sha1Text} />
				</div>
				<div>
					SHA224:
					<CopyTextBlock text={sha224Text} />
				</div>
				<div>
					SHA256:
					<CopyTextBlock text={sha256Text} />
				</div>
				<div>
					SHA512:
					<CopyTextBlock text={sha512Text} />
				</div>
			</div>

			<ToolbarHelp toolName="HMAC Generator"></ToolbarHelp>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<p>What is a HMAC Generator?</p>
						<p>
							This is a tool that converts a raw string input using a secret
							passpharse into common hash algorithms.
						</p>

						<p>How to use HMAC Generator</p>
						<p>
							Type the string you want encoded in the top editor and type your
							secret key in the bottom editor. The resulting hashs will be
							displayed in the toolbar on the right automatically.
						</p>
					</div>

					<br />
				</div>
			</FooterHelp>
		</div>
	);
}
