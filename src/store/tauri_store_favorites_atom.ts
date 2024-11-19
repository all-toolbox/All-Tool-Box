import { atom } from "recoil";

export const TauriStoreFavoritesAtom = atom<string[]>({
	key: "TauriStoreFavoritesAtom",
	default: [],
});
