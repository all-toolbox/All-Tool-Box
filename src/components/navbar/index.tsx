// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import icon from "@assets/icons/32x32.png";
import * as stylex from "@stylexjs/stylex";
import { open } from "@tauri-apps/plugin-shell";

// @ts-ignore
// import { Avatar } from "@controlkit/Avatar";
import toolsIcon from "@assets/svgs/tools.svg";
import snippetIcon from "@assets/svgs/code.svg";
import sheetsIcon from "@assets/svgs/papers.svg";
import hamburgerMenu from "@assets/svgs/hamburger-menu.svg";
import leftArrow from "@assets/svgs/left-arrow.svg";
import rightArrow from "@assets/svgs/right-arrow.svg";
import settingGear from "@assets/svgs/setting-gear.svg";
import searchIcon from "@assets/svgs/search.svg";

// @ts-ignore
import GithubSVG from "@assets/github.svg";

import { Window, currentMonitor } from "@tauri-apps/api/window";
// @ts-ignore
import MinimizeSVG from "@assets/mdi_window-minimize.svg?react";
// @ts-ignore
import MaximizeSVG from "@assets/mdi_window-maximize.svg?react";
// @ts-ignore
import CloseSVG from "@assets/mdi_close.svg?react";

import { platform } from "@tauri-apps/plugin-os";
import StrongholdHelper from "./stronghold";
import NavSearch from "./search";

const styles = stylex.create({
	wrapper: {
		display: "flex",
		width: "100%",
		gap: "1rem",
		padding: "0.5rem 1rem 0.5rem 0.25rem",
		boxSizing: "border-box",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "var(--navbar-color-bg)",
		borderBottom: "1px solid var(--color-border)",
	},

	link: {
		cursor: "pointer",
		transition: "color var(--transition-speed) ease",
		color: {
			default: "var(--text-300)",
			":hover": "var(--text-100)",
		},
	},

	link_wrap: {
		display: "flex",
		alignItems: "center",
		padding: "0.25rem 0.375rem",
		borderRadius: "0.25rem",
		transition: "background-color var(--transition-speed) ease",
	},

	link_active: {
		backgroundColor: "var(--navbar-color-bg)",
		color: "var(--text-100)",
	},

	link_text: {},
	icon: {
		display: "flex",
	},
	nav_pill: {
		display: "flex",
		gap: "0.25rem",
		backgroundColor: "var(--navbar-color-secondary)",
		borderRadius: "0.25rem",
		padding: "0.25rem 0.5rem",
	},

	nav_button: {
		padding: "0.25rem 0.5rem",
		backgroundColor: "transparent",
		outline: "unset",
		boxShadow: "unset",
		border: "unset",
		cursor: "pointer",

		display: "flex",
		alignItems: "center",

		":hover": {
			backgroundColor: "var(--navbar-border)",
			borderRadius: "0.25rem",
		},
	},

	nav_group: {
		display: "flex",
		gap: "0.5rem",
		alignItems: "center",
		padding: "0.25rem 0.5rem",
	},

	right_section: {
		display: "flex",
		gap: "1rem",
	},
});

const window_styles = stylex.create({
	btn: {
		backgroundColor: "var(--navbar-color-bg)",
		width: "3rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",

		transition: "background-color var(--transition-speed) ease",

		":hover": {
			backgroundColor: "var(--navbar-color-bg-hover)",
		},
	},

	close_btn: {
		":hover": {
			backgroundColor: "red !important",
		},
	},
});

type T_NavRoutes = "Tools" | "Snippets" | "Cheatsheets" | "Settings";

interface I_NavLinkProps {
	to: string;
	title: T_NavRoutes;
	active: boolean;
	setCurRoute: (arg: T_NavRoutes) => void;
	Img?: ReactElement;
}

