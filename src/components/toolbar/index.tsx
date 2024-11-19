import { useEffect, useRef, useState } from "react";

import * as stylex from "@stylexjs/stylex";
import { LeftToolbar, ExpandedTab } from "./left-toolbar.tsx";
import { RightToolbar } from "./right-toolbar.tsx";
import { useSetRecoilState } from "recoil";
import { ToolbarReadyData } from "@src/store/toolbar_ready_atom.ts";

const styles = stylex.create({
	wrapper: {
		height: "100%",
		width: "var(--toolbar-width)",

		backgroundColor: "var(--toolbar-bg)",
		position: "relative",
		borderLeft: "0.0625rem solid var(--color-border)",
	},

	sidebar: {
		height: "100%",
		width: "100%",

		backgroundColor: "var(--toolbar-bg)",
		overflow: "auto",
	},

	resizeHandle: {
		zIndex: 10,
		height: "100%",
		backgroundColor: "transparent",
		width: "0.25rem",
		cursor: "col-resize",
		position: "absolute",
		left: "-0.125rem",
		":hover": {
			backgroundColor: "var(--resizer-color)",
		},
	},

	resizeHandleActive: {
		backgroundColor: "var(--resizer-color)",
	},
});

const MIN_EXPANDED_WIDTH = 16 * 20;
const MIN_EXPANDED_THRESHOLD = MIN_EXPANDED_WIDTH / 2;

function Toolbar() {
	const setToolbarReadyAtom = useSetRecoilState(ToolbarReadyData);

	useEffect(() => {
		setToolbarReadyAtom(true);

		return () => {
			setToolbarReadyAtom(false);
		};
	}, []);

	// TODO: need to move this to context or local atom to avoid prop drilling
	const [expandedTab, setExpandedTab] = useState<ExpandedTab | null>(
		"documentation",
	);
	const prevExpandedTab = useRef<ExpandedTab | null>(null);
	const prevIsExpanded = useRef<boolean>(false);

	const html_style = document.getElementsByTagName("html")[0].style;
	const body = document.getElementsByTagName("body")[0];
	const resizerRef = useRef<HTMLDListElement | null>(null);
	const [resizeInProgress, setResizeInProgress] = useState<boolean>(false);

	useEffect(() => {
		if (resizerRef.current) {
			resizerRef.current.addEventListener("mousedown", (event) => {
				setResizeInProgress(true);
				html_style.cursor = "col-resize";

				// @ts-ignore
				document.body.style["-webkit-user-select"] = "none";
				document.addEventListener("mousemove", resize, false);
				document.addEventListener(
					"mouseup",
					() => {
						setResizeInProgress(false);
						html_style.cursor = "inherit";

						document.removeEventListener("mousemove", resize, false);
						// @ts-ignore
						document.body.style["-webkit-user-select"] = "auto";
					},
					false,
				);
			});
		}
	}, []);

	useEffect(() => {
		if (expandedTab) {
			prevExpandedTab.current = expandedTab;
			if (!prevIsExpanded.current) {
				html_style.setProperty("--toolbar-width", `${MIN_EXPANDED_WIDTH}px`);
			}
		}
		prevIsExpanded.current = !!expandedTab;
	}, [expandedTab]);

	// @ts-ignore
	function resize(e) {
		e.preventDefault();
		// const size = e.x;
		const size = body.clientWidth - e.x;

		if (!resizerRef.current) return;
		let curSize = size;
		if (curSize < MIN_EXPANDED_WIDTH && size >= MIN_EXPANDED_THRESHOLD) {
			setExpandedTab(prevExpandedTab.current || "documentation");
			curSize = MIN_EXPANDED_WIDTH;
		} else if (size <= MIN_EXPANDED_THRESHOLD) {
			// setExpandedTab(null);
			// curSize = 16 * 2.25;
			curSize = MIN_EXPANDED_WIDTH;
		}
		// console.log(size);
		html_style.setProperty("--toolbar-width", `${Math.min(curSize, 600)}px`);
	}

	// const closeTab = () => {
	// 	// setExpandedTab(null);
	// 	// html_style.setProperty(
	// 	//     '--toolbar-width',
	// 	//     `${16 * 2.25}px`,
	// 	// );
	// };

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div
				// @ts-ignore
				ref={resizerRef}
				{...stylex.props(
					styles.resizeHandle,
					resizeInProgress && styles.resizeHandleActive,
				)}
			/>

			<div {...stylex.props(styles.sidebar)}>
				{/* <LeftToolbar expandedTab={expandedTab} setExpandedTab={setExpandedTab} /> */}
				{/* <RightToolbar expandedTab={expandedTab} onClose={closeTab} /> */}

				{/* TODO: make this a const that everything uses */}
				<div id="toolbar_content" />
			</div>
		</div>
	);
}

export default Toolbar;
