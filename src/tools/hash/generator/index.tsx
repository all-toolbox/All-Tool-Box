import { useEffect, useRef, useState } from "react";

import * as stylex from "@stylexjs/stylex";
import "./styles";
import { md4, md5, sha1, sha224, sha256, sha512 } from "hash-wasm";
import TextareaBlock from "@src/components/commons/textarea-block";
import FooterHelp from "@src/tools/footer_help";
import { help_styles } from "@src/components/footer/help/styles";
import ToolbarHelp from "@src/tools/toolbar_help";
import { styles } from "./styles";
import CopyTextBlock from "@src/components/commons/copy-text-block";

function HashGenerator() {
	const [text, setText] = useState<string>("Hello, world!");

	const [md4Text, setMd4Text] = useState<string>("");
	const [md5Text, setMd5Text] = useState<string>("");
	const [sha1Text, setSha1Text] = useState<string>("");
	const [sha224Text, setSha224Text] = useState<string>("");
	const [sha256Text, setSha256Text] = useState<string>("");
	const [sha512Text, setSha512Text] = useState<string>("");

	useEffect(() => {
		md4(text)
			.then((res: string) => {
				setMd4Text(res);
			})
			.catch((err) => {
				console.error("Failed md4 - ", err);
			});

		md5(text)
			.then((res: string) => {
				setMd5Text(res);
			})
			.catch((err) => {
				console.error("Failed md5 - ", err);
			});

		sha1(text)
			.then((res: string) => {
				setSha1Text(res);
			})
			.catch((err) => {
				console.error("Failed md5 - ", err);
			});

		sha224(text)
			.then((res: string) => {
				setSha224Text(res);
			})
			.catch((err) => {
				console.error("Failed md5 - ", err);
			});

		sha256(text)
			.then((res: string) => {
				setSha256Text(res);
			})
			.catch((err) => {
				console.error("Failed md5 - ", err);
			});

		sha512(text)
			.then((res: string) => {
				setSha512Text(res);
			})
			.catch((err) => {
				console.error("Failed md5 - ", err);
			});
	}, [text]);

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div {...stylex.props(styles.displayBlock)}>
				<h2>Inputs</h2>
				<TextareaBlock
					value={text}
					setValue={setText}
					onChange={(e) => {
						setText(e.target.value);
					}}
				/>
			</div>

			<div {...stylex.props(styles.displayBlock)}>
				<h2>Outputs</h2>
				<div>
					<p>MD4 Hash</p>
					<CopyTextBlock text={md4Text} />
				</div>

				<div>
					<p>MD5 Hash</p>
					<CopyTextBlock text={md5Text} />
				</div>

				<div>
					<p>SHA1 Hash</p>
					<CopyTextBlock text={sha1Text} />
				</div>

				<div>
					<p>SHA224 Hash</p>
					<CopyTextBlock text={sha224Text} />
				</div>

				<div>
					<p>SHA256 Hash</p>
					<CopyTextBlock text={sha256Text} />
				</div>

				<div>
					<p>SHA512 Hash</p>
					<CopyTextBlock text={sha512Text} />
				</div>
			</div>

			<ToolbarHelp toolName="Hash Generator"></ToolbarHelp>
			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is a Hash Generator?</h2>
						<p>
							This is a tool that converts a raw string input into various
							different hashed formats.
						</p>

						<h2>How to use Hash Generator</h2>
						<p>
							Type the string you want hashed in the editor on the left and the
							hashes will automatically be generated.
						</p>
					</div>

					<br />
				</div>
			</FooterHelp>
		</div>
	);
}

export default HashGenerator;
