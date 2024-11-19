import { useState } from "react";

import * as stylex from "@stylexjs/stylex";

// import MonacoBlock from "@src/components/commons/monaco-block";
import FooterHelp from "../footer_help";
import ToolbarHelp from "../toolbar_help";

// import CustomSelect from "@src/components/commons/select";
import { Slider } from "@src/components/commons/range";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";
import CopyTextBlock from "@src/components/commons/copy-text-block";

interface Option {
	value: string;
	label: string;
}
const options = [
	{ value: "hex", label: "hex" },
	// { value: "utf8", label: "utf8" },
	// { value: "utf16le", label: "utf16le" },
	{ value: "latin1", label: "latin1" },
	{ value: "base64", label: "base64" },
	// { value: "base64url", label: "base64url" },
];

const styles = stylex.create({
	base: {
		height: "100%",
	},

	flex: {
		height: "100%",
		display: "flex",
		gap: "1rem",
	},

	block: {
		backgroundColor: "#1E1E1E",
		borderRadius: "0.25rem",
		padding: "1rem 1rem",
		boxSizing: "border-box",
		width: "100%",
		height: "100%",
	},

	block_title: {
		color: "var(--color-text)",
		paddingBottom: "0.5rem",
		fontWeight: "bold",
	},

	slider_spacing: {
		padding: "0.5rem 0 1rem 0",
	},
});

function SimpleBorderRadius() {
	const [all, setAll] = useState<number[]>([4]);
	const [topLeft, setTopLeft] = useState<number[]>([4]);
	const [topRight, setTopRight] = useState<number[]>([4]);
	const [bottomLeft, setBottomLeft] = useState<number[]>([4]);
	const [bottomRight, setBottomRight] = useState<number[]>([4]);

	return (
		<div>
			<h2>Simple Border Radius</h2>

			<div
				style={{
					maxWidth: "320px",
				}}
			>
				<label htmlFor="min-words">All: {all}</label>
				<Slider
					id="min-words"
					defaultValue={all}
					onValueChange={(e) => {
						setAll(e);
						setTopLeft(e);
						setTopRight(e);
						setBottomLeft(e);
						setBottomRight(e);
					}}
					min={0}
					max={100}
					step={1}
				/>
			</div>

			<div
				style={{
					maxWidth: "320px",
				}}
			>
				<label htmlFor="min-words">Top Left: {topLeft}</label>

				<div {...stylex.props(styles.slider_spacing)}>
					<Slider
						id="min-words"
						defaultValue={topLeft}
						value={topLeft}
						onValueChange={(e) => {
							setTopLeft(e);
						}}
						min={0}
						max={100}
						step={1}
					/>
				</div>
			</div>

			<div
				style={{
					maxWidth: "320px",
				}}
			>
				<label htmlFor="min-words">Top Right: {topRight}</label>

				<div {...stylex.props(styles.slider_spacing)}>
					{" "}
					<Slider
						id="min-words"
						defaultValue={topRight}
						value={topRight}
						onValueChange={(e) => {
							setTopRight(e);
						}}
						min={0}
						max={100}
						step={1}
					/>
				</div>
			</div>

			<div
				style={{
					maxWidth: "320px",
				}}
			>
				<label htmlFor="min-words">Bottom Left: {bottomLeft}</label>

				<div {...stylex.props(styles.slider_spacing)}>
					{" "}
					<Slider
						id="min-words"
						defaultValue={bottomLeft}
						value={bottomLeft}
						onValueChange={(e) => {
							setBottomLeft(e);
						}}
						min={0}
						max={100}
						step={1}
					/>
				</div>
			</div>

			<div
				style={{
					maxWidth: "320px",
				}}
			>
				<label htmlFor="min-words">Bottom Right: {bottomRight}</label>

				<div {...stylex.props(styles.slider_spacing)}>
					<Slider
						id="min-words"
						defaultValue={bottomRight}
						value={bottomRight}
						onValueChange={(e) => {
							setBottomRight(e);
						}}
						min={0}
						max={100}
						step={1}
					/>
				</div>
			</div>

			<div>
				<div
					style={{
						backgroundColor: "var(--background-200)",
						height: "20rem",
						borderRadius: "0.25rem",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						marginBottom: "2rem",
						marginTop: "2rem",
					}}
				>
					<div
						style={{
							backgroundColor: "#FFFFFF5F",
							width: "16rem",
							height: "16rem",
							borderRadius: `${topLeft}px ${topRight}px ${bottomLeft}px ${bottomRight}px`,

							// borderRadius: "33% 67% 100% 0% / 82% 44% 56% 18%"
						}}
					/>
				</div>

				<CopyTextBlock
					text={`border-radius: ${topLeft}px ${topRight}px ${bottomLeft}px ${bottomRight}px;`}
				/>
			</div>
		</div>
	);
}

