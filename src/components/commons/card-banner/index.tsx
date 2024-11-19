import { util_styles } from "@src/utils/styles";
import stylex from "@stylexjs/stylex";
import { card_banner_styles } from "./styles";
// @ts-ignore
import InformationIcon from "@assets/svgs/question-line.svg?react";
import FavouriteHeart from "../favourite-heart";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { TauriStoreAtom } from "@src/store/tauri_store_atom";
import { TauriStoreFavoritesAtom } from "@src/store/tauri_store_favorites_atom";
import { FooterExpandedData } from "@src/store/footer_expanded_atom";

interface I_CardBannerProps {
	id: string;
	name: string;
	description: string;
	liked?: boolean;
}

export default function CardBanner({
	id,
	description,
	name,
	liked,
}: I_CardBannerProps) {
	const TauriStore = useRecoilValue(TauriStoreAtom);
	const [getStoreFavorites, setStoreFavorites] = useRecoilState(TauriStoreFavoritesAtom);

	const footerExpandedAtom = useRecoilValue(FooterExpandedData);

	const [isFav, setIsFav] = useState<boolean>(false);


	useEffect(() => {
		for (let i = 0; i < getStoreFavorites.length; ++i) {
			if (id === getStoreFavorites[i]) {
				setIsFav(true);
			}
		}
	}, [JSON.stringify(getStoreFavorites)]);

	function handleFavouriteClick(
		event: any,
		tool_id: string,
		// isFavArg: boolean
	): void {
		event.preventDefault();

		let found = false;
		const ns = [...getStoreFavorites];
		for (let i = 0; i < ns.length; ++i) {
			if (ns[i] === tool_id) {
				found = true;
				break;
			}
		}

		if (!found) {
			ns.push(tool_id);
			if (TauriStore) {
				TauriStore.set('tool_favorites', ns)
					.then((res) => {
						toast.success("Added to favourites");
						setStoreFavorites(ns);
						setIsFav(true);
					})
					.catch((err) => {
						toast.error("Failed to add to favourites");
					});
			}
		} else {
			for (let i = 0; i < ns.length; ++i) {
				if (ns[i] === tool_id) {
					ns.splice(i, 1);
					break;
				}
			}

			if (TauriStore) {
				TauriStore.set('tool_favorites', ns)
					.then((res) => {
						toast.success("Removed from favourites");
						setStoreFavorites(ns);
						setIsFav(false);
					})
					.catch((err) => {
						toast.error("Failed to remove from favourites");
					});
			}
		}
	}

	function ToggleHelp(): void {
		const fel = document.getElementById("footer-resize-handle");
		if (fel) {
			fel.dispatchEvent(
				new Event("CustE_OpenHelp")
			);
		}
	}

	return (
		<div
			{...stylex.props(util_styles.display_block_base, card_banner_styles.base)}
		>
			<div>
				<h1 {...stylex.props(card_banner_styles.title)}>{name}</h1>{" "}
				<p {...stylex.props(card_banner_styles.description)}>{description}</p>
			</div>

			<div {...stylex.props(card_banner_styles.buttons_block)}>
				<button
					{...stylex.props(util_styles.button)}
					onClick={ToggleHelp}
					type="button"
				>
					<InformationIcon />

					<h3 {...stylex.props(util_styles.test_reset)}>Help</h3>
				</button>

				<div
					{...stylex.props(util_styles.button)}
					onClick={(event) => {
						handleFavouriteClick(event, id);
					}}
					role="button"
				>
					<FavouriteHeart
						liked={isFav}
					/>

					<h3 {...stylex.props(util_styles.test_reset)}>Like</h3>
				</div>
			</div>
		</div>
	);
}
