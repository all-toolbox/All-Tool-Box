import stylex from "@stylexjs/stylex";
import React, { useEffect, useState } from "react";
import ToolbarHelp from "../toolbar_help";
import CustomSelect from "@src/components/commons/select";
import convert, { Unit, _UnitsByMeasureRaw } from "convert";
import Input from "@src/components/commons/input";
import { styles } from "./styles";
import CopyTextBlock from "@src/components/commons/copy-text-block";
import FooterHelp from "../footer_help";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";

interface Option {
	value: string;
	label: string;
}

const options = [
	{ value: "angle", label: "Angle" },
	{ value: "area", label: "Area" },
	{ value: "data", label: "Data" },
	{ value: "energy", label: "Energy" },
	{ value: "force", label: "Force" },
	{ value: "length", label: "Length" },
	{ value: "mass", label: "Mass" },
	{ value: "power", label: "Power" },
	{ value: "pressure", label: "Pressure" },
	{ value: "temperature", label: "Temperature" },
	{ value: "time", label: "Time" },
	{ value: "unit", label: "Unit" },
	{ value: "volume", label: "Volume" },
];

const unitOptions = {
	angle: ["radian", "turn", "degree", "gradian", "gon", "grad"],
	area: [
		"square meter",
		"square kilometer",
		"square hectometer",
		"square decameter",
		"square decimeter",
		"square centimeter",
		"square millimeter",
		"square micrometer",
		"square nanometer",
		"square picometer",
		"square femtometer",
		"acre",
		"hectare",
		"square foot",
		"square inch",
		"square yard",
		"square mile",
	],
	data: [
		"bit",
		"pebibit",
		"tebibit",
		"gibibit",
		"mebibit",
		"kibibit",
		"petabit",
		"terabit",
		"gigabit",
		"megabit",
		"kilobit",
		"hectobit",
		"decabit",
		"centibit",
		"millibit",
		"microbit",
		"nanobit",
		"picobit",
		"femtobit",
		"nibble",
		"semioctet",
		"halfbyte",
		"byte",
		"octect",
		"pebibyte",
		"tebibyte",
		"gibibyte",
		"mebibyte",
		"kibibyte",
		"petabyte",
		"terabyte",
		"gigabyte",
		"megabyte",
		"kilobyte",
		"hectobyte",
		"decabyte",
		"centibyte",
		"millibyte",
		"microbyte",
		"nanobyte",
		"picobyte",
		"femtobyte",
		"hextet",
	],
	energy: [
		"joule",
		"petajoule",
		"terajoule",
		"gigajoule",
		"megajoule",
		"kilojoule",
		"hectojoule",
		"decajoule",
		"decijoule",
		"centijoule",
		"millijoule",
		"microjoule",
		"nanojoule",
		"picojoule",
		"femtojoule",
		"watt-hour",
		"petawatt-hour",
		"terawatt-hour",
		"gigawatt-hour",
		"megawatt-hour",
		"kilowatt-hour",
		"hectowatt-hour",
		"decawatt-hour",
		"deciwatt-hour",
		"centiwatt-hour",
		"milliwatt-hour",
		"microwatt-hour",
		"nanowatt-hour",
		"picowatt-hour",
		"femtowatt-hour",
	],
	force: [
		"newton",
		"petanewton",
		"teranewton",
		"giganewton",
		"meganewton",
		"kilonewton",
		"hectonewton",
		"decanewton",
		"decinewton",
		"centinewton",
		"millinewton",
		"micronewton",
		"nanonewton",
		"piconewton",
		"femtonewton",
		"dyne",
		"pound of force",
		"kip",
		"kipf",
		"poundal",
		"pdl",
		"kilogram-force",
		"kilopond",
		"kgf",
		"kp",
		"tonne-force",
		"metric ton-force",
		"megagram-force",
		"megapond",
	],
	length: [
		"meter",
		"petameter",
		"terameter",
		"gigameter",
		"megameter",
		"kilometer",
		"hectometer",
		"decameter",
		"decimeter",
		"centimeter",
		"millimeter",
		"micrometer",
		"nanometer",
		"picometer",
		"femtometer",
		"foot",
		"US survey foot",
		"inch",
		"yard",
		"mile",
		"nautical mile",
		"light-year",
		"pica",
		"point",
	],
	mass: [
		"gram",
		"petagram",
		"teragram",
		"gigagram",
		"megagram",
		"kilogram",
		"hectogram",
		"decagram",
		"decigram",
		"centigram",
		"milligram",
		"microgram",
		"nanogram",
		"picogram",
		"femtogram",
		"tonne",
		"metric ton",
		"kilotonne",
		"megatonne",
		"gigatonne",
		"pound",
		"stone",
		"ounce",
		"short ton",
		"long ton",
		"imperial ton",
		"displacement ton",
	],
	power: [
		"watt",
		"petawatt",
		"terawatt",
		"gigawatt",
		"megawatt",
		"kilowatt",
		"hectowatt",
		"decawatt",
		"deciwatt",
		"centiwatt",
		"milliwatt",
		"microwatt",
		"nanowatt",
		"picowatt",
		"femtowatt",
		"horsepower",
		"mechanical horsepower",
	],
	pressure: [
		"pascal",
		"petapascal",
		"terapascal",
		"gigapascal",
		"megapascal",
		"kilopascal",
		"hectopascal",
		"decapascal",
		"decipascal",
		"centipascal",
		"millipascal",
		"micropascal",
		"nanopascal",
		"picopascal",
		"femtopascal",
		"bar",
		"petabar",
		"terabar",
		"gigabar",
		"megabar",
		"kilobar",
		"hectobar",
		"decabar",
		"decibar",
		"centibar",
		"millibar",
		"microbar",
		"nanobar",
		"picobar",
		"femtobar",
		"torr",
		"millitorr",
		"atmosphere",
		"pound per square inch",
	],
	temperature: [
		"kelvin",
		"petakelvin",
		"terakelvin",
		"gigakelvin",
		"megakelvin",
		"kilokelvin",
		"hectokelvin",
		"decakelvin",
		"decikelvin",
		"centikelvin",
		"millikelvin",
		"microkelvin",
		"nanokelvin",
		"picokelvin",
		"femtokelvin",
		"fahrenheit",
		"celsius",
		"rankine",
	],
	time: [
		"second",
		"petasecond",
		"terasecond",
		"gigasecond",
		"megasecond",
		"kilosecond",
		"hectosecond",
		"decasecond",
		"decisecond",
		"centisecond",
		"millisecond",
		"microsecond",
		"nanosecond",
		"picosecond",
		"femtosecond",
		"minute",
		"hour",
		"milliday",
		"day",
		"week",
		"fortnight",
		"month",
		"year",
		"decade",
		"century",
		"millennium",
		"moment",
		"shake",
		"time unit",
		"svedberg",
	],
	volume: [
		"cubic meter",
		"stere",
		"cubic petameter",
		"cubic terameter",
		"cubic gigameter",
		"cubic megameter",
		"cubic kilometer",
		"cubic hectometer",
		"cubic decameter",
		"cubic decimeter",
		"cubic centimeter",
		"cubic millimeter",
		"cubic micrometer",
		"cubic nanometer",
		"cubic picometer",
		"cubic femtometer",
		"liter",
		"petaliter",
		"teraliter",
		"gigaliter",
		"megaliter",
		"kiloliter",
		"hectoliter",
		"decaliter",
		"deciliter",
		"centiliter",
		"milliliter",
		"microliter",
		"nanoliter",
		"picoliter",
		"femtoliter",
		"cubic mile",
		"acre-foot",
		"cubic yard",
		"cubic foot",
		"board foot",
		"cubic inch",
		"measurement ton",
		"imperial barrel",
		"imperial bushel",
		"imperial peck",
		"imperial gallon",
		"imperial quart",
		"imperial pint",
		"imperial fluid ounce",
		"teaspoon",
		"tablespoon",
		"US fluid ounce",
		"cup",
		"US legal cup",
		"pint",
		"quart",
		"gallon",
		"US bushel",
		"US peck",
		"US dry gallon",
		"US dry barrel",
		"US dry quart",
		"US dry pint",
	],
};

