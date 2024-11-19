import React from "react";
import * as stylex from "@stylexjs/stylex";
import cronparser from "cron-parser";
import { util_styles } from "@src/utils/styles";

const styles = stylex.create({
	wrapper: {
		display: "inline-block",
		width: "100%",
	},
	title: {
		marginTop: "0.5rem",
		marginBottom: "0.5rem",
	},
	content: {
		textAlign: "left",
	},
	table: {
		width: "100%",
		borderCollapse: "collapse",
	},
	tableHead: {
		borderBottom: "1px solid var(--border-100)",
	},
	tableHeadData: {
		paddingTop: "0.5rem",
		paddingBottom: "0.5rem",
		fontWeight: "bold",
	},
	tableBodyData: {
		lineHeight: "2.5rem",
	},
});

interface OccurrencesProps {
	cron: string;
	occurrences: number;
}

const diffSeconds = 1000;
const diffMinutes = diffSeconds * 60;
const diffHours = diffMinutes * 60;
const diffDays = diffHours * 24;

function getRelativeDiff(a: Date, b: Date): string {
	const diff = b.getTime() - a.getTime();

	// Check days.
	const diffInDays = diff / diffDays;
	if (diffInDays >= 1) {
		if (a.getDay() + 1 === b.getDay()) {
			return "Tomorrow";
		}

		return `${Math.round(diffInDays)} days`;
	}

	// Check hours.
	const diffInHours = diff / diffHours;
	if (diffInHours >= 1) {
		return `${Math.round(diffInHours)} hours`;
	}

	// Check minutes.
	const diffInMinutes = diff / diffMinutes;
	if (diffInMinutes >= 1) {
		return `${Math.round(diffInMinutes)} minutes`;
	}

	// Check seconds.
	const diffInSeconds = diff / diffMinutes;
	return `${Math.round(diffInSeconds)} seconds`;
}

export default function Occurrences(props: OccurrencesProps) {
	const title = `Next ${props.occurrences} Occurrences`;

	const now = new Date();
	const dates = [];
	try {
		const interval = cronparser.parseExpression(props.cron);
		for (let i = 0; i < props.occurrences; i += 1) {
			dates.push(interval.next().toDate());
		}
	} catch (e) {
		console.error(
			`An error occurred when parsing the next ${props.occurrences} occurrences for cron ${props.cron}:`,
			e,
		);
	}

	const rows = dates.map((date: Date) => {
		const relative = getRelativeDiff(now, date);
		const isoString = date.toISOString();

		return (
			<tr>
				<td {...stylex.props(styles.tableBodyData)}>{isoString}</td>
				<td {...stylex.props(styles.tableBodyData)}>{relative}</td>
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
							<th {...stylex.props(styles.tableHeadData)}>Occurrence</th>
							<th {...stylex.props(styles.tableHeadData)}>Relative</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</table>
			</div>
		</div>
	);
}
