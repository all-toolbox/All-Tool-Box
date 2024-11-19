import { atom } from "recoil";

export const SearchStringData = atom<string>({
	key: "SearchStringAtom",
	default: "",
});