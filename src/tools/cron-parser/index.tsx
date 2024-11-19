import React, { ChangeEvent, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import Expression from "./expression";
import Examples from "./examples";
import Occurrences from "./occurrences";
import FooterHelp from "../footer_help";
import { help_styles } from "@src/components/footer/help/styles";

const styles = stylex.create({
	wrapper: {
		height: "100%",
		display: "flex",
		gap: "1rem",
		flexDirection: {
			default: "row",
			"@media (max-width:1200px)": "column",
		},
	},

	columnLeft: {
		flexGrow: "1",
	},

	columnRight: { flexGrow: "1" },
});

export default function CronParser() {
	const [cron, setCron] = useState<string>("* * * * *");

	function handleCronChange(event: ChangeEvent<HTMLInputElement>) {
		if (!event.target) return;

		setCron(event.target.value);
	}

	function handleSetCron(cron: string) {
		setCron(cron);
	}

	const expressionSection = (
		<Expression cron={cron} onChange={handleCronChange} />
	);

	const examplesSection = <Examples cron={cron} setCron={handleSetCron} />;

	const occurrencesSection = <Occurrences cron={cron} occurrences={10} />;

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div {...stylex.props(styles.columnLeft)}>
				{expressionSection}
				{examplesSection}
			</div>
			<div {...stylex.props(styles.columnRight)}>{occurrencesSection}</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is CRON Parse?</h2>
						<p>
							This tool will parse out a CRON expression and in plain english
							explain when the occurence will occur. Along with a list of the
							next 10 date + time occurences for reference.
						</p>
					</div>
				</div>
			</FooterHelp>
		</div>
	);
}
