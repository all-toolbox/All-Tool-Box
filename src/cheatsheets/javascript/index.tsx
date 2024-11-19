import stylex from "@stylexjs/stylex";
import common_styles from "../common_styles";
import * as data from "./data";
import { GroupBlock } from "../commons";

function CheatsheetJavascript() {
	return (
		<div {...stylex.props(common_styles.base)}>
			<div {...stylex.props(common_styles.threeColumnGrid)}>
				{Object.entries(data).map(([key, value]) => (
					<GroupBlock key={key} data={value} lang="javascript" />
				))}
			</div>
		</div>
	);
}

export default CheatsheetJavascript;
