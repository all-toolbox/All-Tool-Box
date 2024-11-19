import stylex, { StyleXStyles } from "@stylexjs/stylex";
import React, { ComponentPropsWithoutRef } from "react";
const styles = stylex.create({
	input: {
		boxSizing: "border-box",
		padding: "0.5rem 0.5rem",
		backgroundColor: "var(--color-bg)",
		outline: "none",
		border: "1px solid var(--color-border)",
		borderRadius: "0.25rem",
		color: "var(--color-text)",
		transition: "border 0.5s ease ",
		":focus": {
			border: "1px solid lightgray",
		},
		width: "100%",
	},
});
interface I_InputProps extends ComponentPropsWithoutRef<"input"> {
	styleX?: StyleXStyles;
}
export default function Input({ styleX, ...rest }: I_InputProps) {
	return <input {...rest} {...stylex.props(styles.input, styleX)} />;
}
