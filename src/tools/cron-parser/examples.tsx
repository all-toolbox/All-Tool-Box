import React from "react";
import * as stylex from "@stylexjs/stylex";
import cronExamples, { CronExample } from "./cron_examples";
import { util_styles } from "@src/utils/styles";

const styles = stylex.create({
	wrapper: {
		marginTop: "1em",
		display: "inline-block",
		width: "100%",
	},
	title: {},
	content: {
		textAlign: "left",
	},
	table: {
		width: "100%",
		borderCollapse: "collapse",
	},
	tableHead: {
		borderBottom: "1px solid var(--border-100)",
		padding: "10rem",
	},
	tableHeadData: {
		paddingTop: "0.5rem",
		paddingBottom: "0.5rem",
		fontWeight: "bold",
	},
	tableBodyData: {
		lineHeight: "3rem",
	},
	tableBodyDataName: {
		cursor: "pointer",
		color: "#368ACA",
	},
	tableBodyDataCron: {},
	tableBodyDataCronSpan: {
		padding: "0.5rem 0.75rem",
		borderRadius: "0.25rem",
		backgroundColor: "var(--background-200)",
		border: "1px solid var(--border-100)",
	},
});

interface ExamplesProps {
	cron: string;
	setCron: (cron: string) => void;
}

const title = "Examples";

export default function Examples(props: ExamplesProps) {
	const bodyRows = cronExamples.map((value: CronExample) => {
		return (
			<tr>
				<td
					{...stylex.props(styles.tableBodyData, styles.tableBodyDataName)}
					onClick={() => props.setCron(value.cron)}
				>
					{value.name}
				</td>
				<td {...stylex.props(styles.tableBodyData, styles.tableBodyDataCron)}>
					<span {...stylex.props(styles.tableBodyDataCronSpan)}>
						{value.cron}
					</span>
				</td>
				<td {...stylex.props(styles.tableBodyData)}>{value.readable}</td>
			</tr>
		);
	});

	return (
		<div {...stylex.props(styles.wrapper, util_styles.display_block_base)}>
			<h2>{title}</h2>
			<div {...stylex.props(styles.content)}>
				<table {...stylex.props(styles.table)}>
					<thead {...stylex.props(styles.tableHead)}>
						<tr>
							<th {...stylex.props(styles.tableHeadData)}>Name</th>
							<th {...stylex.props(styles.tableHeadData)}>Expression</th>
							<th {...stylex.props(styles.tableHeadData)}>Readable</th>
						</tr>
					</thead>

					<tbody>{bodyRows}</tbody>
				</table>
			</div>
		</div>
	);
}
