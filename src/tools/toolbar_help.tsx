import { createPortal } from "react-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { ToolbarReadyData } from "@src/store/toolbar_ready_atom";
import stylex from "@stylexjs/stylex";
import { ReactNode } from "react";

// @ts-ignore
import FavouriteHeart from "@src/assets/svgs/heart.svg?react";
// @ts-ignore
import ShareIcon from "@src/assets/svgs/share-forward-line.svg?react";
// @ts-ignore
import HelpIcon from "@src/assets/svgs/question-line.svg?react";

import { FooterExpandedData } from "@src/store/footer_expanded_atom";
const styles = stylex.create({
	wrapper: {
		height: "100%",
		width: "100%",
		boxSizing: "border-box",
	},

	reset: {
		padding: "1rem",

		margin: 0,
	},

	text_no_overflow: {
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
		overflow: "hidden",
	},

	toolbarOption: {
		display: "flex",
		gap: "0.75rem",

		transition: "background-color var(--transition-speed) ease",
		backgroundColor: {
			default: "none",
			":hover": "var(--hover-200)",
		},

		cursor: "pointer",
		padding: "0.25rem 1rem",
	},

	optionsWrapper: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem",
		paddingBottom: "0.5rem",
	},

	topWrapper: {
		display: "flex",
		flexDirection: "column",
	},

	hr: {
		margin: 0,
		padding: 0,
		borderColor: "var(--border-200)",
	}
});

interface I_ToolbarHelpProps {
	toolName?: string;
	children?: ReactNode;
}

function TopRow({ toolName }: any) {
	const [footerExpanded, setFooterExpanded] = useRecoilState(FooterExpandedData);

	// TODO: need to create footer ref that can call a function from it directly this isn't safe to use
	function ToggleHelp(): void {
		// setFooterExpanded(!footerExpanded);

		// const html_style = document.getElementsByTagName("html")[0].style;

		// if(footerExpanded) {
		// 	html_style.setProperty(
		// 		'--footer-height',
		// 		`1rem`,
		// 	);
		// 	// const h = html_style.getPropertyValue('--footer-height');
		// } else {
		// 	html_style.setProperty(
		// 		'--footer-height',
		// 		`16rem`,
		// 	);
		// }
	}

	return (
		<div {...stylex.props(styles.topWrapper)}>
			<h2
				// TODO bring this out to global style
				// className="text-no-overflow"
				{...stylex.props(styles.reset, styles.text_no_overflow)}
			>
				{toolName}
			</h2>

			<div {...stylex.props(styles.optionsWrapper)}>
				<div {...stylex.props(styles.toolbarOption)}>
					<FavouriteHeart />
					<p>Favourite</p>
				</div>

				{/* <div
					{...stylex.props(styles.toolbarOption)}
					onClick={ToggleHelp}
					role="button"
				>
					<HelpIcon />
					<p>Help</p>
				</div>

				<div {...stylex.props(styles.toolbarOption)}>
					<ShareIcon />
					<p>Share</p>
				</div> */}
			</div>
		</div>
	);
}

function ToolbarHelp({ toolName, children }: I_ToolbarHelpProps) {
	const ToolbarReadyVal = useRecoilValue(ToolbarReadyData);

	return (
		<>
			{ToolbarReadyVal &&
				createPortal(
					<div {...stylex.props(styles.wrapper)}>
						{/* <TopRow
							toolName={toolName}
						/>

						<hr {...stylex.props(styles.hr)} /> */}

						{children}
					</div>,

					// @ts-ignore
					document.getElementById("toolbar_content"),
				)}
		</>
	);
}

export default ToolbarHelp;
