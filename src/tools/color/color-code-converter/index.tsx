import React, { useEffect, useState } from "react";
import { generate, presetPalettes } from "@ant-design/colors";
import stylex from "@stylexjs/stylex";
import ToolbarHelp from "@src/tools/toolbar_help";
import FooterHelp from "@src/tools/footer_help";
import { help_styles } from "@src/components/footer/help/styles";
import { ColorPickerHexAlpha } from "@controlkit/ui";
import { ToastContainer, toast } from "react-toastify";
import { writeText, readText } from "@tauri-apps/plugin-clipboard-manager";

import chroma from "chroma-js";

// import convert from "color-convert";

import { util_styles } from "@src/utils/styles";
import Input from "@src/components/commons/input";
import CopyTextBlock from "@src/components/commons/copy-text-block";

const styles = stylex.create({
	wrapper: {
		display: "grid",
		gridTemplateRows: "1fr auto",
		gap: "1rem",
	},

	inputBlock: {
		maxWidth: "15rem",
	},

	colorBlock: {
		height: "5rem",
		width: "5rem",
	},

	outputBlock: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
	},
});

interface I_ColorBlockProps {
	color: string;
}

export default function ColorCodeConverter() {
	const [inputColor, setInputColor] = useState("#ffffff");
	const [invalidColor, setInvalidColor] = useState(false);
	const [hex, setHex] = useState("");
	const [rgb, setRgb] = useState("");
	const [hsl, setHsl] = useState("");
	const [hsv, setHsv] = useState("");
	const [cmyk, setCmyk] = useState("");
	const [lch, setLch] = useState("");

	function FormatNumber(value: number) {
		return Number.isNaN(value) ? "0" : value.toFixed(value > 1 ? 0 : 1);
	}

	useEffect(() => {
		function ConvertColor() {
			if (chroma.valid(inputColor)) {
				const color = chroma(inputColor);
				console.log(color);
				setHex(color.hex().toUpperCase());
				setRgb(`rgb(${color.rgb().join(",")})`);
				setHsl(
					`hsl(${[
						FormatNumber(color.hsl()[0]), // Hue
						`${parseInt(FormatNumber(color.hsl()[1])) * 100}%`, // Saturation
						`${parseInt(FormatNumber(color.hsl()[2])) * 100}%`, // Value
					].join(", ")})`,
				);
				setHsv(
					`hsv(${[
						FormatNumber(color.hsv()[0]), // Hue
						`${parseInt(FormatNumber(color.hsv()[1])) * 100}%`, // Saturation
						`${parseInt(FormatNumber(color.hsv()[2])) * 100}%`, // Value
					].join(", ")})`,
				);
				setCmyk(
					`cmyk(${color
						.cmyk()
						.map((val) => `${FormatNumber(val * 100)}%`)
						.join(", ")})`,
				);
				setLch(
					`lch(${[
						FormatNumber(color.lch()[0]),
						FormatNumber(color.lch()[1]),
						FormatNumber(color.lch()[2]),
					]})`,
				);
				setInvalidColor(false);
			} else {
				setInvalidColor(true);
			}
		}

		ConvertColor();
	}, [inputColor]);
	return (
		<div {...stylex.props(styles.wrapper)}>
			<div {...stylex.props(styles.inputBlock, util_styles.display_block_base)}>
				<h2>Input</h2>
				<Input
					type="text"
					value={inputColor}
					onChange={(e) => setInputColor(e.target.value)}
				/>
				{invalidColor && <p>Invalid color</p>}
			</div>

			<div {...stylex.props(util_styles.display_block_base)}>
				<div {...stylex.props(styles.outputBlock)}>
					<h2>Output</h2>
					<div
						style={{ backgroundColor: hex }}
						{...stylex.props(styles.colorBlock)}
					/>
					<div>
						<p>hex</p>
						<CopyTextBlock text={hex} />
					</div>

					<div>
						<p>rgb</p>
						<CopyTextBlock text={rgb} />
					</div>

					<div>
						<p>hsl</p>
						<CopyTextBlock text={hsl} />
					</div>

					<div>
						<p>hsv</p>
						<CopyTextBlock text={hsv} />
					</div>

					<div>
						<p>cmyk</p>
						<CopyTextBlock text={cmyk} />
					</div>

					<div>
						<p>lch</p>
						<CopyTextBlock text={lch} />
					</div>
				</div>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is a Color Palette Generator?</h2>
						<p>
							This is a tool that generates a set of colors that go well
							together given a base color.
						</p>

						<h2>How to use</h2>
						<p>
							Simply select a color from the toolbar controls and the palette
							will automatically update a different set of colors.
						</p>
					</div>
				</div>
			</FooterHelp>
		</div>
	);
}
