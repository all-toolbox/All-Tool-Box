import CopyTextBlock from "@src/components/commons/copy-text-block";
import * as stylex from "@stylexjs/stylex";
export interface Item {
	title: string;
	cmd: string;
}

export interface Data {
	title: string;
	items: Item[];
}
const styles = stylex.create({
	groupBlock: {
		backgroundColor: "var(--background-100)",
		borderRadius: "0.25rem",
		padding: "1rem",
		//paddingBottom: "0.125rem",
		boxSizing: "border-box",
		display: "flex",
		gap: "1rem",
		flexDirection: "column",
	},

	helpLineTitle: {
		marginVertical: "0.5rem",
	},

	helpLineCmd: {
		backgroundColor: "var(--background-200)",
		marginBottom: "1.5rem",
		padding: "1rem",
		borderRadius: "0.25rem",
	},

	innerFlex: {
		display: "flex",
		flexWrap: "wrap",
		gap: "1rem",
	},

	flexChild: {
		flexGrow: 1,
	},
});

export function GroupBlock(props: any) {
	return (
		<div {...stylex.props(styles.flexChild)}>
			<div {...stylex.props(styles.groupBlock)}>
				<h2>{props.data.title}</h2>
				{props.data.items.map((item: any, idx: number) => {
					return <HelpLine
						key={idx}
						line_obj={item}
						lang={props.lang}
					/>;
				})}
			</div>
		</div>
	);
}

export function HelpLine(props: any) {
	return (
		<div>
			<h4 {...stylex.props(styles.helpLineTitle)}>{props.line_obj.title}</h4>
			<CopyTextBlock
				text={props.line_obj.cmd}
				code={true}
				lang={props.lang}
			/>
			{/* <div {...stylex.props(styles.helpLineCmd)}>{props.line_obj.cmd}</div> */}
		</div>
	);
}