function NavLink(props: I_NavLinkProps) {
	return (
		<Link
			{...stylex.props(styles.link)}
			to={props.to}
			onClick={() => {
				props.setCurRoute(props.title);
			}}
		>
			<div
				{...stylex.props(styles.link_wrap, props.active && styles.link_active)}
			>
				{props.Img}

				<p
					{...stylex.props(
						styles.link_text,
						props.active && styles.link_active,
					)}
				>
					{props.title}
				</p>
			</div>
		</Link>
	);
}

interface I_NavButtonProps {
	children: ReactNode;
}
function NavButton({ children }: I_NavButtonProps) {
	return (
		<button {...stylex.props(styles.nav_button)} type="button">
			{children}
		</button>
	);
}

const appWindow = new Window("main");

function Navbar() {
	const [curRoute, setCurRoute] = useState<T_NavRoutes>("Tools");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [currentPlatform, setCurrentPlatform] = useState<string>("macosx");

	useEffect(() => {
		GetPlat();
	}, []);

	async function GetPlat() {
		const currentPlatform = await platform();
		setCurrentPlatform(currentPlatform);
	}

	useEffect(() => {
		document
			.getElementById("titlebar-minimize")
			?.addEventListener("click", () => appWindow.minimize());

		document
			.getElementById("titlebar-maximize")
			?.addEventListener("click", () => appWindow.toggleMaximize());

		document
			.getElementById("titlebar-close")
			?.addEventListener("click", () => appWindow.close());
	}, [currentPlatform]);

	return (
		<div
			style={{
				display: "flex",
			}}
		>
			<div data-tauri-drag-region {...stylex.props(styles.wrapper)}>
				<div {...stylex.props(styles.nav_group)}>
					<Link to="/" {...stylex.props(styles.icon)}>
						<img width="32" alt="icon" src={icon} />
					</Link>

					{/* <NavButton>
          <img src={hamburgerMenu} alt="menu" />
        </NavButton>
        <NavButton>
          <img src={leftArrow} alt="menu" />
        </NavButton>
        <NavButton>
          <img src={rightArrow} alt="menu" />
        </NavButton> */}
					<NavSearch />
				</div>

				<div {...stylex.props(styles.nav_pill)}>
					<NavLink
						to="/"
						title="Tools"
						active={curRoute === "Tools"}
						setCurRoute={setCurRoute}
					/>

					<NavLink
						to="/snippets"
						title="Snippets"
						active={curRoute === "Snippets"}
						setCurRoute={setCurRoute}
					/>

					<NavLink
						to="/cheatsheets"
						title="Cheatsheets"
						active={curRoute === "Cheatsheets"}
						setCurRoute={setCurRoute}
					/>
				</div>

				<div {...stylex.props(styles.right_section)}>
					{/* <NavButton>
						<Link to="/settings">
							<img src={settingGear} alt="settings" width={"24px"} />
						</Link>
					</NavButton> */}

					<div>
						<NavButton>
							<div
							role="button"
							onClick={async () => {
								await open(
									"https://www.github.com/all-toolbox/All-Tool-Box",
								);
							}}
							>
								<img src={GithubSVG} alt="github" width={"24px"} />
							</div>
						</NavButton>


						<StrongholdHelper />
						{/* <div
							{...stylex.props(styles.nav_pill)}
						>
							<div
								{...stylex.props(styles.link_text, styles.link)}
							>
								<StrongholdHelper />
							</div>
						</div> */}
					</div>
				</div>
			</div>

			{(currentPlatform === "windows" || currentPlatform === "linux") && (
				<div
					style={{
						display: "flex",
						borderBottom: "1px solid var(--color-border)",
					}}
				>
					<div
						className="titlebar-button"
						id="titlebar-minimize"
						{...stylex.props(window_styles.btn)}
					>
						<MinimizeSVG />
					</div>

					<div
						className="titlebar-button"
						id="titlebar-maximize"
						{...stylex.props(window_styles.btn)}
					>
						<MaximizeSVG />
					</div>

					<div
						className="titlebar-button"
						id="titlebar-close"
						{...stylex.props(window_styles.btn, window_styles.close_btn)}
					>
						<CloseSVG />
					</div>
				</div>
			)}
		</div>
	);
}

export default Navbar;
