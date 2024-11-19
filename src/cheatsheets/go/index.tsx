import React from "react";
import { GroupBlock } from "../commons";
import common_styles from "../common_styles";
import stylex from "@stylexjs/stylex";
import * as data from "./data";

export default function CheatSheetGo() {
	return (
		<div {...stylex.props(common_styles.base)}>
			<div {...stylex.props(common_styles.threeColumnGrid)}>
				{Object.entries(data).map(([key, value]) => (
					<GroupBlock key={key} data={value} lang="go" />
				))}
			</div>
		</div>
	);
}
