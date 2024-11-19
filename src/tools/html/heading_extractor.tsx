import { useState } from "react";

import * as stylex from "@stylexjs/stylex";

import FooterHelp from "../footer_help";

import { fetch } from "@tauri-apps/plugin-http";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";
import Input from "@src/components/commons/input";

const styles = stylex.create({
	base: {
		display: "grid",
		gridTemplateRows: "4rem 1fr",
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

	subText: {
		color: "var(--color-text-sub)",
	},

	headingRow: {
		display: "flex",
		gap: "0.25rem",
	},
});

function HeadingExtractor() {
	const [url, setURL] = useState<string>("");
	const [domain, setDomain] = useState<string>("");
	const [headingsList, setHeadingsList] = useState<
		{ level: number; text: string }[] | null
	>(null);
	const sortedHeadingsList = headingsList?.sort((a, b) => a.level - b.level);

	//TODO clean up heading display (table?)
	//TODO make an extraction summary section (each heading counts, title, url)
	//TODO ability to target which headings to extract
	function GetHeadings(): void {
		console.log(url);
		fetch(url, {
			method: "GET",
		})
			.then((res) => {
				console.log(res);
				console.log(res.body);

				const d = new URL(url);
				setDomain(d.origin);

				return res.text();
			})
			.then((html) => {
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, "text/html");
				const headings: { level: number; text: string }[] = [];
				for (let i = 1; i <= 6; i++) {
					doc.querySelectorAll(`h${i}`).forEach((heading) => {
						headings.push({ level: i, text: heading.textContent || "" });
					});
				}
				setHeadingsList(headings);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div {...stylex.props(styles.base)}>
			<div {...stylex.props(styles.flex)}>
				<div
					{...stylex.props(util_styles.display_block_base)}
					style={{
						height: "4rem",
						display: "flex",
						gap: "1rem",
					}}
				>
					<Input
						type="text"
						placeholder="URL"
						value={url}
						onChange={(e) => {
							setURL(e.target.value);
						}}
						style={{
							width: "100%",
						}}
					/>

					<button
						{...stylex.props(util_styles.button)}
						onClick={() => GetHeadings()}
						type="button"
						style={{
							width: "8rem",
							alignItems: "center",
							display: "flex",
							justifyContent: "center",
							textWrap: "nowrap",
						}}
					>
						Extract Headings
					</button>
				</div>
			</div>

			<div
				{...stylex.props(util_styles.display_block_base)}
				style={{
					marginTop: "1rem",
				}}
			>
				{headingsList === null && (
					<p {...stylex.props(styles.subText)}>
						Enter a url you wish to fetch the headings of above.
					</p>
				)}
				{sortedHeadingsList !== undefined && (
					<div>
						{sortedHeadingsList.map((heading, index) => (
							<div key={index} {...stylex.props(styles.headingRow)}>
								<p {...stylex.props(styles.subText)}>{`<h${heading.level}>`}</p>
								<p>{heading.text}</p>
							</div>
						))}
					</div>
				)}
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is a Heading Extractor?</h2>
						<p>This tool will pull all the heading tags from a given url.</p>

						<h2>How to use Heading Extractor.</h2>
						<p>
							Simply enter the URL off the webpage you want the headings off and
							then click the extract headings button. The headings will load
							once the request is succesful.
						</p>
					</div>
				</div>
			</FooterHelp>
		</div>
	);
}

export default HeadingExtractor;
