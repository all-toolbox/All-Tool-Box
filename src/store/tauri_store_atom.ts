import { atom, selector } from "recoil";
import { Store } from "@tauri-apps/plugin-store";
import { appDataDir } from "@tauri-apps/api/path";

export async function SetupStore() {
	const storePath = `${await appDataDir()}`;
	return new Store(`${storePath}/store.bin`);
}

// TODO: selector

export const TauriStoreAtom = atom<null | Store>({
	key: "TauriStoreAtom",
	default: null,
});

// TODO: move favorite function here
