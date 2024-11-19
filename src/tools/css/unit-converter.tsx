import Input from "@src/components/commons/input";
import CustomSelect, { Option } from "@src/components/commons/select";
import stylex from "@stylexjs/stylex";
import React, { useEffect, useState } from "react";
import ToolbarHelp from "../toolbar_help";
import FooterHelp from "../footer_help";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";
import CopyTextBlock from "@src/components/commons/copy-text-block";

const styles = stylex.create({
	wrapper: {
		display: "flex",
		flexDirection: {
			default: "column",
			"@media (min-width: 1200px)": "row",
		},
		gap: "1rem",
	},
	gap: { gap: "1rem" },
	labelControl: {
		gap: "1rem",
	},

	shrink: {
		flexShrink: "3",
		minWidth: "16rem",
	},
});
const options: Option[] = [
	{
		label: "px",
		value: "px",
	},
	{
		label: "em",
		value: "em",
	},
	{
		label: "rem",
		value: "rem",
	},

	{
		label: "pt",
		value: "pt",
	},
	{
		label: "cm",
		value: "cm",
	},
	{
		label: "mm",
		value: "mm",
	},
	{
		label: "in",
		value: "in",
	},

	{
		label: "%",
		value: "%",
	},
];

export default function CSSUnitConverter() {
	const [inputSelect, setInputSelect] = useState<Option>(options[0]);
	const [outputSelect, setOutputSelect] = useState<Option>(options[0]);

	const [inputValue, setInputValue] = useState(1);
	const [outputValue, setOutputValue] = useState("");

	const [baseValue, setBaseValue] = useState(16);
	useEffect(() => {
		function convert() {
			let convertedValue: number;
			switch (`${inputSelect.value}-${outputSelect.value}`) {
				case "px-em":
					convertedValue = inputValue / baseValue;
					break;
				case "px-pt":
					convertedValue = inputValue * (0.75 / baseValue);
					break;
				case "px-rem":
					convertedValue = inputValue / baseValue;
					break;
				case "em-px":
					convertedValue = inputValue * baseValue;
					break;
				case "rem-px":
					convertedValue = inputValue * baseValue;
					break;
				case "pt-px":
					convertedValue = inputValue / (0.75 / baseValue);
					break;
				case "in-cm":
					convertedValue = inputValue * 2.54 * baseValue;
					break;
				case "cm-in":
					convertedValue = inputValue / (2.54 * baseValue);
					break;
				default:
					convertedValue = inputValue;
					break;
			}

			setOutputValue(convertedValue.toString());
		}

		convert();
	}, [inputSelect, outputSelect, inputValue, baseValue]);
	return (
		<div {...stylex.props(styles.wrapper)}>
			<div
				{...stylex.props(
					util_styles.display_block_base,
					util_styles.flex_column,
					styles.gap,
					styles.shrink,
				)}
			>
				<h2>Controls</h2>
				<div {...stylex.props(util_styles.flex_column, styles.labelControl)}>
					<label htmlFor="control-input">Input</label>
					<CustomSelect
						options={options}
						value={inputSelect}
						onChange={(option: Option) => setInputSelect(option)}
					/>
				</div>

				<div {...stylex.props(util_styles.flex_column, styles.labelControl)}>
					<label htmlFor="control-output">Output</label>
					<CustomSelect
						options={options}
						value={outputSelect}
						onChange={(option: Option) => setOutputSelect(option)}
					/>
				</div>

				<div {...stylex.props(util_styles.flex_column, styles.labelControl)}>
					<label htmlFor="control-base">Base</label>
					<Input
						type="number"
						value={baseValue}
						onChange={(event) => setBaseValue(Number(event.target.value))}
					/>
				</div>
			</div>

			<div
				{...stylex.props(
					util_styles.display_block_base,
					util_styles.flex_column,
					styles.gap,
				)}
			>
				<div {...stylex.props(util_styles.flex_column, styles.labelControl)}>
					<h2>Values</h2>
					<label htmlFor="input">Input: {inputSelect.label}</label>
					<Input
						type="number"
						id="input"
						value={inputValue}
						onChange={(event) => setInputValue(Number(event.target.value))}
					/>
				</div>

				<div {...stylex.props(util_styles.flex_column, styles.labelControl)}>
					<label htmlFor="output">Output: {outputSelect.label}</label>
					<CopyTextBlock text={outputValue} />
				</div>
			</div>

			<ToolbarHelp />

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is CSS Unit Converter?</h2>
						<p>
							This tool helps convert one CSS unit to a different CSS unit
							scale.
						</p>
					</div>
				</div>
			</FooterHelp>
		</div>
	);
}
