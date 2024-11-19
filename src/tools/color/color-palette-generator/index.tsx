import React, { useEffect, useState } from "react";
import { generate, presetPalettes } from "@ant-design/colors";
import stylex from "@stylexjs/stylex";
import ToolbarHelp from "@src/tools/toolbar_help";
import FooterHelp from "@src/tools/footer_help";
import { help_styles } from "@src/components/footer/help/styles";
import { ColorPickerHexAlpha } from "@controlkit/color-picker";
import { ToastContainer, toast } from "react-toastify";
import { writeText, readText } from "@tauri-apps/plugin-clipboard-manager";

const styles = stylex.create({
	colorBlock: {
		cursor: "pointer",
		height: "100%",
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},

	wrapper: {
		display: "flex",
		gridAutoColumns: "auto",
		height: "100%",
		width: "100%",
	},
});

interface I_ColorBlockProps {
	color: string;
}

//eventually can probably replace ant design colors with react-colors and generate a swatch https://www.npmjs.com/package/react-color
//TODO Change text color somehow on low constrast colors
//TODO Can provide present color palettes using ant color design
export default function ColorPaletteGenerator() {
	const [color, setColor] = useState("#346391");
	const [colorPalette, setColorPalette] = useState<string[]>([]);

	const ColorBlock = ({ color }: I_ColorBlockProps) => {
		return (
			<div
				{...stylex.props(styles.colorBlock)}
				style={{ backgroundColor: color }}
				onClick={async () => {
					await writeText(color);
					toast.success("Copied Color");
				}}
			>
				{color}
			</div>
		);
	};

	useEffect(() => {
		setColorPalette(generate(color));
	}, [color]);

	return (
		<div {...stylex.props(styles.wrapper)}>
			{colorPalette.map((color, index) => {
				return <ColorBlock color={color} key={index} />;
			})}

			<ToolbarHelp toolName="Color Palette Generator">
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						placeContent: "center",
						width: "100%",
						padding: "1rem",
					}}
				>
					<h2>Controls</h2>
					<ColorPickerHexAlpha color={color} setColor={setColor} />
				</div>
			</ToolbarHelp>

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
