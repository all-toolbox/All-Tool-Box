import React from "react";
import common_styles from "../common_styles";
import stylex from "@stylexjs/stylex";
import { GroupBlock } from "../commons";
import {
	basics,
	colorFunctions,
	featureCheck,
	loops,
	mixins,
	otherFeatures,
	otherFunctions,
} from "./data";

export default function CheatSheetSass() {
	return (
		<div {...stylex.props(common_styles.base)}>
			<div {...stylex.props(common_styles.threeColumnGrid)}>
				<GroupBlock data={basics} lang="scss" />
				<GroupBlock data={mixins} lang="scss" />
				<GroupBlock data={colorFunctions} lang="scss" />
				<GroupBlock data={otherFunctions} lang="scss" />
				<GroupBlock data={featureCheck} lang="scss" />
				<GroupBlock data={loops} lang="scss" />
				<GroupBlock data={otherFeatures} lang="scss" />
			</div>
		</div>
	);
}
