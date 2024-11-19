import { atom } from "recoil";

export const ToolbarReadyData = atom<boolean>({
	key: "ToolbarReadyAtom",
	default: false,
});