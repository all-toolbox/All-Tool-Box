import stylex from "@stylexjs/stylex";

export const snippetStyles = stylex.create({
	wrapper: {
		backgroundColor: "var(--background-100)",
		margin: "1rem",
		borderRadius: "0.25rem",
		padding: "0.25rem 1rem",
	},

	base: {
		height: "100%",
		padding: "1rem",
		boxSizing: "border-box",
	},

	innerFlex: {
		display: "flex",
		flexWrap: "wrap",
		gap: "1rem",
	},
});
