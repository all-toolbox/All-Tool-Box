import stylex from "@stylexjs/stylex";
import common_styles from "../common_styles";
import {
	advancedTypesData,
	modulesData,
	basicTypesData,
	classesData,
	functionsData,
	genericsData,
	interfacesData,
} from "./data";
import { GroupBlock } from "../commons";

function CheatsheetTypescript() {
	return (
		<div {...stylex.props(common_styles.base)}>
			<div {...stylex.props(common_styles.threeColumnGrid)}>
				<GroupBlock data={basicTypesData} lang="typescript" />
				<GroupBlock data={advancedTypesData} lang="typescript" />
				<GroupBlock data={modulesData} lang="typescript" />
				<GroupBlock data={classesData} lang="typescript" />
				<GroupBlock data={functionsData} lang="typescript" />
				<GroupBlock data={genericsData} lang="typescript" />
				<GroupBlock data={interfacesData} lang="typescript" />
			</div>
		</div>
	);
}

export default CheatsheetTypescript;
