import { useState } from "react";

import * as stylex from "@stylexjs/stylex";

import FooterHelp from "../footer_help";
import ToolbarHelp from "../toolbar_help";

import { fetch } from "@tauri-apps/plugin-http";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";
import Input from "@src/components/commons/input";

import { download } from "@tauri-apps/plugin-upload";
import { save } from "@tauri-apps/plugin-dialog";

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
});

function ImageExtractor() {
	const [url, setURL] = useState<string>("");
	const [domain, setDomain] = useState<string>("");
	const [imgs, setImgs] = useState<HTMLCollectionOf<HTMLImageElement> | null>(
		null,
	);

	function GetImages(): void {
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

				const imgs = doc.getElementsByTagName("img");

				setImgs(imgs);
				console.log(doc, imgs);
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
						onClick={GetImages}
						type="button"
						style={{
							width: "8rem",
							alignItems: "center",
							display: "flex",
							justifyContent: "center",
							textWrap: "nowrap",
						}}
					>
						Extract Images
					</button>
				</div>
			</div>

			<div
				{...stylex.props(util_styles.display_block_base)}
				style={{
					marginTop: "1rem",
				}}
			>
				{imgs === null && (
					<p
						style={{
							color: "var(--color-text-sub)",
						}}
					>
						Enter a url you wish to fetch the images of above.
					</p>
				)}

				{imgs !== null && (
					<div
						style={{
							width: "100%",
							display: "flex",
							flexWrap: "wrap",
							gap: "1rem",
							justifyContent: "center",
						}}
					>
						{Array.from(imgs).map((img, idx) => {
							let true_src = img.src;
							if (img.src.includes("localhost")) {
								// NOTE: if a img src includes local its from the
								// root of the domain so we need to adjust the img src to preview it

								// http://localhost:1420/
								// 22 characters

								true_src = domain + "/" + img.src.substring(22, img.src.length);
							}

							return (
								<div
									key={img.src}
									style={{
										padding: "1rem",
										boxSizing: "border-box",
										width: "100%",
										maxWidth: "30rem",
										minHeight: "16rem",
										backgroundColor: "var(--color-bg-compliment)",
										borderRadius: "0.5rem",
									}}
								>
									<div
										style={{
											padding: "var(--ds-space-300, 24px)",

											backgroundColor: "var(--ds-surface, #1D2125)",
											backgroundImage: `linear-gradient(
                                                45deg,
                                                var(--ds-surface-sunken, #161A1D) 25%,
                                                transparent 25%
                                              ),
                                              linear-gradient(
                                                135deg,
                                                var(--ds-surface-sunken, #161A1D) 25%,
                                                transparent 25%
                                              ),
                                              linear-gradient(
                                                45deg,
                                                transparent 75%,
                                                var(--ds-surface-sunken, #161A1D) 75%
                                              ),
                                              linear-gradient(
                                                135deg,
                                                transparent 75%,
                                                var(--ds-surface-sunken, #161A1D) 75%
                                              )`,
											backgroundSize: "20px 20px",
											backgroundPosition:
												"0px 0px, 10px 0px, 10px -10px, 0px 10px",

											height: "8rem",
										}}
									>
										<img
											src={true_src}
											alt={img.alt}
											style={{
												width: "100%",
												height: "100%",
												objectFit: "contain",
											}}
										/>
									</div>

									{/* {img.alt !== "" && ( */}
									<p
										className="text-no-overflow"
										style={{
											color: "var(--color-text)",
											paddingTop: "1rem",
											height: "2rem",
										}}
									>
										{img.alt !== "" ? img.alt : ""}
									</p>
									{/* )} */}

									<p
										className="text-no-overflow"
										style={{
											color: "var(--color-text-sub)",
											padding: "1rem 0",
											height: "2rem",
										}}
									>
										{img.src.substring(
											img.src.lastIndexOf("/") + 1,
											img.src.length,
										)}
									</p>

									<button
										{...stylex.props(util_styles.button)}
										style={{
											width: "100%",
											placeContent: "center",
										}}
										type="button"
										onClick={async (e) => {
											const path = await save({
												// title: "",
												defaultPath: img.src.substring(
													img.src.lastIndexOf("/") + 1,
													img.src.length,
												),
												filters: [
													{
														name: "", // img.src.substring(img.src.lastIndexOf("/") + 1, img.src.length),
														extensions: [
															img.src.substring(
																img.src.lastIndexOf(".") + 1,
																img.src.length,
															),
														],
													},
												],
											});

											if(!path) return;

											download(
												img.src,
												path,
												// @ts-ignore
												(progress: number, total: number) => {
													console.log(
														`Downloaded ${progress} of ${total} bytes`,
													);
													// a callback that will be called with the download progress
												},
												{}, // optional headers to send with the request
											);
										}}
									>
										Download
									</button>
								</div>
							);
						})}
					</div>
				)}
			</div>

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is a Image Extractor?</h2>
						<p>This tool will pull all the img tags from a given url.</p>

						<h2>How to use Image Extractor.</h2>
						<p>
							Simply enter the URL off the webpage you want the images off and
							then click the extract images button. The images will load
							gradually once the request is succesful.
						</p>
					</div>
				</div>
			</FooterHelp>

			<ToolbarHelp>
				<p>test</p>
			</ToolbarHelp>
		</div>
	);
}

export default ImageExtractor;
