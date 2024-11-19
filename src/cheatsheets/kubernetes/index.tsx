import React from "react";
import { GroupBlock } from "../commons";
import common_styles from "../common_styles";
import stylex from "@stylexjs/stylex";
import {
	viewingAndFindingResources,
	creatingResources,
	misc,
	updatingResources,
} from "./data";

export default function CheatSheetKubernetes() {
	return (
		<div {...stylex.props(common_styles.base)}>
			<div {...stylex.props(common_styles.threeColumnGrid)}>
				<GroupBlock data={viewingAndFindingResources} lang="bash" />
				<GroupBlock data={updatingResources} lang="bash" />
				<GroupBlock data={creatingResources} lang="bash" />

				<GroupBlock data={misc} lang="bash" />
			</div>
		</div>
	);
}
