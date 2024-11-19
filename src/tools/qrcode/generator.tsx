import { useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";

import TextareaBlock from "@src/components/commons/textarea-block";
import FooterHelp from "@src/tools/footer_help";
import ToolbarHelp from "@src/tools/toolbar_help";

import { minify } from "csso";
import MonacoBlock from "@src/components/commons/monaco-block";

import * as faking from "data-faking";
import { Slider } from "@src/components/commons/range";

import QRCode from "qrcode";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";

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

function QRCodeGenerator() {
	const [qrcode, setQRCode] = useState<string>("");

	const [r, setR] = useState<number[]>([33]);

	const [text, setText] = useState<string>("");
	const [decoded, setDecoded] = useState<string>(
		faking.lorem_ipsum_paragraphs(5),
	);

	// useEffect(() => {
	//     QRCode.toDataURL('I am a pony!', {
	//         version: 2,
	//     })
	//         .then(url => {
	//             console.log(url)
	//             setQRCode(url);
	//         })
	//         .catch(err => {
	//             console.error(err)
	//         })
	// }, [text]);

	function onChangeText(e: string): void {
		setText(e);

		QRCode.toDataURL(e, {
			version: 40,
		})
			.then((url) => {
				// console.log(url)
				setQRCode(url);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	return (
		<div {...stylex.props(styles.base)}>
			<div {...stylex.props(styles.flex)}>
				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>Text</h2>

					<MonacoBlock
						value={text}
						setValue={setText}
						onChange={onChangeText}
						defaultLanguage={"text"}
						options={{
							wordWrap: "on",
						}}
					/>
				</div>

				<div {...stylex.props(util_styles.display_block_base)}>
					<h2>QR Code</h2>

					{/* TODO: have download button for this center on grid background like
					component design system */}

					<img src={qrcode} alt="" />
					{/* <MonacoBlock
                        value={text}
                        setValue={setText}
                        onChange={onChangeUrl}
                        defaultLanguage={"css"}
                    /> */}
				</div>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is QR Code Generator?</h2>
						<p>
							This tool generates a QR code for a given string or url. The QR
							code is updated in real time.
						</p>
					</div>
				</div>
			</FooterHelp>

			<ToolbarHelp>
				<p>Settings TODO: https://www.npmjs.com/package/qrcode#options-2</p>

				<p>Range value - {r}</p>
				<Slider
					defaultValue={r}
					onValueChange={(e) => {
						setR(e);
					}}
					max={100}
					step={1}
				/>
			</ToolbarHelp>
		</div>
	);
}

export default QRCodeGenerator;
