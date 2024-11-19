import { useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";

import TextareaBlock from "@src/components/commons/textarea-block";
import FooterHelp from "@src/tools/footer_help";
import ToolbarHelp from "@src/tools/toolbar_help";

import { minify } from "csso";
import MonacoBlock from "@src/components/commons/monaco-block";

import * as faking from "data-faking";
import { Slider } from "@src/components/commons/range";
import CustomSelect from "@src/components/commons/select";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";
import Input from "@src/components/commons/input";

const styles = stylex.create({
	base: {
		boxSizing: "border-box",
		display: "flex",
		flexDirection: {
			default: "row",
			"@media (max-width: 1200px)": "column",
		},
		gap: "1rem",
		height: "100%",
	},

	flex: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
	},

	controls: {
		gap: "1rem",
		flexShrink: 3,
		minWidth: "16rem",
	},

	block_title: {
		color: "var(--color-text)",
		paddingBottom: "0.5rem",
		fontWeight: "bold",
	},

	toolbar_help: {
		display: "flex",
		boxSizing: "border-box",
		flexDirection: "column",
		gap: "1rem",
	},

	label_slider: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem",
	},

	input: {
		width: "4rem",
	},
});
const options = [
	{ value: "words", label: "Words" },
	{ value: "sentences", label: "Sentences" },
	{ value: "paragraphs", label: "Paragraphs" },
];
function LoremIpsumFaker() {
	const [text, setText] = useState<string>("");
	const [count, setCount] = useState<number[]>([4]);
	const [unit, setUnit] = useState<string>(options[0].value);
	const [decoded, setDecoded] = useState<string>(
		faking.lorem_ipsum_paragraphs(count[0]),
	);

	const [minWords, setMinWords] = useState<number[]>([1]);
	const [maxWords, setMaxWords] = useState<number[]>([10]);
	const [minSentences, setMinSentences] = useState<number[]>([1]);
	const [maxSentences, setMaxSentences] = useState<number[]>([6]);

	function generateLoremIpsum() {
		switch (unit) {
			case "paragraphs":
				setDecoded(faking.lorem_ipsum_paragraphs(count[0]));
				break;
			case "sentences":
				// NOTE: fix lorem functions because range is messed up
				setDecoded(
					faking.lorem_ipsum_sentences(count[0], minWords[0], maxWords[0] + 1),
				);
				break;
			case "words":
				setDecoded(faking.lorem_ipsum_words(count[0]));
				break;
		}
	}
	function onChangeUrl(e: any): void {
		//
	}

	function onChangeDecoded(e: any): void {
		setDecoded(e);
		// const encoded = minify(e).css;
		// setText(encoded);
	}

	// function handleSelect(selectedOption: { value: string; label: string }) {
	//   setUnit(selectedOption);
	// }

	useEffect(() => {
		generateLoremIpsum();
	}, [count, unit]);

	return (
		<div {...stylex.props(styles.base)}>
			<div
				{...stylex.props(
					util_styles.display_block_base,
					util_styles.flex_column,
					styles.controls,
				)}
			>
				<p {...stylex.props(util_styles.display_block_title)}>Controls</p>
				<div {...stylex.props(styles.label_slider)}>
					<label htmlFor="count">Count:</label>
					<CustomSelect
						options={options}
						onChange={(e: any) => setUnit(e.value)}
						defaultValue={options[0]}
					/>
				</div>
				<div {...stylex.props(styles.label_slider)}>
					<label htmlFor="count">Count:</label>
					<div {...stylex.props(styles.input)}>
						<Input
							id="count"
							type="number"
							value={count[0]}
							onChange={(e) => setCount([Number(e.target.value)])}
						/>
					</div>
				</div>
				<Slider
					defaultValue={count}
					onValueChange={(e) => {
						setCount(e);
					}}
					value={count}
					min={1}
					max={100}
					step={1}
				/>

				{unit === "sentences" && (
					<>
						<div {...stylex.props(styles.label_slider)}>
							<label htmlFor="min-words">Minimum words / sentence:</label>
							<div {...stylex.props(styles.input)}>
								<Input
									type="number"
									value={minWords[0]}
									onChange={(e) => setMinWords([Number(e.target.value)])}
								/>
							</div>
							<Slider
								id="min-words"
								value={minWords}
								defaultValue={minWords}
								onValueChange={(e) => {
									setMinWords(e);
								}}
								min={1}
								max={100}
								step={1}
							/>
						</div>
						<div {...stylex.props(styles.label_slider)}>
							<label htmlFor="max-words">Maximum words / sentence:</label>
							<div {...stylex.props(styles.input)}>
								<Input
									id="max-words"
									type="number"
									value={maxWords[0]}
									onChange={(e) => setMaxWords([Number(e.target.value)])}
								/>
							</div>
							<Slider
								value={maxWords}
								defaultValue={maxWords}
								onValueChange={(e) => {
									setMaxWords(e);
								}}
								min={1}
								max={100}
								step={1}
							/>
						</div>
					</>
				)}

				{unit === "paragraphs" && (
					<>
						<div {...stylex.props(styles.label_slider)}>
							{" "}
							<label htmlFor="min-sentences">
								Minimum sentences / paragraph:
							</label>
							<div {...stylex.props(styles.input)}>
								<Input
									id="min-sentences"
									type="number"
									value={minSentences[0]}
									onChange={(e) => setMinSentences([Number(e.target.value)])}
								/>
							</div>
							<Slider
								value={minSentences}
								defaultValue={minSentences}
								onValueChange={(e) => {
									setMinSentences(e);
								}}
								min={1}
								max={100}
								step={1}
							/>
						</div>
						<div {...stylex.props(styles.label_slider)}>
							<label htmlFor="max-sentences">
								Maximum sentences / paragraph:
							</label>
							<div {...stylex.props(styles.input)}>
								<Input
									id="max-sentences"
									type="number"
									value={maxSentences[0]}
									onChange={(e) => setMaxSentences([Number(e.target.value)])}
								/>
							</div>
							<Slider
								defaultValue={maxSentences}
								value={maxSentences}
								onValueChange={(e) => {
									setMaxSentences(e);
								}}
								min={1}
								max={100}
								step={1}
							/>
						</div>
					</>
				)}

				<div>
					<button
						onClick={() => generateLoremIpsum()}
						type="button"
						{...stylex.props(util_styles.button)}
					>
						Generate
					</button>
				</div>
			</div>
			<div {...stylex.props(util_styles.display_block_base, styles.flex)}>
				<p {...stylex.props(util_styles.display_block_title)}>Output</p>
				<TextareaBlock
					value={decoded}
					setValue={setDecoded}
					onChange={onChangeDecoded}
				/>
				{/* <MonacoBlock
					value={decoded}
					setValue={setDecoded}
					onChange={onChangeDecoded}
					defaultLanguage={"text"}
					options={{
						wordWrap: "on",
					}}
				/> */}
			</div>

			{/* <div
                    {...stylex.props(styles.block)}
                >
                    <p {...stylex.props(styles.block_title)}>Minified CSS</p>

                    <MonacoBlock
                        value={text}
                        setValue={setText}
                        onChange={onChangeUrl}
                        defaultLanguage={"css"}
                    />
                </div> */}

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is Lorem Ipsum Generator?</h2>
						<p>
							Lorem Ipsum is fake text that resembles english word and sentence
							structure. This tool allows you to generate as much lorem ipsum
							text as you need be it words, sentences, paragraphs.
						</p>
					</div>
				</div>
			</FooterHelp>

			<ToolbarHelp toolName="Lorem Ipsum Generator">
				<h2>Controls</h2>
			</ToolbarHelp>
		</div>
	);
}

export default LoremIpsumFaker;
