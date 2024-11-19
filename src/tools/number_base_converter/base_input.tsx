/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, RefObject } from "react";

import * as stylex from "@stylexjs/stylex";

import TextareaBlock from "@components/commons/textarea-block";

const styles = stylex.create({
	wrapper: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
	},
	label: {
		fontSize: "1em",
		fontWeight: "bold",
		marginTop: "1em",
		marginBottom: "0.25em",
	},
	input: {},
});

interface BaseInputProps {
	label: string;
	onSetValue: (value: string) => void;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	value: string;
}

function BaseInput(props: BaseInputProps) {
	return (
		<div {...stylex.props(styles.wrapper)}>
			<p>{props.label}</p>
			<TextareaBlock
				onChange={props.onChange}
				setValue={props.onSetValue}
				value={props.value}
			/>
		</div>
	);
}

export default BaseInput;
