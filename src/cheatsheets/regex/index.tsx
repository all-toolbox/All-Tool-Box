import React from "react";
import { GroupBlock } from "../commons";
import common_styles from "../common_styles";
import stylex from "@stylexjs/stylex";
import * as data from "./data";

export default function CheatSheetRegex() {
	return (
		<div {...stylex.props(common_styles.base)}>
			<div {...stylex.props(common_styles.threeColumnGrid)}>
				{Object.entries(data).map(([key, value]) => (
					<GroupBlock data={value} lang="regex" key={key} />
				))}
			</div>
		</div>
	);
}
