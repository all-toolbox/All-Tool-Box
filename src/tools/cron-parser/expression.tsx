import React, { ChangeEvent } from "react";
import * as stylex from "@stylexjs/stylex";
import cronstrue from "cronstrue";
import cronparser from "cron-parser";
import { util_styles } from "@src/utils/styles";
import Input from "@src/components/commons/input";

const styles = stylex.create({
	wrapper: {},
	title: {
		marginTop: "0.5rem",
		marginBottom: "0.5rem",
	},
	content: {
		textAlign: "center",
		borderRadius: "0.25rem",
	},
	cronTitle: {
		fontStyle: "italic",
		fontSize: "1.5rem",
		marginBottom: "3rem",
	},
	cronInput: {
		width: "100%",
		borderRadius: "0.25rem",
		backgroundColor: "var(--background-100)",
		border: "1px solid var(--border-100)",
		paddingTop: "0.5em",
		paddingBottom: "0.5em",
		textAlign: "center",
		fontSize: "2em",
	},
});

interface ExpressionProps {
	cron: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const title = "Expression";

export default function Expression(props: ExpressionProps) {
	let cronHR = <></>;
	try {
		// Validate Cron
		// Throws an error if invalid.
		cronparser.parseExpression(props.cron);

		// Get Human Readable Cron
		const text = cronstrue.toString(props.cron);
		cronHR = <>&quot;{text}&quot;</>;
	} catch (e) {
		console.error("An error occurred when parsing the cron expression:", e);
		cronHR = <>Invalid Cron Expression!</>;
	}

	return (
		<div {...stylex.props(styles.wrapper, util_styles.display_block_base)}>
			<h2>{title}</h2>
			<div {...stylex.props(styles.content)}>
				<p {...stylex.props(styles.cronTitle)}>{cronHR}</p>
				<Input
					styleX={styles.cronInput}
					value={props.cron}
					onChange={props.onChange}
				/>
			</div>
		</div>
	);
}