export default function UnitConverter() {
	const [selectedUnit, setSelectedUnit] = useState(options[0].value);
	const [selectedUnitOptions, setSelectedUnitOptions] = useState<Option[]>(
		unitOptions.angle.map((option) => ({ value: option, label: option })),
	);

	const [inputSelect, setInputSelect] = useState<Option>(
		selectedUnitOptions[0],
	);
	const [outputSelect, setOutputSelect] = useState<Option>(
		selectedUnitOptions[0],
	);

	const [originalValue, setOriginalValue] = useState("1");
	const [convertedValue, setConvertedValue] = useState("");

	useEffect(() => {
		function convertToSelectOptions(options: string[]) {
			setSelectedUnitOptions(
				options.map((option) => ({ value: option, label: option })),
			);
			setInputSelect({ value: options[0], label: options[0] });
			setOutputSelect({ value: options[0], label: options[0] });
		}
		switch (selectedUnit) {
			case "angle":
				convertToSelectOptions(unitOptions.angle);
				break;
			case "area":
				convertToSelectOptions(unitOptions.area);
				break;
			case "data":
				convertToSelectOptions(unitOptions.data);
				break;
			case "energy":
				convertToSelectOptions(unitOptions.energy);
				break;
			case "force":
				convertToSelectOptions(unitOptions.force);
				break;
			case "length":
				convertToSelectOptions(unitOptions.length);
				break;
			case "mass":
				convertToSelectOptions(unitOptions.mass);
				break;
			case "power":
				convertToSelectOptions(unitOptions.power);
				break;
			case "pressure":
				convertToSelectOptions(unitOptions.pressure);
				break;
			case "temperature":
				convertToSelectOptions(unitOptions.temperature);
				break;
			case "time":
				convertToSelectOptions(unitOptions.time);
				break;
			case "volume":
				convertToSelectOptions(unitOptions.volume);
				break;
			default:
				console.error("Invalid category selected");
		}
	}, [selectedUnit]);

	useEffect(() => {
		setConvertedValue(
			convert(Number(originalValue), inputSelect.value as Unit)
				.to(outputSelect.value as Unit)
				.toString(),
		);
	}, [originalValue, inputSelect, outputSelect]);

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div
				{...stylex.props(
					util_styles.display_block_base,
					util_styles.flex_column,
					styles.controls,
					styles.shrink,
				)}
			>
				<h2>Controls</h2>
				<div {...stylex.props(styles.inputSelectWrapper)}>
					<label>Unit</label>
					<CustomSelect
						options={options}
						onChange={(option: Option) => setSelectedUnit(option.value)}
						defaultValue={options[0]}
					/>
				</div>
				<div {...stylex.props(styles.inputSelectWrapper)}>
					<label>Input Unit</label>
					<div {...stylex.props(styles.select)}>
						<CustomSelect
							options={selectedUnitOptions}
							onChange={(option: Option) => setInputSelect(option)}
							value={inputSelect}
						/>
					</div>
				</div>

				<div {...stylex.props(styles.inputSelectWrapper)}>
					<label>Output Unit</label>
					<div {...stylex.props(styles.select)}>
						<CustomSelect
							options={selectedUnitOptions}
							onChange={(option: Option) => setOutputSelect(option)}
							value={outputSelect}
						/>
					</div>
				</div>
			</div>
			<div
				{...stylex.props(
					util_styles.display_block_base,
					util_styles.flex_column,
					styles.values,
				)}
			>
				<div {...stylex.props(styles.inputSelectWrapper)}>
					<h2>Values</h2>

					<div {...stylex.props(styles.inputSelectWrapper)}>
						<label>Input Unit: {inputSelect.label}</label>
						<Input
							value={originalValue}
							onChange={(event) => setOriginalValue(event.target.value)}
						/>
					</div>
					<div {...stylex.props(styles.inputSelectWrapper)}>
						<label>Output Unit: {outputSelect.value}</label>
						<CopyTextBlock text={convertedValue} />
					</div>
				</div>
			</div>

			<ToolbarHelp toolName="Unit Converter">
				<h2>Controls</h2>
				<div {...stylex.props(styles.inputSelectWrapper)}>
					<label>Unit</label>
					<CustomSelect
						options={options}
						onChange={(option: Option) => setSelectedUnit(option.value)}
						defaultValue={options[0]}
					/>
				</div>
			</ToolbarHelp>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is a Unit Converter?</h2>
						<p>
							This is a tool that converts common units such as degress to
							radians and other various formats.
						</p>
					</div>
				</div>
			</FooterHelp>
		</div>
	);
}
