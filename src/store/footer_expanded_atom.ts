import { atom } from "recoil";

export const FooterExpandedData = atom<boolean>({
	key: "FooterExpandedAtom",
	default: false,
});