import * as stylex from "@stylexjs/stylex";
import { Client, Stronghold } from "@tauri-apps/plugin-stronghold";
import { appDataDir } from "@tauri-apps/api/path";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { JSX } from "react/jsx-runtime";
import { createPortal } from "react-dom";
import { platform } from "@tauri-apps/plugin-os";
import axios from "axios";

// import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";

const styles = stylex.create({
	search_input: {
		border: "unset",
		outline: "unset",
		boxShadow: "none",
		backgroundColor: "var(--color-bg)",
		color: "var(--color-text)",
		fontSize: "1.125rem",
		borderRadius: "0.25rem",
		padding: "0.5rem 1rem",
		width: "340px",
	},

	btn: {
		color: "var(--color-text)",
		cursor: "pointer",
		border: "none",
		outline: "none",
		padding: "0.5rem 1rem",
		borderRadius: "0.25rem",
		fontSize: "1rem",
		transition: "background-color var(--transition-speed) ease",
		backgroundColor: {
			default: "var(--color-global-highlight-blue)",
			":hover": "var(--color-global-highlight-blue-hover)",
		},
	},
});

const initStronghold = async () => {
	const appDir = await appDataDir();
	console.log("Stronghold - ", appDir);

	const currentPlatform = await platform();
	console.log(currentPlatform);

	let vaultPath = `${appDir}\\vault.hold`;
	if (currentPlatform !== "windows") {
		vaultPath = `${appDir}/vault.hold`;
	}

	// TODO: move off stronghold in open source version
	const vaultPassword = "temp";
	const stronghold = await Stronghold.load(vaultPath, vaultPassword);

	let client: Client;
	const clientName = "alltoolbox_stronghold_client";

	try {
		client = await stronghold.loadClient(clientName);
	} catch {
        console.log("here");
		client = await stronghold.createClient(clientName);
	}

	return {
		stronghold,
		client,
	};
};

// Insert a record to the store
async function insertRecord(store: any, key: string, value: string) {
	const data = Array.from(new TextEncoder().encode(value));
	await store.insert(key, data);
}

// Read a record from store
async function getRecord(store: any, key: string): Promise<string> {
	const data = await store.get(key);
	return new TextDecoder().decode(new Uint8Array(data));
}

function StrongholdHelper() {
	const [error, setError] = useState<string>("");

	useEffect(() => {
		StrongholdSetup();
	}, []);

	async function StrongholdSetup() {
		const { stronghold, client } = await initStronghold();
		const store = client.getStore();

		// const update = await check();
		// if (update?.available) {
		// 	// TODO: should remove download and install and allow user to select if they want to upgrade to support the
		// 	// allow using previous versions
		// 	await update.downloadAndInstall();
		// 	await relaunch();
		// }
	}

	return (
		<>
		</>
	);
}

export default StrongholdHelper;
