import { useEffect, useState } from "react";

import "./App.css";

import {
	createHashRouter,
	Route,
	RouterProvider,
	Outlet,
	createRoutesFromElements,
} from "react-router-dom";

import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "@src/components/navbar";

import StringCaseConverter from "@src/tools/strings/string-case-converter";
import JwtDecoder from "@src/tools/jwt/decoder";

import Cheatsheets from "@src/cheatsheets";
import CheatsheetTypescript from "@src/cheatsheets/typescript";
import CheatsheetNpm from "@src/cheatsheets/npm";
import CheatsheetVim from "@src/cheatsheets/vim";

import GlobalSearch from "@src/components/command-palette";

import SnippetsTypescript from "@src/snippets/typescript";
import Snippets from "@src/snippets";

import { tools } from "./tool_list";

import HashGenerator from "@src/tools/hash/generator";
import UuidGenerator from "@src/tools/uuid/generator";
import Tools from "@src/tools";
import KeycodeInfo from "@src/tools/keycode-info";
import UrlParser from "@src/tools/url/parser";
import UrlEncoderDecoder from "@src/tools/url/uri-encode-decode";
import CSSCursors from "@src/tools/css/cursors";
import WordCount from "@src/tools/strings/word-count";
import Base64EncoderDecoder from "./tools/base64_encoder_decoder";
import Sidebar from "./components/sidebar";
import Toolbar from "./components/toolbar";
import Footer from "./components/footer";
import ToolWrapper from "./tools/tool_wrapper";
import HTMLFormatter from "./tools/html/formatter";
import CSSFormatter from "./tools/css/formatter";
import CSSMinifier from "./tools/css/minifier";
import JavascriptFormatter from "./tools/javascript/formatter";
import HmacGenerator from "./tools/hmac";
import HTMLPreviewer from "./tools/html/preview";
import LoremIpsumFaker from "./tools/fakers/lorem_ipsum";
import QRCodeGenerator from "./tools/qrcode/generator";
import HexEncoderDecoder from "./tools/hex/encoder_decoder";
import MarkdownPreviewer from "./tools/markdown/preview";
import HTMLSanitizer from "./tools/html/sanitizer";
import HTMLToText from "./tools/html/to_text";
import HTMLToMarkdown from "./tools/html/to_markdown";
import MarkdownToHTML from "./tools/markdown/to_html";
import HTMLEntitiesEncoderDecoder from "./tools/html/entities";
import PomodoroTimer from "./tools/pomodoro";
import ImageExtractor from "./tools/image/extractor";
import NumberBaseConverter from "./tools/number_base_converter";
import StringEncrypterDecrypter from "./tools/string_encrypter_decrypter";
import CSSBorderRadius from "./tools/css/border_radius";
import UnitConverter from "./tools/unit-converter";
import MediaInfo from "./tools/media/info";
import CSSUnitConverter from "./tools/css/unit-converter";
import JSONFormatter from "@src/tools/json/formatter.tsx";
import JSMinifier from "@src/tools/js/minifier.tsx";
import ColorPaletteGenerator from "./tools/color/color-palette-generator";
import JSONTreeView from "@src/tools/json/viewer.tsx";
import JSONToYAMLConverter from "@src/tools/json/to_yaml.tsx";
import JSONToTOMLConverter from "@src/tools/json/to_toml.tsx";
import BoxShadowGenerator from "./tools/css/box-shadow-generator";
import IPInfo from "@src/tools/ip-info";
import CronParser from "./tools/cron-parser";
import CheatSheetReact from "./cheatsheets/react";
import CheatSheetKubernetes from "./cheatsheets/kubernetes";
import CheatSheetSass from "./cheatsheets/sass";
import CheatSheetGo from "./cheatsheets/go";
import CheatSheetBash from "./cheatsheets/bash";
import CheatsheetJavascript from "./cheatsheets/javascript";
import CheatSheetPython from "./cheatsheets/python";
import CheatSheetDocker from "./cheatsheets/docker";
import CheatSheetMarkdown from "./cheatsheets/markdown";
import CheatSheetRegex from "./cheatsheets/regex";
import CheatSheetRedis from "./cheatsheets/redis";
import Settings from "./settings";
import SnippetsReactCustomHooks from "./snippets/react-custom-hooks";
import TextDiff from "./tools/text-diff";
import HeadingExtractor from "./tools/html/heading_extractor";
import ColorCodeConverter from "./tools/color/color-code-converter";

