/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useReducer, useState } from "react";

import * as stylex from "@stylexjs/stylex";

import OutputBlock from "@src/components/commons/output-block";
import TextareaBlock from "@src/components/commons/textarea-block";
import FooterHelp from "@src/tools/footer_help";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";

const styles = stylex.create({
	wrapper: {
		display: "flex",
		flexDirection: "row",
		gap: "1rem",
		height: "100%",
	},

	block: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
	},
});

function WordCounter() {
	const [text, setText] = useState<string>("");

	const [wordCount, setWordCount] = useState<number>(0);
	const [charCount, setCharCount] = useState<number>(0);
	const [sentenceCount, setSentenceCount] = useState<number>(0);
	const [paragraphCount, setParagraphCount] = useState<number>(0);

	const [lineCount, setLineCount] = useState<number>(0);

	useEffect(() => {
		const words = text.split(" ");
		// console.log("word", words);

		let wordCount = 0;
		for (let i = 0; i < words.length; ++i) {
			if (words[i].trim() !== "") {
				++wordCount;
			}
		}

		const sentences = text.split(".");

		const linesz = text.split("\n");

		setWordCount(wordCount);
		setCharCount(text.length);
		setSentenceCount(sentences.length - 1);
		// setParagraphCount(lineCount);
		setLineCount(linesz.length - 1);
	}, [text]);

	function onChangeText(e: React.ChangeEvent<HTMLTextAreaElement>): void {
		setText(e.target.value);
	}

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div {...stylex.props(util_styles.display_block_base, styles.block)}>
				<h2>Input</h2>
				{/* <textarea
					className="jwt__decoder__textarea"
					name=""
					id=""
					value={text}
					rows={25}
					onChange={onChangeText}
				/> */}

				<TextareaBlock
					value={text}
					setValue={setText}
					onChange={onChangeText}
				/>
			</div>

			<div {...stylex.props(util_styles.display_block_base)}>
				<h2>Information</h2>
				<OutputBlock description={wordCount.toString()} title="Word Count" />
				<OutputBlock
					description={charCount.toString()}
					title="Character Count"
				/>
				<OutputBlock
					description={sentenceCount.toString()}
					title="Sentence Count"
				/>
				{/* <OutputBlock
					description={paragraphCount.toString()}
					title="Paragraph Count"
				/> */}
				<OutputBlock description={lineCount.toString()} title="Line Count" />
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is Word Count?</h2>
						<p>
							This tool Counts the number of words in the textarea input. As
							well as the characters, sentences, and lines.
						</p>
					</div>
				</div>
			</FooterHelp>
		</div>
	);
}

export default WordCounter;
