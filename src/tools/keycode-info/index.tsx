import { useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import FooterHelp from "../footer_help";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";
import CardBanner from "@src/components/commons/card-banner";

const styles = stylex.create({
	base: {
		boxSizing: "border-box",
		justifyContent: "center",
		alignItems: "center",
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
		height: "100%",
		overflow: "auto",
	},

	press_key: {
		padding: "1rem",
		background: "var(--color-bg)",
		fontWeight: "bold",
		width: "100%",
		fontSize: "1.25rem",

		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},

	main_text: {
		display: "flex",
		justifyContent: "center",
		fontSize: "5rem",
		height: "10rem",
		alignItems: "center",
		marginBottom: "4rem",
	},

	info_block_wrap: {
		display: "flex",
		rowGap: "2rem",
		columnGap: "3rem",
		flexWrap: "wrap",
		justifyContent: "center",
		width: "80%",
		margin: "0 auto",
	},

	ib_wrapper: {
		maxWidth: "12rem",
		alignItems: "center",
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem",
	},

	ib_title: {
		color: "var(--color-text)",
		fontSize: "1.25rem",
		textTransform: "capitalize",
	},

	ib_inner_wrap: {
		backgroundColor: "var(--color-bg)",
		border: "0.0625rem solid var(--color-border)",
		padding: "1rem",
		borderRadius: "0.25rem",
		width: "12rem",
		display: "flex",
	},
});

interface I_InfoBlockProps {
	title: string;
	value: string | undefined;
}

function InfoBlock(props: I_InfoBlockProps) {
	return (
		<div {...stylex.props(styles.ib_wrapper)}>
			<p {...stylex.props(styles.ib_title)}>{props.title}</p>

			<div {...stylex.props(styles.ib_inner_wrap)}>
				<p>{props.value}</p>
			</div>
		</div>
	);
}

function KeycodeInfo() {
	const [keyCode, setKeyCode] = useState();

	const [key, setKey] = useState<any>();
	const [code, setCode] = useState<any>();
	const [location, setLocation] = useState<string>();
	const [which, setWhich] = useState<any>();
	// const [charCode, setCharCode] = useState();

	const [control, setControl] = useState<any>();
	const [alt, setAlt] = useState<any>();
	const [shift, setShift] = useState<any>();
	const [meta, setMeta] = useState<any>();

	useEffect(() => {
		document.addEventListener("keydown", Test);

		return () => {
			document.removeEventListener("keydown", Test);
		};
	}, []);

	function Test(e: any): void {
		e.preventDefault();

		console.log(e);

		setKeyCode(e.keyCode);
		setKey(e.key);
		setCode(e.code);

		switch (e.location) {
			case 0:
				setLocation("0 - General keys");
				break;
			case 1:
				setLocation("1 - Left side modifier keys");
				break;
			case 2:
				setLocation("2 - Right side modifier keys");
				break;
		}
		setWhich(e.which);
		// setCharCode(e.charCode);

		setControl(e.ctrlKey);
		setAlt(e.altKey);
		setShift(e.shiftKey);
		setMeta(e.metaKey);
	}

	return (
		<div {...stylex.props(styles.base)}>
			<div
				{...stylex.props(util_styles.display_block_base)}
				style={{
					height: "100%",
					width: "100%",

					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{keyCode ? (
					<>
						<div {...stylex.props(styles.main_text)}>
							{key} - {which}
						</div>

						<div {...stylex.props(styles.info_block_wrap)}>
							<InfoBlock title="key" value={key} />
							<InfoBlock title="code" value={code} />
							<InfoBlock title="location" value={location} />
							<InfoBlock title="which" value={which} />
							{/* <div>charCode - {charCode}</div> */}

							<InfoBlock title="control" value={control ? "true" : "false"} />
							<InfoBlock title="alt" value={alt ? "true" : "false"} />
							<InfoBlock title="shift" value={shift ? "true" : "false"} />
							<InfoBlock title="meta" value={meta ? "true" : "false"} />
						</div>
					</>
				) : (
					<div>
						<h2>Press any key to get the Javascript event keycode.</h2>
					</div>
				)}
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is Keycode Info?</h2>
						<p>
							This is a micro tool that displays javascript keycode information
							for a given key combination for (ex "Ctrl-A" = Control true and
							keycode number 65).
						</p>
					</div>
				</div>
			</FooterHelp>
		</div>
	);
}

export default KeycodeInfo;
