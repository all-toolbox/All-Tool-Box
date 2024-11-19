import React from "react";
import stylex from "@stylexjs/stylex";
import common_styles from "@src/cheatsheets/common_styles";
import { GroupBlock } from "@src/cheatsheets/commons";
import customHooks from "./data";

//TODO: DOCS: add doc on what the hook does.
export default function SnippetsReactCustomHooks() {
	return (
		<div {...stylex.props(common_styles.base)}>
			<div {...stylex.props(common_styles.threeColumnGrid)}>
				{Object.entries(customHooks).map(([key, hook]) => (
					<GroupBlock key={key} data={hook} lang="typescript" />
				))}
			</div>
		</div>
	);
}
