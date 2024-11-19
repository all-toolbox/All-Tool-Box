import { useState, useEffect, ChangeEvent } from "react";
import * as stylex from "@stylexjs/stylex";
import FooterHelp from "@src/tools/footer_help";
import Select from "react-select";
import ToolbarHelp from "@src/tools/toolbar_help";
import CustomSelect from "@src/components/commons/select";
import TextareaBlock from "@src/components/commons/textarea-block";
import CopyTextBlock from "@src/components/commons/copy-text-block";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";
const styles = stylex.create({
	base: {
		display: "flex",
		flexDirection: {
			default: "column",
			"@media (min-width: 1200px)": "row",
		},

		gap: "1rem",
	},
	controls: {
		flexShrink: 3,
		display: "flex",
		flexDirection: "column",
	},
	content: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
		minHeight: "16rem",
		flexGrow: 1,
	},

	output: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
		flexGrow: 1,
	},

	button: {
		maxWidth: "6rem",
	},

	toast: {
		padding: "0.5rem 1rem",
		borderRadius: "4px",
		backgroundColor: "#0f0f0f98",
		transition: "opacity 0.5s ease-in-out",
		opacity: "0",
	},

	shown: {
		opacity: 1,
	},

	toolbarHelp: {
		display: "flex",
		flexDirection: "column",
		padding: "0 1rem",
	},

	two_column: {
		display: "flex",
		gap: "1rem",
		flexDirection: "column",
		flexGrow: "1",
	},
});
interface Option {
	value: string;
	label: string;
}
const options = [
	{ value: "upper case", label: "Upper case" },
	{ value: "lower case", label: "Lower case" },
	{ value: "camel case", label: "Camel case" },
	{ value: "snake case", label: "Snake Case" },
	{ value: "kebab case", label: "Kebab Case" },
];
function StringCaseConverter() {
	const [inputValue, setInputValue] = useState("");
	const [outputValue, setOutputValue] = useState("");
	const [selectedOption, setSelectedOption] = useState(options[0].value);
	const [showToast, setShowToast] = useState(false);

	useEffect(() => {
		switch (selectedOption) {
			case "upper case":
				return convertToUpperCase(inputValue);
			case "lower case":
				return convertToLowerCase(inputValue);
			case "camel case":
				return convertToCamelCase(inputValue);
			case "snake case":
				return convertToSnakeCase(inputValue);
			case "kebab case":
				return convertToKebabCase(inputValue);
		}
	}, [selectedOption, inputValue]);

	function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
		setInputValue(event.target.value);
	}

	function convertToKebabCase(input: string) {
		setOutputValue(
			input
				.split(" ")
				.map((word) => {
					return word.toLocaleLowerCase();
				})
				.join("-"),
		);
	}

	function convertToSnakeCase(input: string) {
		setOutputValue(
			input
				.split(" ")
				.map((word) => {
					return word.toLocaleLowerCase();
				})
				.join("_"),
		);
	}

	function convertToCamelCase(input: string) {
		setOutputValue(
			input
				.split(" ")
				.map((word, index) => {
					if (index === 0) {
						return word.toLowerCase();
					}

					return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
				})
				.join(""),
		);
	}

	function convertToUpperCase(input: string) {
		setOutputValue(input.toLocaleUpperCase());
	}

	function convertToLowerCase(input: string) {
		setOutputValue(input.toLowerCase());
	}

	function handleCopyClick() {
		navigator.clipboard.writeText(outputValue);
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 1000);
	}

	function handleChange(selectedOption: Option) {
		setSelectedOption(selectedOption.value);
	}
	return (
		<div {...stylex.props(styles.base)}>
			<div {...stylex.props(util_styles.display_block_base, styles.controls)}>
				<h2>Controls</h2>
				<CustomSelect
					options={options}
					//value={selectedOption}
					defaultValue={options[0]}
					onChange={handleChange}
				/>
			</div>
			<div {...stylex.props(styles.two_column, util_styles.display_block_base)}>
				<div {...stylex.props(styles.content)}>
					<h2>Input</h2>
					<TextareaBlock
						value={inputValue}
						onChange={handleInputChange}
						setValue={setInputValue}
					/>
				</div>

				<div {...stylex.props(styles.output)}>
					<h2>Output</h2>

					<CopyTextBlock text={outputValue} />
				</div>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is Text Case Converter?</h2>
						<p>
							The Text Case Converter is a tool that allows you to easily
							convert text lower/case. It supports various formats such as all
							lowercase LowerCase, all uppercase UpperCase, CamelCase, and
							SnakeCase.
						</p>

						<h2>How to use the Text Case Converter</h2>
						<p>
							Enter the text you wish to convert in the text input field. The
							converted text will be output in real time according to the
							supported formats.
						</p>

						<h2>Supported Formats</h2>
						<p>Below is a list and overview of available conversion formats.</p>

						<h2>LowerCase</h2>
						<p>All characters in the text are in lowercase.</p>
						<p>e.g. "this is sample text"</p>

						<h2>UpperCase</h2>
						<p>All characters in the text are capitalized.</p>
						<p>e.g. "THIS IS SAMPLE TEXT".</p>

						<h2>CamelCase</h2>
						<p>
							CamelCase is a form of word splicing in which the first letter of
							a word is capitalized. The first letter is lower case.
						</p>
						<p>e.g. "thisIsSampleText"</p>

						<h2>CapitalCase</h2>
						<p>
							CapitalCase is a format in which the first letter of a word is
							converted to uppercase and words are separated by a space.
						</p>
						<p>e.g. "This Is Sample Text".</p>

						<h2>DotCase</h2>
						<p>
							DotCase is a format that converts all letters in the text to
							lowercase and separates words with a period.
						</p>
						<p>e.g. "this.is.sample.text"</p>

						<h2>KebabCase</h2>
						<p>
							KebabCase is a format in which words are separated by hyphens.
						</p>
						<p>e.g. "this-is-sample-text"</p>

						<h2>PascalCase</h2>
						<p>
							PascalCase is a form in which the first letter of a word is
							capitalized and joined. It is also known as Upper CamelCase
							because the first letter is capitalized.
						</p>
						<p>e.g. "ThisIsSampleText"</p>

						<h2>PascalSnakeCase</h2>
						<p>
							PascalSnakeCase is a format in which words are capitalized at the
							beginning and separated by an underscore between words.
						</p>
						<p>e.g. "This_Is_Sample_Text"</p>

						<h2>PathCase</h2>
						<p>
							PassCase are formatted with all letters in lowercase and words
							separated by a slash.
						</p>
						<p>e.g. "this/is/sample/text"</p>

						<h2>SentenceCase</h2>
						<p>
							SentenceCase is a format in which only the first letter of a
							sentence is capitalized.
						</p>
						<p>e.g. "This is sample text"</p>

						<h2>SnakeCase</h2>
						<p>
							SnakeCase is a format in which all letters are lowercase and words
							are separated by underscores.
						</p>
						<p>e.g. "this_is_sample_text"</p>

						<h2>TrainCase</h2>
						<p>
							TrainCase is a format in which words are capitalized at the
							beginning and hyphens are used to separate words.
						</p>
						<p>e.g. "This-Is-Sample-Text"</p>
					</div>
				</div>
			</FooterHelp>

			<ToolbarHelp toolName="String Case Converter">
				<div {...stylex.props(styles.toolbarHelp)}>
					<h3>Controls</h3>
					{/* <Select
            options={options}
            defaultValue={options[0]}
            isSearchable={false}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-bg)",
                borderRadius: "0.25rem",
                color: "#ffff",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isSelected
                  ? "var( --color-global-blue)"
                  : state.isFocused
                  ? "var(--color-border)"
                  : undefined,
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                padding: "0 0.25rem",
              }),
              singleValue: (baseStyles, state) => ({
                ...baseStyles,
                color: "var(--color-text)",
              }),
            }}
          /> */}

					<CustomSelect
						options={options}
						//value={selectedOption}
						defaultValue={options[0]}
						onChange={handleChange}
					/>
				</div>
			</ToolbarHelp>
		</div>
	);
}

export default StringCaseConverter;
