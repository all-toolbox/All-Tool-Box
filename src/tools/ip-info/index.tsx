import React, { useEffect, useState } from "react";
import stylex from "@stylexjs/stylex";
import { publicIpv4 } from "public-ip";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { toast } from "react-toastify";
import FooterHelp from "../footer_help";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";
import ToolbarHelp from "../toolbar_help";

const styles = stylex.create({
	wrapper: {
		width: "100%",
		height: "100%",
		boxSizing: "border-box",
		textAlign: "center",
		display: "flex",
		flexDirection: "column",
	},

	ipBlock: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},

	textLoading: {

	},

	textLoaded: {
		cursor: "pointer",
	},

	textUpper: {

	},

	textLower: {
		cursor: "pointer",
	},
});

export default function IPInfo() {
	const [ipsLoaded, setIPsLoaded] = useState<boolean>(false);
	const [ipv4, setIPv4] = useState<string>("");
	// const [ipv6, setIPv6] = useState<string>('');

	useEffect(() => {
		async function FetchIP() {
			try {
				const ipv4 = await publicIpv4();
				setIPv4(ipv4);
			} catch (e) {
				console.error("An error occurred when trying to fetch IPv4:", e);
			}

			// try {
			//   const ipv6 = await publicIpv6();
			//   setIPv6(ipv6);
			// } catch(e) {
			//   console.error('An error occurred when trying to fetch IPv6:', e);
			// }

			setIPsLoaded(true);
		}
		FetchIP();
	}, []);

	async function copyText(_: React.MouseEvent) {
		if (!ipsLoaded) return;

		await writeText(ipv4);
		toast("Copied to clipboard!");
	}

	let text = "Loading...";
	let upperText = null;
	let lowerText = null;
	if (ipsLoaded) {
		text = ipv4;

		upperText = <h3 {...stylex.props(styles.textUpper)}>Your IP is...</h3>;
		lowerText = (
			<h3
				{...stylex.props(styles.textLower)}
				onClick={copyText}
			>
				Click to copy!
			</h3>
		);
	}

	const titleStyle = ipsLoaded ? styles.textLoaded : styles.textLoading;

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div
				{...stylex.props(
					util_styles.display_block_base,
					util_styles.flexGrow,
					styles.ipBlock,
				)}
			>
				{upperText}
				<h1 {...stylex.props(titleStyle)} onClick={copyText}>
					{text}
				</h1>
				{lowerText}
			</div>
			<ToolbarHelp toolName="IP Info" />
			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is IP Info?</h2>
						<p>Your currently active IPV4 IP address is displayed here.</p>
					</div>
				</div>
			</FooterHelp>
		</div>
	);
}
