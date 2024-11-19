import React, { useEffect, useState } from "react";
import { diffChars, diffSentences, diffWords } from "diff";
import stylex from "@stylexjs/stylex";
import TextareaBlock from "@src/components/commons/textarea-block";
import { util_styles } from "@src/utils/styles";
import CustomSelect from "@src/components/commons/select";

const styles = stylex.create({
	added: {
		color: "#d4f7d4",
	},

	removed: {
		color: "#f7d4d4",
	},

	outputsBlock: {
		display: "flex",
		flexDirection: "column",
		padding: "0.5rem",
		maxWidth: "100%",
		height: "100%",
	},

	twoColumn: {
		display: "flex",
		gap: "1rem",
	},
	wrapper: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "100%",
		gap: "2rem",
		boxSizing: "border-box",
		overflow: "auto",
	},

	textBox: {},
	displayBlock: {
		display: "flex",
		gap: "1rem",
		flexDirection: "column",
	},

	inputBlock: {
		display: "flex",
		flexDirection: "column",
		height: "100%",
		width: "100%",
		boxSizing: "border-box",
		gap: "1rem",
		minHeight: "16rem",
	},
	outputCard: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "100%",
		padding: "1rem",
		boxSizing: "border-box",
		gap: "1rem",
	},

	controls: {
		display: "flex",
		flexDirection: "column",
	},
});

const options = [
	{ value: "chars", label: "chars" },
	{ value: "words", label: "words" },
	{ value: "sentences", label: "sentences" },
];
export default function TextDiff() {
	//TODO clean up the output display eventually
	const [text1, setText1] = useState("");
	const [text2, setText2] = useState("");
	const [selectedOption, setSelectedOption] = useState(options[0].value);

	const [diffs, setDiffs] = useState<any[]>([]);
	useEffect(() => {
		getDiffs();
	}, [text1, text2, selectedOption]);
	const getDiffs = () => {
		// return diffChars(text1, text2);
		switch (selectedOption) {
			case "chars":
				setDiffs(diffChars(text1, text2));
				break;
			case "words":
				setDiffs(diffWords(text1, text2));
				break;
			case "sentences":
				setDiffs(diffSentences(text1, text2));
				break;
		}
	};
	const renderDiffs = () => {
		return diffs.map((part, index) => {
			return (
				<span
					key={part.value}
					{...stylex.props(part.added ? styles.added : styles.removed)}
				>
					{part.value}
				</span>
			);
		});
	};
	return (
		<div {...stylex.props(styles.wrapper)}>
			<div {...stylex.props(util_styles.display_block_base, styles.controls)}>
				<h2>Controls</h2>
				<CustomSelect
					options={options}
					//value={selectedOption}
					defaultValue={options[0]}
					onChange={(e: any) => setSelectedOption(e.value)}
				/>
			</div>
			<div {...stylex.props(styles.twoColumn)}>
				<div
					{...stylex.props(util_styles.display_block_base, styles.inputBlock)}
				>
					<h2>Text 1</h2>
					<TextareaBlock
						value={text1}
						onChange={(e) => setText1(e.target.value)}
						setValue={setText1}
					/>
				</div>
				<div
					{...stylex.props(util_styles.display_block_base, styles.inputBlock)}
				>
					<h2>Text 2</h2>
					<TextareaBlock
						value={text2}
						onChange={(e) => setText2(e.target.value)}
						setValue={setText2}
					/>
				</div>
			</div>
			<div {...stylex.props(util_styles.display_block_base)}>
				<h2>Difference</h2>
				<div {...stylex.props(util_styles.display_block_base)}>
					{diffs.map((part, index) => {
						return (
							<span
								{...stylex.props(part.added ? styles.added : styles.removed)}
							>
								{part.value}
							</span>
						);
					})}
				</div>
			</div>
		</div>
	);
}
