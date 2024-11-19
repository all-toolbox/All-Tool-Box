import * as stylex from "@stylexjs/stylex";

export const help_styles = stylex.create({
	base: {
		padding: "1rem",
		width: "100%",
		boxSizing: "border-box",
	},

	block: {
		backgroundColor: "var(--background-200)",
		borderRadius: "0.5rem",
		padding: "1rem",
		width: "100%",
		boxSizing: "border-box",
	},

	link_btn: {
		outline: "none",
		border: "none",
		background: "none",
		color: "var(--color-global-blue)",
		cursor: "pointer",
		padding: 0,
		margin: 0,

		transition: "color var(--transition-speed) ease",

		":hover": {
			color: "var(--color-global-blue-hover)",
		},
	},
});