function AdvanceBorderRadius() {
	const [all, setAll] = useState<number[]>([50]);
	const [topLeft, setTopLeft] = useState<number[]>([50]);
	const [topRight, setTopRight] = useState<number[]>([50]);
	const [bottomLeft, setBottomLeft] = useState<number[]>([50]);
	const [bottomRight, setBottomRight] = useState<number[]>([50]);

	return (
		<div>
			<h2>Advance Border Radius</h2>

			<div
				style={{
					maxWidth: "320px",
				}}
			>
				<label htmlFor="min-words">Top: {topLeft}</label>
				<div {...stylex.props(styles.slider_spacing)}>
					<Slider
						id="min-words"
						defaultValue={topLeft}
						value={topLeft}
						onValueChange={(e) => {
							setTopLeft(e);
						}}
						min={0}
						max={100}
						step={1}
					/>
				</div>
			</div>

			<div
				style={{
					maxWidth: "320px",
				}}
			>
				<label htmlFor="min-words">Left: {topRight}</label>

				<div {...stylex.props(styles.slider_spacing)}>
					<Slider
						id="min-words"
						defaultValue={topRight}
						value={topRight}
						onValueChange={(e) => {
							setTopRight(e);
						}}
						min={0}
						max={100}
						step={1}
					/>
				</div>
			</div>

			<div
				style={{
					maxWidth: "320px",
				}}
			>
				<label htmlFor="min-words">Right: {bottomLeft}</label>

				<div {...stylex.props(styles.slider_spacing)}>
					<Slider
						id="min-words"
						defaultValue={bottomLeft}
						value={bottomLeft}
						onValueChange={(e) => {
							setBottomLeft(e);
						}}
						min={0}
						max={100}
						step={1}
					/>
				</div>
			</div>

			<div
				style={{
					maxWidth: "320px",
				}}
			>
				<label htmlFor="min-words">Bottom: {bottomRight}</label>
				<div {...stylex.props(styles.slider_spacing)}>
					<Slider
						id="min-words"
						defaultValue={bottomRight}
						value={bottomRight}
						onValueChange={(e) => {
							setBottomRight(e);
						}}
						min={0}
						max={100}
						step={1}
					/>
				</div>
			</div>

			<div>
				<div
					style={{
						backgroundColor: "var(--background-200)",
						height: "20rem",
						borderRadius: "0.25rem",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						marginBottom: "2rem",
						marginTop: "2rem",
					}}
				>
					<div
						style={{
							backgroundColor: "#FFFFFF5F",
							width: "16rem",
							height: "16rem",
							// borderRadius: `${topLeft}px ${topRight}px ${bottomLeft}px ${bottomRight}px`

							// @ts-ignore
							borderRadius: `${topLeft}% ${100 - topLeft}% ${bottomRight}% ${100 - bottomRight}% / ${topRight}% ${bottomLeft}% ${100 - bottomLeft}% ${100 - topRight}%`,
						}}
					/>
				</div>

				<CopyTextBlock
					// @ts-ignore
					text={`border-radius: ${topLeft}% ${100 - topLeft}% ${bottomRight}% ${100 - bottomRight}% / ${topRight}% ${bottomLeft}% ${100 - bottomLeft}% ${100 - topRight}%;`}
				/>
			</div>
		</div>
	);
}

function CSSBorderRadius() {
	const [selectedOption, setSelectedOption] = useState(options[0].value);

	const [all, setAll] = useState<number[]>([4]);
	const [topLeft, setTopLeft] = useState<number[]>([4]);
	const [topRight, setTopRight] = useState<number[]>([4]);
	const [bottomLeft, setBottomLeft] = useState<number[]>([4]);
	const [bottomRight, setBottomRight] = useState<number[]>([4]);

	function handleChange(selectedOption: Option) {
		setSelectedOption(selectedOption.value);
	}

	return (
		<div {...stylex.props(styles.base)}>
			<div {...stylex.props(styles.flex)}>
				<div {...stylex.props(util_styles.display_block_base)}>
					<SimpleBorderRadius />
				</div>

				<div {...stylex.props(util_styles.display_block_base)}>
					<AdvanceBorderRadius />
				</div>
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is the Border Radius Generator?</h2>
						<p>
							This tool can generate the CSS property border-radius while easily
							allowing the ability to preview how the resulting css will appear.
						</p>

						{/* <h2>What is the Border Radius Generator?</h2>

                        The intuitive operation with a preview box that changes in real time and a slider makes it easy to generate the border-radius of your choice.
                        It can be generated in two ways: a simple border-radius and a more advanced form of border-radius.

                        How to use the Border Radius Generator

                        You can choose between 「simple」 and 「advanced」 methods of generating border-radius, which can generate more advanced shapes.

                        Simple generation

                        The slider can be used to adjust the border-radius value to be applied to the four corners of the box.

                        Advanced generation

                        The slider can be used to adjust the border-radius value in the same way as Simple, but it generates a more complex border-radius shape.
                        If it is difficult to adjust intuitively with a slider, the four vertices (○) attached to the preview box can be manipulated directly.

                        About border-radius

                        To learn more about border-radius, please refer to the MDN Web Docs. */}

						<br />

						<button
							{...stylex.props(help_styles.link_btn)}
							type="button"
							onClick={async () => { }}
						>
							border-radius - CSS: Cascading Style Sheets | MDN
						</button>
					</div>
				</div>
			</FooterHelp>

			<ToolbarHelp>
				<p>Settings</p>

				{/* <CustomSelect
                    options={options}
                    value={selectedOption}
                    onChange={handleChange}
                /> */}
			</ToolbarHelp>
		</div>
	);
}

export default CSSBorderRadius;
