import {
	useEffect,
	useRef, useState,
} from 'react';

import * as stylex from '@stylexjs/stylex';
import { SidebarRail, SidebarTab } from "./sidebar-rail.tsx";
import { SidebarContent } from "./sidebar-content.tsx";

const styles = stylex.create({
	wrapper: {
		height: '100%',
		width: 'var(--sidebar-width)',
		position: "fixed",

		backgroundColor: 'var(--sidebar-bg)',

		borderRight: "0.0625rem solid var(--color-border)",
		zIndex: 1,
	},

	sidebar: {
		height: 'calc(100% - 4rem)',
		width: '100%',

		backgroundColor: 'var(--sidebar-bg)',
		overflow: "auto",

		display: "grid",
		gridTemplateColumns: "var(--sidebar-fixed-width) 1fr",
	},

	resizeHandle: {
		zIndex: 10,
		height: "100%",
		backgroundColor: "transparent",
		position: "absolute",
		width: "0.25rem",
		right: "-0.125rem",
		top: 0,
		cursor: 'col-resize',
		':hover': {
			backgroundColor: "var(--resizer-color)",
		}
	},

	resizeHandleActive: {
		backgroundColor: "var(--resizer-color)",
	},
});

const MIN_WIDTH = 16 * 2.25;
const MIN_EXPANDED_WIDTH = 16 * 20;
const MAX_EXPANDED_WIDTH = 16 * 40;
const MIN_EXPANDED_THRESHOLD = MIN_EXPANDED_WIDTH / 2;

function Sidebar() {
	const [selectedTab, setSelectedTab] = useState<SidebarTab | null>("favorites");
	const prevSelectedTab = useRef<SidebarTab | null>(null);
	const prevSelectedState = useRef<boolean>(false);
	const html_style = document.getElementsByTagName("html")[0].style;
	const resizerRef = useRef<HTMLDListElement | null>(null);
	const [resizeInProgress, setResizeInProgress] = useState<boolean>(false);

	useEffect(() => {
		if (resizerRef.current) {
			resizerRef.current.addEventListener("mousedown", (event) => {
				setResizeInProgress(true);
				html_style.cursor = 'col-resize';

				// @ts-ignore
				document.body.style['-webkit-user-select'] = "none";
				document.addEventListener("mousemove", resize, false);
				document.addEventListener("mouseup", () => {
					setResizeInProgress(false);
					html_style.cursor = 'inherit';

					document.removeEventListener("mousemove", resize, false);
					// @ts-ignore
					document.body.style['-webkit-user-select'] = "auto";
				}, false);
			});
		}
	}, []);

	useEffect(() => {
		if (selectedTab) {
			if (!prevSelectedState.current) {
				html_style.setProperty(
					// TODO: move these values out into a constants file instead
					'--sidebar-width',
					`${MIN_EXPANDED_WIDTH}px`,
				);
			}
			prevSelectedTab.current = selectedTab;
		}
		prevSelectedState.current = !!selectedTab;
	}, [selectedTab]);

	// @ts-ignore
	function resize(e) {
		e.preventDefault();
		if (!resizerRef.current) return;
		const size = e.x;
		let curSize = size;
		if (curSize < MIN_EXPANDED_WIDTH && curSize > MIN_EXPANDED_THRESHOLD) {
			curSize = MIN_EXPANDED_WIDTH;
			setSelectedTab(prevSelectedTab.current || 'favorites');
		} else if (curSize <= MIN_EXPANDED_THRESHOLD) {
			curSize = MIN_WIDTH;
			setSelectedTab(null);
		}

		html_style.setProperty(
			// TODO: move these values out into a constants file instead
			'--sidebar-width',
			`${Math.min(curSize, MAX_EXPANDED_WIDTH)}px`,
		);
	}

	return (
		<div
			{...stylex.props(styles.wrapper)}
		>
			<div
				{...stylex.props(styles.sidebar)}
			>
				<SidebarRail selectedTab={selectedTab} onSelectTab={setSelectedTab} />
				<SidebarContent selectedTab={selectedTab} />
			</div>

			<div
				// @ts-ignore
				ref={resizerRef}
				{...stylex.props(styles.resizeHandle, (
					resizeInProgress && styles.resizeHandleActive
				))}
			/>
		</div>
	);
}

export default Sidebar;
