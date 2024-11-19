// import './index.scss';
import * as stylex from "@stylexjs/stylex";

import { styles } from "../tools/styles";

import CardLink from "@src/components/commons/card-block";
import vimLogo from "@assets/svgs/vim.svg";
import packageLogo from "@assets/svgs/package.svg";

function Cheatsheets() {
	return (
		<div {...stylex.props(styles.selector_wrap)}>
			<CardLink
				id={"#"}
				title="NPM"
				link="/cheatsheets/npm"
				description="Cheat sheet for npm."
				Icon={
					<img
						src={packageLogo}
						className="svg-filter"
						style={{
							// filter: "grayscale(1)",
							width: "2rem",
							height: "2rem",
						}}
					/>
				}
			/>

			<CardLink
				id={"#"}
				title="Vim"
				link="/cheatsheets/vim"
				description="Cheat sheet for the vim editor."
				Icon={
					<img
						src={vimLogo}
						style={{
							filter: "grayscale(1)",
							width: "2rem",
							height: "2rem",
						}}
					/>
				}
			// Icon={<JWTSVG width="2.5rem" height="2.5rem" />}
			/>
			<CardLink
				id={"#"}
				title="React"
				link="/cheatsheets/react"
				description="Cheat sheet for React."
			/>

			<CardLink
				id={"#"}
				title="Typescript"
				link="/cheatsheets/typescript"
				description="Cheat sheet for Typescript."
			/>
			<CardLink
				id={"#"}
				title="SASS"
				link="/cheatsheets/sass"
				description="Cheat sheet for Sass."
			/>

			<CardLink
				id={"#"}
				title="Kubernetes"
				link="/cheatsheets/kubernetes"
				description="Cheat sheet for Kubernetes commands and flags."
			/>

			<CardLink
				id={"#"}
				title="Go"
				link="/cheatsheets/go"
				description="Cheat sheet for Go."
			/>

			<CardLink
				id={"#"}
				title="Bash"
				link="/cheatsheets/bash"
				description="Cheat sheet for Bash."
			/>

			<CardLink
				id={"#"}
				title="Python"
				link="/cheatsheets/python"
				description="Cheat sheet for Python."
			/>

			{/* <CardLink title="Typescript" link="/cheatsheets/typescript" /> */}

			<CardLink
				id={"#"}
				title="Javascript"
				link="/cheatsheets/javascript"
				description="Cheat sheet for Javascript."
			/>

			<CardLink
				id={"#"}
				title="Docker"
				link="/cheatsheets/docker"
				description="Cheat sheet for Docker commands."
			/>

			<CardLink
				id={"#"}
				title="Markdown"
				link="/cheatsheets/markdown"
				description="Cheat sheet for Markdown."
			/>

			<CardLink
				id={"#"}
				title="Regex"
				link="/cheatsheets/regex"
				description="Cheat sheet for Regex."
			/>

			<CardLink
				id={"#"}
				title="Redis"
				link="/cheatsheets/redis"
				description="Cheat sheet for Redis."
			/>
		</div>
	);
}

export default Cheatsheets;
