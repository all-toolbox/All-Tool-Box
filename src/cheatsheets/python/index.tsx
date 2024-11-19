import stylex from "@stylexjs/stylex";
import React from "react";
import common_styles from "../common_styles";
import * as data from "./data";
import { GroupBlock } from "../commons";

export default function CheatSheetPython() {
	return (
		<div {...stylex.props(common_styles.base)}>
			<div {...stylex.props(common_styles.threeColumnGrid)}>
				{Object.entries(data).map(([key, value]) => (
					<GroupBlock key={key} data={value} lang="python" />
				))}
			</div>
		</div>
	);
}
