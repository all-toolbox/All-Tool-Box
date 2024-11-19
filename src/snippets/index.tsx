// import './index.scss';
import * as stylex from "@stylexjs/stylex";

import { styles } from "../tools/styles";

// import { Link } from "react-router-dom";
import CardLink from "@src/components/commons/card-block";
import typescriptLogo from "@assets/svgs/typescriptsvg.svg";

function Snippets() {
	return (
		<div {...stylex.props(styles.selector_wrap)}>
			<CardLink
				id="typescript"
				title="Typescript"
				link="/snippets/typescript"
				description="Snippet collection for typescript"
				/* Icon={
					<img
						src={typescriptLogo}
						// className="svg-filter"
						style={{
							filter: "grayscale(1)",
							width: "2rem",
							height: "2rem",
						}}
					/>
				} */
			/>
			<CardLink
				title="React Custom Hooks"
				link="/snippets/react-custom-hooks"
				description="A collection of React custom hooks"
				id="react-custom-hooks"
			/>
			{/* <CardLink title="Typescript" link="/cheatsheets/typescript" /> */}
		</div>
	);
}

export default Snippets;
