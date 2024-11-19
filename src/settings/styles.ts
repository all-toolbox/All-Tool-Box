import stylex from "@stylexjs/stylex";

export const styles = stylex.create({
	wrapper: {
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		padding: "1rem",
		boxSizing: "border-box",

		alignItems: "center",
	},

	settingsBlock: {
		maxWidth: "35%",
		height: "fit-content",
		display: "flex",
		flexDirection: "column",
		gap: "2rem",
	},

	title: {
		textAlign: "center",
		fontSize: "3rem",
	},

	labelSetting: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem",
	},
});