export default function App() {
	const [showCmdPalette, setShowCmdPalette] = useState<boolean>(false);

	// TODO
	// useEffect(() => {
	// 	document.addEventListener("keydown", onKeyPress, false);

	// 	return () => {
	// 		document.removeEventListener("keydown", onKeyPress, false);
	// 	};
	// }, []);

	// function onKeyPress(event: any) {
	// 	if (event.ctrlKey && event.shiftKey && event.keyCode === 80) {
	// 		// CTRL+SHIFT+P
	// 		setShowCmdPalette(true);
	// 	}
	// }

	const router = createHashRouter(
		createRoutesFromElements(
			<Route
				path="/"
				element={
					<div
						style={{
							display: "grid",
							gridTemplateRows: "4rem 1fr",
						}}
					>
						<div
							style={{
								position: "sticky",
								top: "0rem",
							}}
						>
							<Navbar />
						</div>

						<Outlet />
					</div>
				}
			>
				{/* Settings */}
				<Route path="/settings" element={<Settings />} />

				{/* Snippets */}
				<Route element={<Outlet />}>
					<Route path="/snippets" element={<Snippets />} />
					<Route path="/snippets/typescript" element={<SnippetsTypescript />} />
					<Route
						path="/snippets/react-custom-hooks"
						element={<SnippetsReactCustomHooks />}
					/>
				</Route>

				{/* Cheatsheets */}
				<Route
					element={
						<>
							<div
								style={{
									display: "flex",
									height: "calc(100vh - 4rem - 0.0625rem)",
								}}
							>
								{/* <Sidebar /> */}

								<div
									style={{
										backgroundColor: "var(--color-bg-compliment)",
										height: "100%",

										width: "100%",
										overflow: "auto",
									}}
								>
									<Outlet />
								</div>
							</div>

							{/* <Outlet /> */}
						</>
					}
				>
					<Route path="/cheatsheets" element={<Cheatsheets />} />
					<Route
						path="/cheatsheets/typescript"
						element={<CheatsheetTypescript />}
					/>
					<Route path="/cheatsheets/vim" element={<CheatsheetVim />} />

					<Route path="/cheatsheets/npm" element={<CheatsheetNpm />} />
					<Route path="/cheatsheets/react" element={<CheatSheetReact />} />

					<Route
						path="/cheatsheets/kubernetes"
						element={<CheatSheetKubernetes />}
					/>

					<Route path="/cheatsheets/sass" element={<CheatSheetSass />} />

					<Route path="/cheatsheets/go" element={<CheatSheetGo />} />

					<Route path="/cheatsheets/bash" element={<CheatSheetBash />} />

					<Route
						path="/cheatsheets/javascript"
						element={<CheatsheetJavascript />}
					/>

					<Route path="/cheatsheets/python" element={<CheatSheetPython />} />

					<Route path="/cheatsheets/docker" element={<CheatSheetDocker />} />

					<Route
						path="/cheatsheets/markdown"
						element={<CheatSheetMarkdown />}
					/>

					<Route path="/cheatsheets/regex" element={<CheatSheetRegex />} />

					<Route path="/cheatsheets/redis" element={<CheatSheetRedis />} />
				</Route>

				<Route
					element={
						<>
							<div
								style={{
									display: "flex",
									height: "calc(100vh - 4rem - 0.0625rem)",
								}}
							>
								<Sidebar />

								<div
									style={{
										backgroundColor: "var(--color-bg-compliment)",
										height: "100%",

										width: "100%",
										overflow: "auto",
										marginLeft: "var(--sidebar-width)",
									}}
								>
									<Outlet />
								</div>
							</div>

							{/* <Outlet /> */}
						</>
					}
				>
					{/* Tools */}
					<Route path="/" element={<Tools />} />
					<Route
						path="/tool/html/heading_extractor"
						element={
							<ToolWrapper tool_obj={tools["Heading Extractor"]}>
								<HeadingExtractor />
							</ToolWrapper>
						}
					/>

					<Route
						path="/tool/text-difference-checker"
						element={
							<ToolWrapper tool_obj={tools["Text Difference Checker"]}>
								<TextDiff />
							</ToolWrapper>
						}
					/>
					<Route
						// path={tools[0].link} // "/tool/string/stringcase"
						path="/tool/string/stringcase"
						element={
							<ToolWrapper tool_obj={tools["String Case Converter"]}>
								<StringCaseConverter />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/number-base-converter"
						element={
							<ToolWrapper tool_obj={tools["Number Base Converter"]}>
								<NumberBaseConverter />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/base64-encoder-decoder"
						element={
							<ToolWrapper tool_obj={tools["Base64 - Encoder / Decoder"]}>
								<Base64EncoderDecoder />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/jwt/decoder"
						element={
							<ToolWrapper tool_obj={tools["Jwt Decoder"]}>
								<JwtDecoder />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/hmac/generator"
						element={
							<ToolWrapper tool_obj={tools["HMAC Generator"]}>
								<HmacGenerator />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/hash/generator"
						element={
							<ToolWrapper tool_obj={tools["Hash Generator"]}>
								<HashGenerator />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/uuid/generator"
						element={
							<ToolWrapper tool_obj={tools["Uuid Generator"]}>
								<UuidGenerator />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/keycode-info"
						element={
							<ToolWrapper tool_obj={tools["Keycode Info"]}>
								<KeycodeInfo />
							</ToolWrapper>
						}
					/>

					<Route
						path="/tool/ip-info"
						element={
							<ToolWrapper tool_obj={tools["IP Info"]}>
								<IPInfo />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/cron-parser"
						element={
							<ToolWrapper tool_obj={tools["Cron Parser"]}>
								<CronParser />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/url/parser"
						element={
							<ToolWrapper tool_obj={tools["URL Parser"]}>
								<UrlParser />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/url/encode-decode"
						element={
							<ToolWrapper tool_obj={tools["URI Encoder/Decoder"]}>
								<UrlEncoderDecoder />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/css/cursors"
						element={
							<ToolWrapper tool_obj={tools["CSS Cursors"]}>
								<CSSCursors />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/string/word-count"
						element={
							<ToolWrapper tool_obj={tools["Word Counter"]}>
								<WordCount />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/js/formatter"
						element={
							<ToolWrapper tool_obj={tools["Javascript Formatter"]}>
								<JavascriptFormatter />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/css/formatter"
						element={
							<ToolWrapper tool_obj={tools["CSS Formatter"]}>
								<CSSFormatter />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/css/unit-converter"
						element={
							<ToolWrapper tool_obj={tools["CSS Unit Converter"]}>
								<CSSUnitConverter />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/css/minifier"
						element={
							<ToolWrapper tool_obj={tools["CSS Minifier"]}>
								<CSSMinifier />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/pomodoro"
						element={
							<ToolWrapper tool_obj={tools["Pomodoro Timer"]}>
								<PomodoroTimer />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/html/preview"
						element={
							<ToolWrapper tool_obj={tools["HTML Previewer"]}>
								<HTMLPreviewer />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/html/formatter"
						element={
							<ToolWrapper tool_obj={tools["HTML Formatter"]}>
								<HTMLFormatter />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/faker/lorem-ipsum"
						element={
							<ToolWrapper tool_obj={tools["Lorem Ipsum"]}>
								<LoremIpsumFaker />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/qrcode/generator"
						element={
							<ToolWrapper tool_obj={tools["QR Code Generator"]}>
								<QRCodeGenerator />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/hex/encode-decoder"
						element={
							<ToolWrapper tool_obj={tools["HEX Encoder / Decoder"]}>
								<HexEncoderDecoder />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/markdown/preview"
						element={
							<ToolWrapper tool_obj={tools["Markdown Preview"]}>
								<MarkdownPreviewer />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/html/sanitizer"
						element={
							<ToolWrapper tool_obj={tools["HTML Sanitizer"]}>
								<HTMLSanitizer />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/html/to-text"
						element={
							<ToolWrapper tool_obj={tools["HTML To Text"]}>
								<HTMLToText />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/html/to-markdown"
						element={
							<ToolWrapper tool_obj={tools["HTML To Markdown"]}>
								<HTMLToMarkdown />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/markdown/to-html"
						element={
							<ToolWrapper tool_obj={tools["Markdown to HTML"]}>
								<MarkdownToHTML />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/html/entities"
						element={
							<ToolWrapper tool_obj={tools["HTML Entities Encoder Decoder"]}>
								<HTMLEntitiesEncoderDecoder />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/image/extractor"
						element={
							<ToolWrapper tool_obj={tools["Image Extractor"]}>
								<ImageExtractor />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/string/encrypt-decrypt"
						element={
							<ToolWrapper tool_obj={tools["String encrypt decrypt"]}>
								<StringEncrypterDecrypter />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/css/border-radius"
						element={
							<ToolWrapper tool_obj={tools["Border Radius Generator"]}>
								<CSSBorderRadius />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/unit-converter"
						element={
							<ToolWrapper tool_obj={tools["Unit Converter"]}>
								<UnitConverter />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/media/info"
						element={
							<ToolWrapper tool_obj={tools["Media Info"]}>
								<MediaInfo />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/json/formatter"
						element={
							<ToolWrapper tool_obj={tools["JSON Formatter"]}>
								<JSONFormatter />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/js/minifier"
						element={
							<ToolWrapper tool_obj={tools["Javascript Minifier"]}>
								<JSMinifier />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/colors/color-palette-generator"
						element={
							<ToolWrapper
								tool_obj={tools["Color Palette Generator"]}
								showToolbar={true}
							>
								<ColorPaletteGenerator />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/colors/color-code-converter"
						element={
							<ToolWrapper tool_obj={tools["Color Code Converter"]}>
								<ColorCodeConverter />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/json/viewer"
						element={
							<ToolWrapper tool_obj={tools["JSON Viewer"]}>
								<JSONTreeView />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/json/to-yaml"
						element={
							<ToolWrapper tool_obj={tools["JSON to YAML"]}>
								<JSONToYAMLConverter />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/json/to-toml"
						element={
							<ToolWrapper tool_obj={tools["JSON to TOML"]}>
								<JSONToTOMLConverter />
							</ToolWrapper>
						}
					/>
					<Route
						path="/tool/css/box-shadow"
						element={
							<ToolWrapper tool_obj={tools["CSS Box Shadow Generator"]}>
								<BoxShadowGenerator />
							</ToolWrapper>
						}
					/>
				</Route>
			</Route>,
		),
	);

	return (
		<div>
			{showCmdPalette && <GlobalSearch setShowCmdPalette={setShowCmdPalette} />}

			<RouterProvider router={router} />

			<ToastContainer
				position="bottom-right"
				autoClose={1250}
				hideProgressBar={false}
				newestOnTop={false}
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={false}
				pauseOnHover={true}
				theme="dark"
				transition={Zoom}
			/>
		</div>
	);
}
