import stylex from "@stylexjs/stylex";

export const util_styles = stylex.create({
	display_block_base: {
		backgroundColor: "var(--background-100)",
		borderRadius: "0.25rem",
		padding: "1rem",
		border: "1px solid var(--border-100)",
		boxSizing: "border-box",
		width: "100%",
	},

	display_block_title: {
		fontSize: "1.5rem",
		fontWeight: "bolder",
		paddingTop: "0.5rem",
		paddingBottom: "0.5rem",
		margin: "0",
	},
	flex_column: {
		display: "flex",
		flexDirection: "column",
	},

	flexGrow: {
		flexGrow: 1,
	},

	test_reset: {
		padding: 0,
		margin: 0,
	},

	button: {
		backgroundColor: {
			default: "var(--background-200)",
		},

		borderRadius: "0.25rem",
		padding: "0.5rem",

		border: {
			default: "1px solid var(--border-100)",
			":hover": "1px solid var(--hover-100)",
		},

		color: "var(--text-100)",
		transition: "background-color, border var(--transition-speed) ease-in-out",
		cursor: "pointer",
		display: "flex",
		alignItems: "center",
		gap: "0.5rem",
	},
});
