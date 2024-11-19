import stylex from "@stylexjs/stylex";

export const card_banner_styles = stylex.create({
	base: {
		minHeight: "6.5rem",
		maxHeight: "6.5rem",
		display: "flex",
		boxSizing: "border-box",
		width: "100%",
		height: "100%",
		gap: "1rem",
		borderRadius: "0.25rem",
	},

	title: {
		fontSize: "1.5rem",
		fontWeight: "bolder",
		padding: "0.5rem 0",
		margin: "0",
	},

	description: {
		color: "var(--color-text-sub)",
	},

	buttons_block: {
		display: "flex",
		gap: "1rem",
		marginLeft: "auto",
		height: "2.5rem",
		alignSelf: "center",
	},
});
