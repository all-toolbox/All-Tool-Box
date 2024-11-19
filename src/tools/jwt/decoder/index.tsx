/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

import * as stylex from "@stylexjs/stylex";
import FooterHelp from "@src/tools/footer_help";
import { help_styles } from "@src/components/footer/help/styles";
import ToolbarHelp from "@src/tools/toolbar_help";
import TextareaBlock from "@src/components/commons/textarea-block";
import { util_styles } from "@src/utils/styles";

const styles = stylex.create({
	wrapper: {
		height: "100%",
		//width: "100%",
		gap: "2rem",
		boxSizing: "border-box",
		display: "flex",
		flexDirection: "column",
	},

	block: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
		minHeight: "16rem",
	},
	two_columns: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gap: "2rem",
		flexGrow: 1,
	},
});

// import Navbar from '../../../components/navbar';
// import Sidebar from '../../../components/sidebar';

// TODO: add verify support
// TODO: add encode / sign support
// TODO: probably should support half screen size and lower

// import './index.scss';

function JwtDecoder() {
	const [text, setText] = useState<string>("");

	const [header, setHeader] = useState<string>("");
	const [payload, setPayload] = useState<string>("");

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function onChangeText(e: any): void {
		setText(e.target.value);

		try {
			const h = jwtDecode(e.target.value, { header: true });
			setHeader(JSON.stringify(h, null, 2));

			const p = jwtDecode(e.target.value);
			setPayload(JSON.stringify(p, null, 2));
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div
				{...stylex.props(
					util_styles.display_block_base,
					util_styles.flex_column,
					util_styles.flexGrow,
					styles.block,
				)}
			>
				<h2>JWT String</h2>
				<TextareaBlock
					value={text}
					onChange={onChangeText}
					setValue={setText}
				/>
			</div>
			<div {...stylex.props(styles.two_columns)}>
				<div
					{...stylex.props(
						util_styles.display_block_base,
						util_styles.flex_column,
						styles.block,
					)}
				>
					<h2>Header</h2>
					<TextareaBlock value={header} setValue={setHeader} readOnly={true} />
				</div>
				<div
					{...stylex.props(
						util_styles.display_block_base,
						util_styles.flex_column,
						styles.block,
					)}
				>
					<h2>Payload</h2>
					<TextareaBlock
						value={payload}
						setValue={setPayload}
						readOnly={true}
					/>
				</div>
			</div>
			<ToolbarHelp toolName="JWT Decoder" />
			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<p>What is a JWT decoder?</p>
						<p>
							It can decode, verify, and parse out the header and payload
							information from JWT (JSON Web Token).
						</p>

						<p>How to use JWT Decoder.</p>
						<p>
							Enter the JWT token to be verified. The decoded header and payload
							will be automatically displayed on the two fields on the right. If
							the JWT token is invalid, an error will be presented.
						</p>
					</div>
				</div>
			</FooterHelp>
		</div>
	);
}

export default JwtDecoder;
