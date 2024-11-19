/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useState } from "react";
import * as stylex from "@stylexjs/stylex";

import BaseInput from "./base_input";
import {
	binaryToDecimalBuiltin,
	decimalToBinaryBuiltin,
	decimalToHexBuiltin,
	decimalToOctalBuiltin,
	hexToDecimalBuiltin,
	octalToDecimalBuiltin,
} from "./utils";
import FooterHelp from "../footer_help";
import { help_styles } from "@src/components/footer/help/styles";
import { util_styles } from "@src/utils/styles";
import ToolbarHelp from "../toolbar_help";

const styles = stylex.create({
	wrapper: {
		display: "flex",
		flexDirection: "column",
		gap: "2rem",
	},
	inner_wrap: {
		height: "calc(100% - 4rem)",
		width: "100%",
		display: "flex",
		gap: "2rem",
	},
	column_wrapper: {
		height: "100%",
		flexBasis: "100%",
	},
});

const regexpBinary = /^(0|1)*$/;
const regexpOctal = /^[0-7]*$/;
const regexpDecimal = /^\d*$/;
const regexpHex = /^([0-9]|[a-f]|[A-F])*$/;

function NumberBaseConverter() {
	const [textBinary, setBinary] = useState<string>("");
	const [textOctal, setOctal] = useState<string>("");
	const [textDecimal, setDecimal] = useState<string>("");
	const [textHex, setHex] = useState<string>("");

	function updateAllInputs(n: string) {
		let binary = "";
		let octal = "";
		let hex = "";
		let ascii = "";

		try {
			binary = decimalToBinaryBuiltin(n);
			octal = decimalToOctalBuiltin(n);
			hex = decimalToHexBuiltin(n);
		} catch (e) {
			console.error(e);
			return;
		}

		setBinary(binary);
		setOctal(octal);
		setDecimal(n);
		setHex(hex);
	}

	function clearInputs() {
		setBinary("");
		setOctal("");
		setDecimal("");
		setHex("");
	}

	function isValidEvent(
		event: ChangeEvent<HTMLInputElement>,
		regex: RegExp | null,
	): boolean {
		const { target } = event;
		if (!target) return false;

		const { value } = target;
		if (regex === null) return true;

		return regex.test(value);
	}

	function checkAndClearInputs(value: string) {
		if (value.length === 0) {
			clearInputs();
			return true;
		}

		return false;
	}

	function onSetGeneric(value: string, cb?: (s: string) => string) {
		if (checkAndClearInputs(value)) return;

		if (cb === undefined) {
			updateAllInputs(value);
			return;
		}

		const decimal = cb(value)!;
		updateAllInputs(decimal);
	}

	function onSetBinary(value: string) {
		if (checkAndClearInputs(value)) return;

		onSetGeneric(value, binaryToDecimalBuiltin);
	}

	function onSetOctal(value: string) {
		if (checkAndClearInputs(value)) return;

		onSetGeneric(value, octalToDecimalBuiltin);
	}

	function onSetDecimal(value: string) {
		if (checkAndClearInputs(value)) return;

		onSetGeneric(value);
	}

	function onSetHex(value: string) {
		if (checkAndClearInputs(value)) return;

		onSetGeneric(value, hexToDecimalBuiltin);
	}

	function onBinaryChange(event: ChangeEvent<HTMLInputElement>) {
		if (!isValidEvent(event, regexpBinary)) {
			console.error(`Binary value ${event.target.value} is invalid.`);
			return;
		}

		const { value } = event.target;
		onSetBinary(value);
	}

	function onOctalChange(event: ChangeEvent<HTMLInputElement>) {
		if (!isValidEvent(event, regexpOctal)) {
			console.error(`Octal value ${event.target.value} is invalid.`);
			return;
		}

		const { value } = event.target;
		onSetOctal(value);
	}

	function onDecimalChange(event: ChangeEvent<HTMLInputElement>) {
		if (!isValidEvent(event, regexpDecimal)) {
			console.error(`Decimal value ${event.target.value} is invalid.`);
			return;
		}

		const { value } = event.target;
		onSetDecimal(value);
	}

	function onHexChange(event: ChangeEvent<HTMLInputElement>) {
		if (!isValidEvent(event, regexpHex)) {
			console.error(`Hex value ${event.target.value} is invalid.`);
			return;
		}

		const { value } = event.target;
		onSetHex(value);
	}

	return (
		<div {...stylex.props(util_styles.display_block_base, styles.wrapper)}>
			<BaseInput
				label="Base 2 (Binary)"
				onChange={onBinaryChange}
				onSetValue={onSetBinary}
				value={textBinary}
			/>
			<BaseInput
				label="Base 8 (Octal)"
				onChange={onOctalChange}
				onSetValue={onSetOctal}
				value={textOctal}
			/>
			<BaseInput
				label="Base 10 (Decimal)"
				onChange={onDecimalChange}
				onSetValue={onSetDecimal}
				value={textDecimal}
			/>
			<BaseInput
				label="Base 16 (Hex)"
				onChange={onHexChange}
				onSetValue={onSetHex}
				value={textHex}
			/>

			<ToolbarHelp toolName="Number Base Converter" />

			<FooterHelp>
				<div {...stylex.props(help_styles.base)}>
					<div {...stylex.props(help_styles.block)}>
						<h2>What is Number Base Convert?</h2>
						<p>
							This tool allows you to enter in a number in the various supported
							formats and automatically see what the value is in all other
							supported formats.
						</p>

						<h2>Base 2 (Binary)?</h2>
						<p>Binary only accepts 1s and 0s.</p>

						<h2>Base 8 (Octal)?</h2>
						<p>Octal accepts 0 to 7.</p>

						<h2>Base 10 (Decimal)?</h2>
						<p>
							Accepts digits 0 to 9. Use this one if you want to convert a
							normal number into various formats.
						</p>

						<h2>Base 16 (Hex)?</h2>
						<p>Hex accepts digits 0 to 9 and the characters of A to F.</p>
					</div>
				</div>
			</FooterHelp>
		</div>
	);
}

export default NumberBaseConverter;
