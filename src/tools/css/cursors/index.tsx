// import "../../index.scss";
import { help_styles } from "@src/components/footer/help/styles";
import FooterHelp from "@src/tools/footer_help";
import { util_styles } from "@src/utils/styles";
import * as stylex from "@stylexjs/stylex";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { toast } from "react-toastify";

const styles = stylex.create({
	section: {
		marginBottom: "1rem",
	},

	title: {
		fontWeight: "bold",
		fontSize: "1.25rem",
		marginBottom: "1rem",
	},

	card_wrapper: {
		display: "flex",
		flexWrap: "wrap",
		gap: "1rem",
	},

	card: {
		backgroundColor: "var(--background-200)",
		padding: "1rem 2rem",
		borderRadius: "0.5rem",
		minWidth: "8rem",
		textAlign: "center",

		transition: "background-color var(--transition-speed) ease",

		":hover": {
			backgroundColor: "var(--background-300)",
		},
	},
});

interface I_SectionProps {
	title: string;
	cursors: string[];
}

function Section(props: I_SectionProps) {
	async function copyText(c: string) {
		await writeText(c);
		toast("Copied to clipboard!");
	}

	return (
		<div {...stylex.props(styles.section)}>
			<p {...stylex.props(styles.title)}>{props.title}</p>

			<div {...stylex.props(styles.card_wrapper)}>
				{props.cursors.map((cursor: string, _tidx: number) => {
					return (
						<div
							key={cursor}
							{...stylex.props(styles.card)}
							style={{
								cursor: cursor,
							}}
							onClick={(e) => {
								copyText(cursor);
							}}
							role="button"
						>
							{cursor}
						</div>
					);
				})}
			</div>
		</div>
	);
}

function CSSCursors() {
	return (
		<div className="micro-tool-wrap">
			<div {...stylex.props(util_styles.display_block_base)}>
				<Section title="General Purpose" cursors={["default", "none"]} />

				<Section
					title="Status"
					cursors={[
						"help",
						"pointer",
						"progress",
						"wait",
						"context-menu",
						"not-allowed",
					]}
				/>

				<Section
					title="Selection"
					cursors={["cell", "crosshair", "text", "vertical-text"]}
				/>

				<Section title="Zoom" cursors={["zoom-in", "zoom-out"]} />

				<Section
					title="Drag and Drop"
					cursors={["alias", "copy", "move", "no-drop", "grab", "grabbing"]}
				/>

				<Section
					title="Status"
					cursors={[
						"all-scroll",
						"col-resize",
						"row-resize",
						"n-resize",
						"e-resize",
						"s-resize",
						"w-resize",
						"ns-resize",
						"ew-resize",
						"ne-resize",
						"nw-resize",
						"se-resize",
						"sw-resize",
						"nesw-resize",
						"nwse-resize",
					]}
				/>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is CSS Cursors?</h2>
						<p>
							This tool displays a block for each cursor supported by modern
							browsers. Simply hover over a CSS block to see what the cursor
							would look like with that parameter value.
						</p>
					</div>
				</div>
			</FooterHelp>
		</div>
	);
}

export default CSSCursors;
