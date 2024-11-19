import OutputBlock from "@src/components/commons/output-block";
import stylex from "@stylexjs/stylex";
import { useState } from "react";
import ToolbarHelp from "../toolbar_help";
import Input from "@src/components/commons/input";
import { Slider } from "@src/components/commons/range";
import { HexColorInput, HexColorPicker } from "react-colorful";
import CopyTextBlock from "@src/components/commons/copy-text-block";
import { setIn } from "immutable";
import FooterHelp from "../footer_help";
import { help_styles } from "@src/components/footer/help/styles";
import { open } from "@tauri-apps/plugin-shell";
import { util_styles } from "@src/utils/styles";
import { ColorPickerHexAlpha } from "@controlkit/color-picker";

interface BoxShadowProps {
	horizontal: string;
	vertical: string;
	blur: string;
	spread: string;
	color: string;
	inset: boolean;
}
const styles = stylex.create({
	displayBox: {
		// width: "100%",
		// height: "100%",
		borderRadius: "0.25rem",
		width: "8rem",
		height: "8rem",
		backgroundColor: "red",
	},

	wrapper: {
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: "4rem",
	},
});
const BoxShadowGenerator = () => {
	const [boxColor, setBoxColor] = useState("#FFFFFF80");

	const [horizontal, setHorizontal] = useState<number[]>([0]);
	const [vertical, setVertical] = useState<number[]>([0]);
	const [blur, setBlur] = useState<number[]>([0]);
	const [spread, setSpread] = useState<number[]>([0]);
	const [color, setColor] = useState("#00000080");
	const [inset, setInset] = useState(false);

	const boxShadowValue = `${horizontal.toString()}px ${vertical.toString()}px ${blur.toString()}px ${spread.toString()}px ${color.toString()}`;
	const boxShadowInset = inset ? "inset" : "";
	const boxShadowStyle = `${boxShadowInset} ${boxShadowValue}`;
	const boxShadowOutput = `-webkit-box-shadow: ${boxShadowStyle};
    -moz-box-shadow: ${boxShadowStyle};
    box-shadow: ${boxShadowStyle};`;

	return (
		<div
			{...stylex.props(styles.wrapper)}
			style={{
				display: "grid",
				height: "100%",
				gridTemplateColumns: "33% 66%",
				gap: "0.5rem",
			}}
		>
			<div
				{...stylex.props(util_styles.display_block_base)}
				style={{
					height: "100%",
				}}
			>
				<h2>Preview</h2>
				<div
					style={{
						display: "grid",
						// height: "100%",
						gridTemplateRows: "28rem 1fr",
						// gap: "1rem",
						alignItems: "center",
						justifyItems: "center",
						backgroundColor: "var(--color-bg-compliment)",
						borderRadius: "0.25rem",
						// marginBlock: "4rem",
						contain: "content",
					}}
				>
					<span
						style={{
							boxShadow: boxShadowStyle,
							backgroundColor: boxColor,
						}}
						{...stylex.props(styles.displayBox)}
					/>
				</div>

				<div
					style={{
						marginTop: "1rem",
					}}
				>
					<CopyTextBlock text={boxShadowOutput} />
				</div>
			</div>

			<div
				{...stylex.props(util_styles.display_block_base)}
				style={{
					height: "100%",
				}}
			>
				<h2>Controls</h2>
				<div
					style={{
						display: "flex",
						width: "6rem",
					}}
				>
					<label htmlFor="inset">Inset:</label>
					<Input
						type="checkbox"
						id="inset"
						name="inset"
						checked={inset}
						onChange={(e) => setInset(e.target.checked)}
					/>
				</div>

				<br />

				<label htmlFor="horizontal">Horizontal:</label>
				<Input
					type="number"
					id="horizontal"
					name="horizontal"
					value={horizontal.toString()}
					onChange={(e) => setHorizontal([Number(e.target.value)])}
				/>
				<Slider
					defaultValue={horizontal}
					onValueChange={(e) => {
						setHorizontal(e);
					}}
					min={0}
					max={100}
					step={1}
				/>

				<br />
				<label htmlFor="vertical">Vertical:</label>
				<Input
					type="number"
					id="vertical"
					name="vertical"
					value={vertical.toString()}
					onChange={(e) => setVertical([Number(e.target.value)])}
				/>
				<Slider
					defaultValue={vertical}
					onValueChange={(e) => {
						setVertical(e);
					}}
					min={0}
					max={100}
					step={1}
				/>
				<br />

				<label htmlFor="blur">Blur:</label>
				<Input
					type="number"
					id="blur"
					name="blur"
					value={blur.toString()}
					onChange={(e) => setBlur([Number(e.target.value)])}
				/>
				<Slider
					defaultValue={blur}
					onValueChange={(e) => {
						setBlur(e);
					}}
					min={0}
					max={100}
					step={1}
				/>
				<br />

				<label htmlFor="spread">Spread:</label>
				<Input
					type="number"
					id="spread"
					name="spread"
					value={spread.toString()}
					onChange={(e) => setSpread([Number(e.target.value)])}
				/>
				<Slider
					defaultValue={spread}
					onValueChange={(e) => {
						setSpread(e);
					}}
					min={0}
					max={100}
					step={1}
				/>

				<br />
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
					}}
				>
					<div>
						<label htmlFor="color">Color:</label>
						<ColorPickerHexAlpha color={color} setColor={setColor} />
					</div>

					<div>
						<label htmlFor="color">Box Color:</label>
						<ColorPickerHexAlpha color={boxColor} setColor={setBoxColor} />
					</div>
				</div>

				<br />

				{/* <CopyTextBlock text={boxShadowOutput} /> */}
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is Box-Shadow Generator?</h2>
						<p>
							Allow for the generation and preview of CSS box-shadow property.
						</p>

						<h2>How to use Box Shadow Generator.</h2>
						<p>
							As you manipulate each setting in the configuration area,
							box-shadow is applied to the preview in the output area in real
							time.
						</p>
						<br />
						<p>
							Each setting corresponds to a property of box-shadow. The values
							are described below, but if you need more information about
							box-shadow, please refer to MDN's documentation.
						</p>
						<br />
						<button
							{...stylex.props(help_styles.link_btn)}
							onClick={async () => {
								await open(
									"https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow",
								);
							}}
							type="button"
						>
							box-shadow - CSS: Cascading Style Sheets | MDN
						</button>

						<h2>About the Configuration</h2>
						<h3>Horizontal and Vertical</h3>
						<p>Horizontal and Vertical set the offset of the shadow.</p>
						<p>
							Horizontal positive values set the shadow to the right negative
							values set the shadow to the left. Vertical positive values set
							the shadow downward; negative values set the shadow upward.
						</p>
						<br />
						<p>
							If both are 0, they are set behind the element to which the shadow
							is applied.
						</p>

						<h3>Blur</h3>
						<p>
							Blur allows you to set the blurring of the shadows. The higher the
							value, the greater the blur. As a result, the area of the shadow
							becomes larger and the color of the shadow becomes lighter.
						</p>

						<h3>Spread</h3>
						<p>
							Spread allows you to set the spread of the shadow. The larger the
							value, the larger the shadow. 0 means the shadow is the same size
							as the element.
						</p>

						<h3>Inset</h3>
						<p>
							When inset is turned on, the shadow is set inside the element.
						</p>

						<h3>Color</h3>
						<p>You can specify the color of the shadow.</p>

						{/* preview color */}
						{/* <p>This setting does not directly affect the box-shadow CSS, but allows you to change the preview box color and background color, respectively.</p> */}
					</div>
				</div>
			</FooterHelp>
		</div>
	);
};

export default BoxShadowGenerator;
