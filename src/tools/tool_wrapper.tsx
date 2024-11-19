import CardBanner from "@src/components/commons/card-banner";
import Footer from "@src/components/footer";
import Toolbar from "@src/components/toolbar";

import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
	base: {
		display: "flex",
		height: "100%",
		width: "100%",
		backgroundColor: "var(--background-200)",
	},

	content_area: {
		width: "100%",
	},

	tool: {
		overflow: "auto",
		height: "calc(100% - var(--footer-height))",
		display: "grid",
		gridTemplateRows: "8.5rem 1fr",
	},
});

interface I_ToolWrapperProps {
	tool_obj: any;

	showToolbar?: boolean;

	children: any;
};

export default function ToolWrapper(props: I_ToolWrapperProps) {
	return (
		<div {...stylex.props(styles.base)}>
			<div {...stylex.props(styles.content_area)}>
				<div {...stylex.props(styles.tool)}>
					<div
						style={{
							padding: "1rem 2rem",
						}}
					>
						{props.tool_obj &&
							<CardBanner
								id={props.tool_obj.id}
								name={props.tool_obj.title}
								description={props.tool_obj.description}
							/>
						}
					</div>

					<div
						style={{
							width: "100%",
							height: "100%",
							padding: "1rem 2rem",
							paddingTop: "0",
							boxSizing: "border-box",
						}}
					>
						{/* <StringCaseConverter /> */}
						{props.children}
					</div>
				</div>

				<div>
					<Footer />
				</div>
			</div>

			{props.showToolbar && (
				<Toolbar />
			)}
		</div>
	);
}
